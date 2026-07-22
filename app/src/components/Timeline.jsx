import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Users, MapPin, CheckCircle, Radio, ThumbsUp, ThumbsDown, ExternalLink, Flag, Trash2, ShieldCheck, Tag } from 'lucide-react';
import './Timeline.css';
import MediaViewer from './MediaViewer';

// ── Detect platform from URL for source link cards ──
const PLATFORM_MAP = [
  { match: /youtube\.com|youtu\.be/i,    label: 'YouTube',   color: '#ff0000', icon: '▶' },
  { match: /instagram\.com/i,            label: 'Instagram', color: '#e1306c', icon: '📸' },
  { match: /twitter\.com|x\.com/i,       label: 'X / Twitter', color: '#1d9bf0', icon: '𝕏' },
  { match: /facebook\.com/i,             label: 'Facebook',  color: '#1877f2', icon: 'f' },
  { match: /linkedin\.com/i,             label: 'LinkedIn',  color: '#0a66c2', icon: 'in' },
  { match: /t\.me|telegram/i,            label: 'Telegram',  color: '#26a5e4', icon: '✈' },
  { match: /wikipedia\.org/i,            label: 'Wikipedia', color: '#888888', icon: 'W' },
  { match: /ndtv\.com|thehindu\.com|hindustantimes\.com|timesofindia\.com|indianexpress\.com/i, label: 'News', color: '#e97316', icon: '📰' },
];

const detectPlatform = (url) => {
  if (!url) return { label: 'Open Link', color: 'var(--accent-blue)', icon: '🔗' };
  for (const p of PLATFORM_MAP) {
    if (p.match.test(url)) return p;
  }
  try {
    const host = new URL(url).hostname.replace('www.', '');
    return { label: host, color: 'var(--accent-blue)', icon: '🌐' };
  } catch { return { label: 'Open Link', color: 'var(--accent-blue)', icon: '🔗' }; }
};

