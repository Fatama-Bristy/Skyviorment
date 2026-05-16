import { useContext, useEffect, useRef } from 'react';
import { FiTrendingUp } from '../icons';
import { ThemeContext } from '../context/ThemeContext';

export default function TemperatureGraph({ data }) {
  const { unit, theme } = useContext(ThemeContext);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data?.length || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const drawChart = () => {
      const rect = container.getBoundingClientRect();
      const W = Math.max(200, rect.width - 40);
      const H = 250; 

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isDark = theme === 'dark';
      const temps = data.map(h => unit === 'f' ? Math.round(h.temp * 9/5 + 32) : h.temp);
      const labels = data.map(h => h.time);
      const minT = Math.min(...temps) - 2;
      const maxT = Math.max(...temps) + 2;
      const rangeT = Math.max(1, maxT - minT);

      const pL = 45, pR = 16, pT = 20, pB = 36; 
      const cW = W - pL - pR;
      const cH = H - pT - pB;

      const points = temps.map((t, i) => ({
        x: pL + (cW / Math.max(1, temps.length - 1)) * i,
        y: pT + cH - ((t - minT) / rangeT) * cH,
      }));

      function draw(highlight) {
        ctx.clearRect(0, 0, W, H);
        
        
        const gc = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
        const tc = isDark ? '#8B97A8' : '#4A5568'; 

        ctx.strokeStyle = gc; ctx.lineWidth = 1;
        
       
        ctx.font = '11px Inter,sans-serif'; 
        ctx.fillStyle = tc; 
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        for (let i = 0; i <= 5; i++) {
          const v = minT + (rangeT / 5) * i;
          const y = pT + cH - (cH / 5) * i;
          ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
          ctx.fillText(Math.round(v) + '°', pL - 8, y); 
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top'; 

        const step = Math.max(1, Math.floor(labels.length / 8)); 
        for (let i = 0; i < labels.length; i += step) {
          const x = pL + (cW / Math.max(1, labels.length - 1)) * i;
          ctx.fillText(labels[i], x, H - pB + 10); 
        }

        const grad = ctx.createLinearGradient(0, pT, 0, pT + cH);
        grad.addColorStop(0, 'rgba(0,229,160,0.22)');
        grad.addColorStop(1, 'rgba(0,229,160,0.01)');

        ctx.beginPath();
        ctx.moveTo(points[0].x, pT + cH);
        ctx.lineTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const cp = (points[i-1].x + points[i].x) / 2;
          ctx.bezierCurveTo(cp, points[i-1].y, cp, points[i].y, points[i].x, points[i].y);
        }
        ctx.lineTo(points[points.length-1].x, pT + cH);
        ctx.closePath();
        ctx.fillStyle = grad; ctx.fill();

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const cp = (points[i-1].x + points[i].x) / 2;
          ctx.bezierCurveTo(cp, points[i-1].y, cp, points[i].y, points[i].x, points[i].y);
        }
        ctx.strokeStyle = '#00E5A0'; ctx.lineWidth = 2.5; ctx.stroke();

        points.forEach((p, i) => {
          if (i % 2 !== 0 && i !== points.length - 1) return;
          ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fillStyle = '#00E5A0'; ctx.fill();
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fillStyle = isDark ? '#070B14' : '#F0F4F8'; ctx.fill();
        });

        if (highlight >= 0 && highlight < points.length) {
          const cp = points[highlight];
          ctx.beginPath(); ctx.moveTo(cp.x, pT); ctx.lineTo(cp.x, pT + cH);
          ctx.strokeStyle = 'rgba(0,229,160,0.2)'; ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath(); ctx.arc(cp.x, cp.y, 6, 0, Math.PI*2); ctx.fillStyle = '#00E5A0'; ctx.fill();
          ctx.beginPath(); ctx.arc(cp.x, cp.y, 3, 0, Math.PI*2); ctx.fillStyle = isDark ? '#070B14' : '#F0F4F8'; ctx.fill();

          const tt = `${labels[highlight]}  ${temps[highlight]}°`;
          
          
          ctx.font = '600 12px Inter,sans-serif'; 
          const tw = ctx.measureText(tt).width;
          const bw = tw + 18, bh = 26, br = 7; 
          const tx = Math.min(Math.max(cp.x - bw/2, 4), W - bw - 4);
          const ty = Math.max(cp.y - 40, 4); 

          ctx.fillStyle = isDark ? '#1a2332' : '#fff';
          ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(tx+br, ty);
          ctx.lineTo(tx+bw-br, ty); ctx.arcTo(tx+bw, ty, tx+bw, ty+br, br);
          ctx.lineTo(tx+bw, ty+bh-br); ctx.arcTo(tx+bw, ty+bh, tx+bw-br, ty+bh, br);
          ctx.lineTo(tx+br, ty+bh); ctx.arcTo(tx, ty+bh, tx, ty+bh-br, br);
          ctx.lineTo(tx, ty+br); ctx.arcTo(tx, ty, tx+br, ty, br);
          ctx.closePath(); ctx.fill(); ctx.stroke();

          ctx.fillStyle = isDark ? '#EDF2F7' : '#1A202C';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle'; 
          ctx.fillText(tt, tx + bw/2, ty + bh/2);
        }
      }

      draw(-1);

      const onMove = (e) => {
        const r = canvas.getBoundingClientRect();
        const mx = e.clientX - r.left;
        let ci = 0, md = Infinity;
        points.forEach((p, i) => { const d = Math.abs(p.x - mx); if (d < md) { md = d; ci = i; } });
        draw(ci);
      };
      const onLeave = () => draw(-1);

      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
      
      return () => {
        canvas.removeEventListener('mousemove', onMove);
        canvas.removeEventListener('mouseleave', onLeave);
      };
    };

    const cleanup = drawChart();

    const resizeObserver = new ResizeObserver(() => {
      drawChart();
    });
    resizeObserver.observe(container);

    return () => {
      if (cleanup) cleanup();
      resizeObserver.disconnect();
    };
  }, [data, unit, theme]);

  return (
    <section style={{marginBottom:24,animation:'fadeIn .6s .5s both'}}>
      <h2 className="sec-title"><FiTrendingUp size={15} /> Temperature Trend</h2>
      <div className="glass chart-card" style={{padding:'20px 20px 10px'}} ref={containerRef}>
        
        <canvas ref={canvasRef} style={{width:'100%',height:250,cursor:'crosshair'}} />
      </div>
    </section>
  );
} 