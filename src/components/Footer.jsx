export default function Footer() {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="foot">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        
        
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', letterSpacing: '-0.3px' }}>
          Skyviorment
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--text3)', margin: 0 }}>
          Your Global Weather Dashboard
        </p>


        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px' }}>
          
          
          <a 
            href="https://www.linkedin.com/in/fatamabristy/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.72rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            💼 LinkedIn
          </a>

          
          <a 
            href="https://github.com/Fatama-Bristy" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.72rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            🐙 GitHub
          </a>

         
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.72rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            🔒 Privacy Policy
          </a>

          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.72rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            📄 Terms of Service
          </a>

        </div>

        
        <p style={{ fontSize: '0.68rem', color: 'var(--text3)', marginTop: '8px', borderTop: '1px solid var(--border)', paddingTop: '10px', width: '100%', textAlign: 'center' }}>
          © {currentYear} Skyviorment. All rights reserved.
        </p>

        
        <p style={{ fontSize: '0.62rem', color: 'var(--text3)', opacity: 0.6, margin: 0 }}>
          Built with ⚛️ React & OpenWeather API
        </p>

      </div>
    </footer>
  );
}