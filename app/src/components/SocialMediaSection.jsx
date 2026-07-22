import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trash2, Plus, Sparkles, X, Share2 } from 'lucide-react';
import './SocialMediaSection.css';

// Platform detection helper for social media links
const SOCIAL_PLATFORM_MAP = [
  { match: /youtube\.com|youtu\.be/i, label: 'YouTube', color: '#ff0000', icon: '▶' },
  { match: /instagram\.com/i, label: 'Instagram', color: '#e1306c', icon: '📸' },
  { match: /twitter\.com|x\.com/i, label: 'X / Twitter', color: '#1d9bf0', icon: '𝕏' },
  { match: /facebook\.com/i, label: 'Facebook', color: '#1877f2', icon: 'f' },
  { match: /tiktok\.com/i, label: 'TikTok', color: '#ff0050', icon: '🎵' },
  { match: /t\.me|telegram/i, label: 'Telegram', color: '#26a5e4', icon: '✈' },
  { match: /ndtv\.com|thehindu\.com|hindustantimes\.com|timesofindia\.com|indianexpress\.com/i, label: 'News', color: '#e97316', icon: '📰' }
];

const detectSocialPlatform = (url) => {
  if (!url) return { label: 'Web Link', color: '#3b82f6', icon: '🔗' };
  for (const p of SOCIAL_PLATFORM_MAP) {
    if (p.match.test(url)) return p;
  }
  try {
    const host = new URL(url).hostname.replace('www.', '');
    return { label: host, color: '#3b82f6', icon: '🌐' };
  } catch {
    return { label: 'Web Link', color: '#3b82f6', icon: '🔗' };
  }
};

const SocialMediaSection = ({ 
  event, 
  onClose, 
  userRole, 
  onAddSocialLink, 
  onDeleteSocialLink 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [formError, setFormError] = useState('');

  const socialLinks = event.socialLinks || [];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) {
      setFormError('Please provide both a title and a valid URL.');
      return;
    }

    try {
      new URL(newUrl.trim());
    } catch {
      setFormError('Please enter a valid HTTP/HTTPS URL.');
      return;
    }

    onAddSocialLink(event.id, {
      title: newTitle.trim(),
      url: newUrl.trim(),
      timestamp: new Date().toISOString()
    });

    setNewTitle('');
    setNewUrl('');
    setFormError('');
    setShowAddForm(false);
  };

  return (
    <motion.div 
      className="social-section-wrapper glass-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Bar */}
      <div className="social-section-header">
        <div className="header-title-group">
          <Sparkles size={16} className="sparkle-icon" />
          <h3>Trending Social Media &amp; Viral Clips</h3>
          <span className="social-count-tag">
            {socialLinks.length} link{socialLinks.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="header-action-group">
          {/* Host-only Add Button */}
          {userRole === 'host' && (
            <button 
              className="host-add-link-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              title="Add a new viral or trending video link"
            >
              <Plus size={14} /> Add Social Link
            </button>
          )}

          {onClose && (
            <button className="social-close-btn" onClick={onClose} title="Close section">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Host-Only Form: Add Trending Social Link */}
      {userRole === 'host' && showAddForm && (
        <motion.form 
          className="host-add-form glass-panel"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleAddSubmit}
        >
          <div className="form-title-row">
            <h4>Add Viral / Trending Video Link</h4>
            <span className="host-notice-badge">Host Only</span>
          </div>

          {formError && <div className="form-error-msg">{formError}</div>}

          <div className="input-group">
            <input 
              type="text" 
              placeholder="Title (e.g. Ground footage of Sansad Chalo clashes)" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input 
              type="url" 
              placeholder="Social Media / Video URL (YouTube, Instagram Reel, X post...)" 
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>

          <div className="form-btn-row">
            <button type="submit" className="submit-link-btn">
              <Plus size={14} /> Add Link to Event
            </button>
            <button 
              type="button" 
              className="cancel-link-btn"
              onClick={() => { setShowAddForm(false); setFormError(''); }}
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      {/* Social Media Links Grid / List */}
      {socialLinks.length === 0 ? (
        <div className="no-social-links">
          <p>No viral or trending social media links added for this event yet.</p>
          {userRole === 'host' ? (
            <button className="add-first-link-btn" onClick={() => setShowAddForm(true)}>
              + Add First Social Link
            </button>
          ) : (
            <span className="user-read-only-hint">Only verified hosts can attach new viral video links.</span>
          )}
        </div>
      ) : (
        <div className="social-links-grid">
          {socialLinks.map((item, idx) => {
            const { label, color, icon } = detectSocialPlatform(item.url);

            return (
              <div key={idx} className="social-link-card glass-panel" style={{ '--platform-color': color }}>
                {/* Platform Badge */}
                <span className="social-platform-badge">
                  <span className="platform-icon">{icon}</span>
                  <span className="platform-label">{label}</span>
                </span>

                {/* Content */}
                <div className="social-card-body">
                  <h5 className="social-card-title">{item.title}</h5>
                  <span className="social-card-url">
                    {item.url.replace(/^https?:\/\//, '').slice(0, 45)}
                    {item.url.length > 48 ? '…' : ''}
                  </span>
                </div>

                {/* Actions Row */}
                <div className="social-card-actions">
                  {/* Click to Redirect (All Users) */}
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="redirect-link-btn"
                    onClick={(e) => e.stopPropagation()}
                    title="Watch / View on external platform"
                  >
                    Watch <ExternalLink size={13} />
                  </a>

                  {/* Delete Link Button (HOST ONLY) */}
                  {userRole === 'host' && (
                    <button 
                      className="host-delete-social-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSocialLink(event.id, idx);
                      }}
                      title="Delete social link (Host Only)"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default SocialMediaSection;
