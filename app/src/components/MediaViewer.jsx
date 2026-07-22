import React, { useState } from 'react';
import './MediaViewer.css';
import { Play, Image as ImageIcon, ArrowUpRight, Trash2, Flag, ShieldCheck, EyeOff, TvMinimalPlay, ImagePlay } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const REPORT_THRESHOLD = 5;

const MediaViewer = ({ event, onClose, userRole, onPromoteMedia, onDeleteMedia, onReportMedia, onVerifyMedia, onRequestMajor }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Check which items this browser session has already reported
  const alreadyReported = JSON.parse(localStorage.getItem('timeline_reported') || '{}');

  if (!event || !event.media || event.media.length === 0) return null;


  return (
    <motion.div 
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ overflow: 'hidden' }}
    >
      <div className="media-gallery glass-panel">
        <div className="gallery-header">
          <div>
            <h3>Media Collection</h3>
            <span className="gallery-count">{event.media.length} item{event.media.length !== 1 ? 's' : ''}</span>
          </div>
          <button className="close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>×</button>
        </div>
        <div className="subtimeline">
          <div className="subtimeline-track"></div>
          {event.media.map((item, idx) => {
            const reportCount   = item.reportCount || 0;
            const userReported  = !!alreadyReported[`${event.id}__${idx}`];
            const nearThreshold = reportCount > 0 && reportCount < REPORT_THRESHOLD;

            return (
              <div key={idx} className="subtimeline-item">
                <div className="subtimeline-node" style={{ borderColor: event.color }}></div>
                <div className="subtimeline-content">
                  <div className="subtimeline-time" style={{ color: event.color }}>
                    {item.timestamp ? format(new Date(item.timestamp), 'MMM d • h:mm a') : 'Added Media'}
                    {item.title && <span className="media-item-title"> — {item.title}</span>}
                  </div>

                  <div className="media-item" style={{ position: 'relative' }}>
                    {/* HOST CONTROLS */}
                    {userRole === 'host' && (
                      <div className="host-media-controls">
                        {/* Promote to Major */}
                        <button 
                          className="media-ctrl-btn promote-btn"
                          onClick={(e) => { e.stopPropagation(); onPromoteMedia(event.id, idx); }}
                          title="Promote to Major Event"
                        >
                          <ArrowUpRight size={13} /> Major
                        </button>

                        {/* Verify reported (only show if reported) */}
                        {item.isReported && (
                          <button 
                            className="media-ctrl-btn verify-btn"
                            onClick={(e) => { e.stopPropagation(); onVerifyMedia(event.id, idx); }}
                            title="Verify & restore this media"
                          >
                            <ShieldCheck size={13} /> Verify
                          </button>
                        )}

                        {/* Delete */}
                        {confirmDelete === idx ? (
                          <div className="delete-confirm">
                            <span>Delete?</span>
                            <button className="media-ctrl-btn confirm-yes" onClick={(e) => { e.stopPropagation(); onDeleteMedia(event.id, idx); setConfirmDelete(null); }}>Yes</button>
                            <button className="media-ctrl-btn confirm-no" onClick={(e) => { e.stopPropagation(); setConfirmDelete(null); }}>No</button>
                          </div>
                        ) : (
                          <button 
                            className="media-ctrl-btn delete-btn"
                            onClick={(e) => { e.stopPropagation(); setConfirmDelete(idx); }}
                            title="Delete this media"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        )}
                      </div>
                    )}

                    {/* Reported overlay visible to host when flagged */}
                    {userRole === 'host' && item.isReported && (
                      <div className="reported-overlay">
                        <EyeOff size={18} />
                        <span>{item.reportCount} reports — pending deletion request</span>
                      </div>
                    )}

                    {/* Media content */}
                    <div>
                      {item.type === 'image' ? (
                        <div className="image-wrapper">
                          <img src={item.url} alt="Event capture" />
                          <div className="type-icon"><ImageIcon size={16} color="#fff" /></div>
                        </div>

                      ) : item.type === 'embed' && item.embedType === 'youtube' ? (
                        <div className="embed-wrapper embed-wrapper--youtube">
                          <iframe
                            src={item.embedUrl}
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                          <div className="embed-platform-badge embed-badge--youtube-pill">
                            <TvMinimalPlay size={12} /> YouTube
                          </div>
                        </div>

                      ) : item.type === 'embed' && item.embedType === 'instagram' ? (
                        <div className="embed-wrapper embed-wrapper--instagram">
                          <iframe
                            src={item.embedUrl}
                            title="Instagram post"
                            scrolling="no"
                            allowFullScreen
                            loading="lazy"
                          />
                          <div className="embed-platform-badge embed-badge--instagram-pill">
                            <ImagePlay size={12} /> Instagram
                          </div>
                        </div>

                      ) : (
                        /* Legacy video fallback */
                        <div className="video-wrapper">
                          <video controls src={item.url} />
                          <div className="play-overlay"><Play size={24} color="#fff" /></div>
                        </div>
                      )}
                    </div>

                    {/* USER CONTROLS: Flag as Main Event + Report */}
                    {userRole === 'user' && (
                      <div className="user-media-controls">
                        {/* Flag as Main Event */}
                        {!event.isMajor && (
                          <button
                            className={`flag-main-btn ${event.isMajorRequest ? 'flagged' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!event.isMajorRequest) onRequestMajor(event.id);
                            }}
                            disabled={event.isMajorRequest}
                            title="Flag this event as a Main Event for host review"
                          >
                            <Flag size={12} />
                            {event.isMajorRequest ? 'Flagged as Main' : 'Flag as Main Event'}
                          </button>
                        )}

                        {/* Report — count-aware, once-per-session */}
                        {userReported ? (
                          <div className={`reported-badge ${nearThreshold ? 'near-threshold' : ''}`}>
                            <Flag size={12} />
                            Reported ({reportCount}/{REPORT_THRESHOLD})
                          </div>
                        ) : (
                          <button
                            className="report-btn"
                            onClick={(e) => { e.stopPropagation(); onReportMedia(event.id, idx); }}
                            title={`Report this media (${reportCount} reports so far)`}
                          >
                            <Flag size={12} />
                            Report{reportCount > 0 ? ` (${reportCount})` : ''}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default MediaViewer;
