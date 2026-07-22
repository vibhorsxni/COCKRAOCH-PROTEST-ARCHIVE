import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import './HostAuthModal.css';

const HostAuthModal = ({ onClose, onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Hash the entered password using Web Crypto API to avoid exposing plaintext
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Allowed hashes for 25bai71181 and 25bai71179
    const allowedHashes = [
      'dab922a6c8be7430e34943657c49d1901330eb28af8c14571286f3c1b72c46f4',
      '86567bc002aaba49e93578ce198388ccd1a0771aa65157b28e574453535827fc'
    ];

    if (allowedHashes.includes(hashHex)) {
      onAuthenticate();
    } else {
      setError('Incorrect host password.');
      setPassword('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="auth-modal glass-panel"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        
        <div className="auth-header">
          <div className="icon-wrapper">
            <Lock size={24} color="var(--accent-blue)" />
          </div>
          <h2>Host Access</h2>
          <p>Please enter the host password to gain administrative privileges.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Enter host password..."
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              autoFocus
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="submit-btn" disabled={!password}>
            Authenticate
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default HostAuthModal;