// ── Event Detail Panel — expanded view when a card is selected ──
const EventInfoPanel = ({ event }) => {
  const links = [].concat(event.links || event.link || []).filter(Boolean);
  const catColor = event.categoryColor || '#3b82f6';

  return (
    <motion.div
      className="event-info-panel glass-panel"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Category & Phase Badge Row */}
      <div className="info-badge-row">
        {event.phase && (
          <span className="info-badge info-badge--phase">
            {event.phase}
          </span>
        )}
        {event.category && (
          <span className="info-badge info-badge--category" style={{ background: `${catColor}25`, borderColor: `${catColor}60`, color: catColor }}>
            <Tag size={11} /> {event.category}
          </span>
        )}
        {event.isLive && (
          <span className="info-badge info-badge--live">
            <Radio size={11} className="pulse-icon" /> Live Event
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="info-title">{event.title}</h3>

      {/* Timestamp, Location, Contributors */}
      <div className="info-meta">
        <span className="info-meta-item">
          <span className="info-meta-icon">🕐</span>
          {format(new Date(event.timestamp), 'MMMM d, yyyy • h:mm a IST')}
        </span>
        {event.location && (
          <span className="info-meta-item">
            <MapPin size={13} /> {event.location}
          </span>
        )}
        {event.contributors > 0 && (
          <span className="info-meta-item">
            <Users size={13} /> {event.contributors} contributor{event.contributors !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Full Description Text */}
      <div className="info-description">
        <p>{event.description}</p>
      </div>

      {/* Verified Source Links Cards */}
      {links.length > 0 && (
        <div className="info-links-section">
          <span className="info-links-label">Verified Sources &amp; Coverage Links</span>
          <div className="info-links-grid">
            {links.map((url, i) => {
              const { label, color, icon } = detectPlatform(url);
              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-link-card"
                  style={{ '--link-color': color }}
                  onClick={e => e.stopPropagation()}
                >
                  <span className="info-link-icon">{icon}</span>
                  <div className="info-link-text">
                    <span className="info-link-label">{label}</span>
                    <span className="info-link-url">{url.replace(/^https?:\/\//, '').slice(0, 38)}{url.length > 40 ? '…' : ''}</span>
                  </div>
                  <ExternalLink size={12} className="info-link-arrow" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Timeline = ({ 
  events, 
  activeEventId, 
  onSelectEvent, 
  isMobile, 
  userRole, 
  onVote, 
  onReportEvent, 
  onDeleteEvent, 
  onDeleteMedia,
  onDismissReport,
  userVotes = {} 
}) => {
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Scroll Progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      if (isMobile) {
        const { scrollTop, scrollHeight, clientHeight } = timelineRef.current;
        const p = scrollTop / (scrollHeight - clientHeight);
        setProgress(p * 100 || 0);
      } else {
        const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
        const p = scrollLeft / (scrollWidth - clientWidth);
        setProgress(p * 100 || 0);
      }
    };

    const currentRef = timelineRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile, events]);

  const handleNodeClick = (id) => {
    if (activeEventId === id) {
      onSelectEvent(null);
      return;
    }

    onSelectEvent(id);
    
    const element = document.getElementById(`node-${id}`);
    if (element && timelineRef.current) {
      if (isMobile) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  };

  return (
    <div className={`timeline-wrapper ${isMobile ? 'vertical' : 'horizontal'}`} ref={timelineRef}>
      <div className="timeline-container">
        {/* Continuous Track Progress Line */}
        <div className="timeline-track">
          <div 
            className="timeline-progress" 
            style={{
              [isMobile ? 'height' : 'width']: `${progress}%`,
              [isMobile ? 'width' : 'height']: '2px'
            }}
          />
        </div>

        {events.map((event, index) => {
          const isActive = activeEventId === event.id;
          const isTop = index % 2 === 0;
          
          const eventDate = format(new Date(event.timestamp), 'yyyy-MM-dd');
          const prevEventDate = index > 0 ? format(new Date(events[index - 1].timestamp), 'yyyy-MM-dd') : null;
          const showDateSeparator = eventDate !== prevEventDate;
          
          const eventPhase = event.phase;
          const prevPhase = index > 0 ? events[index - 1].phase : null;
          const showPhaseBanner = eventPhase && eventPhase !== prevPhase;
          
          const catColor = event.categoryColor || '#3b82f6';
          const linkCount = (event.links || []).length;
          const mediaCount = (event.media || []).length;

          return (
            <React.Fragment key={`wrap-${event.id}`}>
              {/* Phase Banner Header */}
              {showPhaseBanner && (
                <div className="phase-banner-divider">
                  <div className="phase-banner-badge glass-panel">
                    <span className="phase-indicator-dot" />
                    {eventPhase}
                  </div>
                </div>
              )}

              {/* Date Separator */}
              {showDateSeparator && !showPhaseBanner && (
                <div className="date-separator">
                  <div className="date-line" />
                  <div className="date-badge glass-panel">
                    {format(new Date(event.timestamp), 'MMMM d, yyyy')}
                  </div>
                </div>
              )}

              <div 
                id={`node-${event.id}`}
                className={`timeline-milestone ${isActive ? 'active' : ''} ${isTop ? 'position-top' : 'position-bottom'}`}
                onClick={() => handleNodeClick(event.id)}
              >
                {/* Event Card */}
                <motion.div 
                  className="event-card glass-panel glass-panel-hover"
                  initial={{ opacity: 0, y: isTop ? -15 : 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                  style={{ borderColor: isActive ? catColor : undefined }}
                >
                  <div className="card-thumbnail">
                    <img src={event.thumbnail} alt={event.title} loading="lazy" />
                    
                    {event.isLive && (
                      <div className="live-badge">
                        <Radio size={11} className="pulse-icon" /> LIVE
                      </div>
                    )}
                    
                    {event.category && (
                      <div className="category-pill" style={{ background: catColor }}>
                        {event.category}
                      </div>
                    )}
                  </div>
                  
                  <div className="card-content">
                    <div className="card-meta">
                      <span className="timestamp" style={{ color: catColor }}>
                        {format(new Date(event.timestamp), 'MMM d • h:mm a')}
                      </span>
                    </div>

                    <h4 className="title">{event.title}</h4>
                    <p className="description">{event.description}</p>
                    
                    <div className="card-footer">
                      <div className="footer-stats">
                        {event.location && (
                          <span className="stat" title={event.location}>
                            <MapPin size={12} /> {event.location.split(',')[0]}
                          </span>
                        )}

                        {mediaCount > 0 && (
                          <span className="media-count-badge" style={{ background: `${catColor}30`, color: catColor, border: `1px solid ${catColor}50` }}>
                            {mediaCount} media
                          </span>
                        )}

                        {linkCount > 0 && (
                          <span className="sources-count-badge">
                            <ExternalLink size={11} /> {linkCount} source{linkCount > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <div className="vote-controls">
                        <button 
                          className={`vote-btn upvote ${userVotes[event.id] === 'up' ? 'voted' : ''}`} 
                          onClick={(e) => { e.stopPropagation(); onVote(event.id, 'up'); }}
                          title="Upvote event"
                        >
                          <ThumbsUp size={13} /> {event.upvotes || 0}
                        </button>
                        <button 
                          className={`vote-btn downvote ${userVotes[event.id] === 'down' ? 'voted' : ''}`} 
                          onClick={(e) => { e.stopPropagation(); onVote(event.id, 'down'); }}
                          title="Downvote event"
                        >
                          <ThumbsDown size={13} /> {event.downvotes || 0}
                        </button>

                        {/* Report Event (User role) */}
                        {userRole === 'user' && (
                          <button
                            className={`report-event-btn ${event.isReported ? 'reported' : ''}`}
                            onClick={(e) => { e.stopPropagation(); onReportEvent(event.id); }}
                            title={event.isReported ? 'Reported to Host' : 'Report Event'}
                          >
                            <Flag size={12} />
                          </button>
                        )}

                        {/* Delete Event (Host role) */}
                        {userRole === 'host' && (
                          <button
                            className="host-delete-event-btn"
                            onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}
                            title="Delete Event from Timeline"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Connecting Line to Node Marker */}
                <div className="connection-line" />

                {/* Central Node Marker on Track */}
                <div className="node-marker" style={{ borderColor: catColor }}>
                  <div 
                    className="node-dot" 
                    style={{ 
                      backgroundColor: catColor,
                      boxShadow: isActive ? `0 0 16px ${catColor}` : 'none'
                    }} 
                  />
                  <div className={`major-time-label ${isTop ? 'label-bottom' : 'label-top'}`}>
                    <span className="major-time-text">{format(new Date(event.timestamp), 'MMM d • h:mm a')}</span>
                  </div>
                </div>

                {/* Expanded Event Details Container — Info Panel + Media Gallery */}
                {isActive && (
                  <AnimatePresence>
                    <motion.div 
                      className="expanded-details-container"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      onClick={e => e.stopPropagation()}
                    >
                      {/* Detailed Event Description & Sources */}
                      <EventInfoPanel key={`info-${event.id}`} event={event} />

                      {/* Attached Media Collection (if event has media) */}
                      {mediaCount > 0 && (
                        <MediaViewer
                          event={event}
                          onClose={() => onSelectEvent(null)}
                          userRole={userRole}
                          onDeleteMedia={onDeleteMedia}
                          onReportMedia={onReportEvent}
                          onVerifyMedia={onDismissReport}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
