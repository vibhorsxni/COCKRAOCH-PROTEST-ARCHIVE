import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Tag, ArrowDown, Trash2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import './HostControlPanel.css';

const REPORT_THRESHOLD = 5;

const HostControlPanel = ({ events, onClose, onToggleMajor, onDemoteMajor, onDeleteMedia, onDismissReport }) => {
  const [confirmDelete, setConfirmDelete] = useState(null); // `${eventId}__${mediaIdx}`

  const pendingRequests = events.filter(e => e.isMajorRequest && !e.isMajor);
  const otherEvents     = events.filter(e => !e.isMajorRequest && !e.isMajor);
  const majorEvents     = events.filter(e => e.isMajor);

  // Collect all media items that have hit the report threshold — clubbed by item, sorted by count desc
  const deletionRequests = [];
  events.forEach(event => {
    (event.media || []).forEach((item, idx) => {
      if ((item.reportCount || 0) >= REPORT_THRESHOLD) {
        deletionRequests.push({ event, mediaIdx: idx, item });
      }
    });
  });
  deletionRequests.sort((a, b) => (b.item.reportCount || 0) - (a.item.reportCount || 0));

  // Items with at least 1 report but below threshold — for awareness
  const lowReports = [];
  events.forEach(event => {
    (event.media || []).forEach((item, idx) => {
      const count = item.reportCount || 0;
      if (count > 0 && count < REPORT_THRESHOLD) {
        lowReports.push({ event, mediaIdx: idx, item });
      }
    });
  });

  const handleDelete = (eventId, mediaIdx) => {
    onDeleteMedia(eventId, mediaIdx);
    setConfirmDelete(null);
  };

  return (
    <div className="host-panel-overlay" onClick={onClose}>
      <motion.div
        className="host-panel glass-panel"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="host-panel-header">
          <h2>Host Control Panel</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="host-panel-content">

          {/* ── Deletion Requests (≥ threshold reports, clubbed) ── */}
          <section className="panel-section reported-section">
            <h3>
              <AlertTriangle size={15} style={{ display:'inline', marginRight:'6px', verticalAlign:'text-bottom' }} />
              Deletion Requests ({deletionRequests.length})
            </h3>
            <p className="section-hint">Media flagged by {REPORT_THRESHOLD}+ users. You decide: Delete or Dismiss.</p>

            {deletionRequests.length === 0 ? (
              <p className="empty-state">No deletion requests. All clear!</p>
            ) : (
              <div className="event-list">
                {deletionRequests.map(({ event, mediaIdx, item }) => {
                  const key = `${event.id}__${mediaIdx}`;
                  return (
                    <div key={key} className="event-list-item reported-item">
                      {/* Count badge */}
                      <div className="report-count-badge">
                        {item.reportCount}
                        <span>reports</span>
                      </div>

                      <div className="item-info">
                        <strong>{item.title || (item.embedType === 'youtube' ? 'YouTube Embed' : item.type === 'image' ? 'Image' : 'Media')}</strong>
                        <span>
                          Under: <em>{event.title}</em>
                          {item.timestamp && ` · ${new Date(item.timestamp).toLocaleDateString()}`}
                        </span>
                      </div>

                      <div className="item-actions">
                        {confirmDelete === key ? (
                          <>
                            <span className="confirm-label">Sure?</span>
                            <button className="approve-btn confirm-yes" onClick={() => handleDelete(event.id, mediaIdx)}>
                              <Trash2 size={13} /> Yes, Delete
                            </button>
                            <button className="remove-major-btn confirm-no" onClick={() => setConfirmDelete(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="remove-major-btn"
                              onClick={() => setConfirmDelete(key)}
                              title="Permanently delete this media"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                            <button
                              className="approve-btn"
                              onClick={() => onDismissReport(event.id, mediaIdx)}
                              title="Dismiss all reports — keep media visible"
                            >
                              <ShieldCheck size={13} /> Dismiss
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Low-report awareness (below threshold) */}
            {lowReports.length > 0 && (
              <details className="low-report-details">
                <summary>
                  <XCircle size={12} style={{ marginRight:'5px' }} />
                  {lowReports.length} item{lowReports.length > 1 ? 's' : ''} with pending reports (below {REPORT_THRESHOLD})
                </summary>
                <div className="event-list" style={{ marginTop:'8px' }}>
                  {lowReports.map(({ event, mediaIdx, item }) => (
                    <div key={`${event.id}__${mediaIdx}`} className="event-list-item low-report-item">
                      <div className="report-count-badge low">
                        {item.reportCount}
                        <span>/{REPORT_THRESHOLD}</span>
                      </div>
                      <div className="item-info">
                        <strong>{item.title || item.type}</strong>
                        <span>Under: <em>{event.title}</em></span>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </section>

          {/* ── Pending Major Requests ── */}
          <section className="panel-section">
            <h3>Pending Major Requests ({pendingRequests.length})</h3>
            {pendingRequests.length === 0 ? (
              <p className="empty-state">No pending requests.</p>
            ) : (
              <div className="event-list">
                {pendingRequests.map(event => (
                  <div key={event.id} className="event-list-item">
                    <div className="item-info">
                      <strong>{event.title}</strong>
                      <span>{new Date(event.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="item-actions">
                      <button className="approve-btn" onClick={() => onToggleMajor(event.id)}>
                        <Check size={16} /> Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Other Events ── */}
          <section className="panel-section">
            <h3>Other Events ({otherEvents.length})</h3>
            {otherEvents.length === 0 ? (
              <p className="empty-state">No regular events available.</p>
            ) : (
              <div className="event-list">
                {otherEvents.map(event => (
                  <div key={event.id} className="event-list-item">
                    <div className="item-info">
                      <strong>{event.title}</strong>
                      <span>{new Date(event.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="item-actions">
                      <button className="tag-major-btn" onClick={() => onToggleMajor(event.id)}>
                        <Tag size={14} style={{ marginRight:'4px' }} /> Tag Major
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Current Major Events ── */}
          <section className="panel-section">
            <h3>Current Major Events ({majorEvents.length})</h3>
            {majorEvents.length === 0 ? (
              <p className="empty-state">No major events yet.</p>
            ) : (
              <div className="event-list">
                {majorEvents.map(event => (
                  <div key={event.id} className="event-list-item major-item">
                    <div className="item-info">
                      <strong>{event.title}</strong>
                      <span>{new Date(event.timestamp).toLocaleDateString()} · {event.media?.length || 0} media items</span>
                    </div>
                    <div className="item-actions">
                      <button
                        className="remove-major-btn"
                        onClick={() => onDemoteMajor(event.id)}
                        title="Demote: merge media into previous major event"
                      >
                        <ArrowDown size={14} /> Demote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default HostControlPanel;
