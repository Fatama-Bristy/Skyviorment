import { useState, useEffect } from 'react';
import { FiAlertCircle } from '../icons';

export default function LoginModal({ open, onClose, onLogin }) {
  const [mode, setMode] = useState('login');
  const [err, setErr] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  useEffect(() => { setErr(''); }, [mode]);

  if (!open) return null;

  const login = () => {
    if (!email || !pass) return setErr('Please fill in all fields');
    if (!email.includes('@')) return setErr('Enter a valid email');
    let stored = null;
    try { stored = JSON.parse(localStorage.getItem('skyv_reg')); } catch {}
    if (stored && stored.email === email && stored.pass === pass) { onLogin({ name: stored.name, email: stored.email }); onClose(); return; }
    if (!stored) { onLogin({ name: email.split('@')[0], email }); onClose(); return; }
    setErr('Invalid email or password');
  };

  const register = () => {
    if (!name || !email || !pass) return setErr('Please fill in all fields');
    if (!email.includes('@')) return setErr('Enter a valid email');
    if (pass.length < 3) return setErr('Password must be at least 3 characters');
    try { localStorage.setItem('skyv_reg', JSON.stringify({ name, email, pass })); } catch {}
    onLogin({ name, email }); onClose();
  };

  return (
    <div className="modal-ov open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <h2 className="modal-title">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
        <p className="modal-sub">{mode === 'login' ? 'Access saved locations and unlimited AI' : 'Join Skyviorment'}</p>
        {err && <div className="modal-err show"><FiAlertCircle size={12} style={{marginRight:6,verticalAlign:'middle'}} />{err}</div>}
        {mode === 'login' ? (
          <>
            <div className="fg"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></div>
            <div className="fg"><label>Password</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter password" /></div>
            <button className="btn-p" onClick={login}>Sign In</button>
            <button className="btn-s" onClick={()=>setMode('register')}>Create Account</button>
          </>
        ) : (
          <>
            <div className="fg"><label>Full Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="John Doe" /></div>
            <div className="fg"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></div>
            <div className="fg"><label>Password</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Choose a password" /></div>
            <button className="btn-p" onClick={register}>Create Account</button>
            <button className="btn-s" onClick={()=>setMode('login')}>Already have an account</button>
          </>
        )}
        <button className="btn-s" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}