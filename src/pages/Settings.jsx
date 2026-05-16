import { useContext, useState } from 'react';
import { FiSettings } from '../icons';
import { ThemeContext } from '../context/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme, unit, setUnit } = useContext(ThemeContext);
  
  const [helpEmail, setHelpEmail] = useState('');
  const [helpMsg, setHelpMsg] = useState('');
  const [helpStatus, setHelpStatus] = useState(''); 

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    if (!helpMsg.trim()) return;
    
    setHelpStatus('sending');

    try {
      
      const response = await fetch('https://formspree.io/f/xpqbvbpv', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({ 
          email: helpEmail || 'Anonymous User', 
          message: helpMsg 
        })
      });

      if (response.ok) {
        setHelpStatus('success');
        setHelpEmail('');
        setHelpMsg('');
        setTimeout(() => setHelpStatus(''), 4000);
      } else {
        setHelpStatus('error');
        setTimeout(() => setHelpStatus(''), 4000);
      }
    } catch {
      setHelpStatus('error');
      setTimeout(() => setHelpStatus(''), 4000);
    }
  };

  return (
    <div className="content-wrap">
      <h2 className="sec-title"><FiSettings size={15} /> Settings</h2>
      <div className="glass" style={{ padding: 20 }}>
        <div className="set-group">
          <div className="set-group-title">Appearance</div>
          <div className="set-item">
            <div><div className="set-label">Dark Mode</div><div className="set-desc">Toggle light/dark theme</div></div>
            <label className="toggle"><input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} /><span className="toggle-sl" /></label>
          </div>
        </div>
        
        <div className="set-group">
          <div className="set-group-title">Units</div>
          <div className="set-item">
            <div><div className="set-label">Temperature</div><div className="set-desc">Choose preferred unit</div></div>
            <div className="radios">
              <div className={`rbtn${unit === 'c' ? ' on' : ''}`} onClick={() => setUnit('c')}>Celsius</div>
              <div className={`rbtn${unit === 'f' ? ' on' : ''}`} onClick={() => setUnit('f')}>Fahrenheit</div>
            </div>
          </div>
        </div>
        
        <div className="set-group">
          <div className="set-group-title">Notifications</div>
          <div className="set-item">
            <div><div className="set-label">Weather Alerts</div><div className="set-desc">Severe weather notifications</div></div>
            <label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-sl" /></label>
          </div>
          <div className="set-item">
            <div><div className="set-label">Daily Forecast</div><div className="set-desc">Daily weather summary</div></div>
            <label className="toggle"><input type="checkbox" /><span className="toggle-sl" /></label>
          </div>
        </div>

        {/* Help Center Section */}
        <div className="set-group">
          <div className="set-group-title">🛟 Help Center</div>
          
          <form onSubmit={handleHelpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="set-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <div>
                <div className="set-label">Facing any problem?</div>
                <div className="set-desc">Send us a message. We will get back to you via email.</div>
              </div>
              
              <input 
                type="email" 
                placeholder="Your email (Optional)" 
                value={helpEmail}
                onChange={(e) => setHelpEmail(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: '9px',
                  border: '1px solid var(--border)', background: 'var(--inputbg)',
                  color: 'var(--text)', fontSize: '0.84rem', outline: 'none'
                }}
              />
              
              <textarea 
                placeholder="Describe your issue or feedback here..." 
                rows={4}
                value={helpMsg}
                onChange={(e) => setHelpMsg(e.target.value)}
                required
                className="share-ta" 
              />

              {helpStatus === 'success' && (
                <div style={{ color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 600 }}>
                  ✅ Message sent successfully!
                </div>
              )}
              {helpStatus === 'error' && (
                <div style={{ color: 'var(--red)', fontSize: '0.78rem', fontWeight: 600 }}>
                  ❌ Failed to send. Check your connection.
                </div>
              )}

              <button 
                type="submit" 
                disabled={helpStatus === 'sending' || !helpMsg.trim()}
                className="btn-p" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: (helpStatus === 'sending' || !helpMsg.trim()) ? 0.5 : 1 }}
              >
                {helpStatus === 'sending' ? 'Sending...' : '✉️ Send Message'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}