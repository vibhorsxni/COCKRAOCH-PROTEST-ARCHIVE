import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud, X, Calendar, Clock, Video, Image as ImageIcon,
  Link as LinkIcon, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  TvMinimalPlay, ImagePlay
} from 'lucide-react';
import './MediaUploader.css';

/* ═══════════════════════════════════════════════════════
   EMBED DETECTION HELPERS
═══════════════════════════════════════════════════════ */
const getYouTubeId = (url) => {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
};

const getInstagramCode = (url) => {
  const m = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
};

const detectEmbed = (url) => {
  if (!url) return null;
  const ytId = getYouTubeId(url);
  if (ytId) return { type: 'youtube', id: ytId, embedUrl: `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1` };
  const igCode = getInstagramCode(url);
  if (igCode) return { type: 'instagram', id: igCode, embedUrl: `https://www.instagram.com/p/${igCode}/embed/captioned/` };
  
  return null;
};

/* ═══════════════════════════════════════════════════════
   SHARED HELPERS
═══════════════════════════════════════════════════════ */
const pad = (n) => String(n).padStart(2, '0');
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function useDismiss(ref, onClose) {
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onClose]);
}

/* ═══════════════════════════════════════════════════════
   CUSTOM CALENDAR PICKER
═══════════════════════════════════════════════════════ */
const CustomDatePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useDismiss(ref, () => setOpen(false));

  const parseDate = (str) => {
    if (!str) return null;
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const selected = parseDate(value);
  const today    = new Date();
  const [viewYear,  setViewYear]  = useState(selected?.getFullYear()  ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth()      ?? today.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const selectDay = (d) => { onChange(`${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`); setOpen(false); };

  const isSelected = (d) => selected && selected.getFullYear() === viewYear && selected.getMonth() === viewMonth && selected.getDate() === d;
  const isToday    = (d) => today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === d;

  const displayDate = selected
    ? selected.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Pick a date';

  return (
    <div className="tp-root" ref={ref}>
      <button type="button" className="tp-trigger form-input-box" onClick={() => setOpen(o => !o)}>
        <Calendar size={16} className="tp-trigger-icon" />
        <span style={{ color: selected ? 'white' : 'rgba(255,255,255,0.4)' }}>{displayDate}</span>
        <ChevronDown size={14} className={`tp-caret ${open ? 'open' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="tp-panel cal-panel glass-panel"
            initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.18 }}>
            <div className="cal-header">
              <button type="button" className="cal-nav" onClick={prevMonth}><ChevronLeft size={16} /></button>
              <div className="cal-month-label">
                <span className="cal-month">{MONTHS[viewMonth]}</span>
                <span className="cal-year">{viewYear}</span>
              </div>
              <button type="button" className="cal-nav" onClick={nextMonth}><ChevronRight size={16} /></button>
            </div>
            <div className="cal-grid cal-dow-row">{DAYS.map(d => <div key={d} className="cal-dow">{d}</div>)}</div>
            <div className="cal-grid">
              {cells.map((d, i) => (
                <div key={i}
                  className={['cal-cell', !d ? 'cal-empty' : '', d && isSelected(d) ? 'cal-selected' : '', d && isToday(d) && !isSelected(d) ? 'cal-today' : ''].join(' ')}
                  onClick={() => d && selectDay(d)}>
                  {d || ''}
                </div>
              ))}
            </div>
            <div className="cal-footer">
              <button type="button" className="cal-today-btn" onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); selectDay(today.getDate()); }}>Today</button>
              <button type="button" className="tp-done" onClick={() => setOpen(false)}>Done</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   CUSTOM TIME PICKER
═══════════════════════════════════════════════════════ */
const ScrollColumn = ({ values, selected, onSelect, label }) => {
  const listRef = useRef(null);
  useEffect(() => {
    const idx = values.indexOf(selected);
    if (listRef.current && idx !== -1) {
      const item = listRef.current.children[idx];
      if (item) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selected, values]);

  return (
    <div className="tp-column">
      <div className="tp-col-label">{label}</div>
      <button className="tp-arrow" type="button" onClick={() => { const idx = values.indexOf(selected); onSelect(values[(idx - 1 + values.length) % values.length]); }}><ChevronUp size={16} /></button>
      <div className="tp-scroll" ref={listRef}>
        {values.map(v => <div key={v} className={`tp-item ${v === selected ? 'tp-selected' : ''}`} onClick={() => onSelect(v)}>{pad(v)}</div>)}
      </div>
      <button className="tp-arrow" type="button" onClick={() => { const idx = values.indexOf(selected); onSelect(values[(idx + 1) % values.length]); }}><ChevronDown size={16} /></button>
    </div>
  );
};

const CustomTimePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useDismiss(ref, () => setOpen(false));
  const [hStr, mStr] = (value || '00:00').split(':');
  const rawH = parseInt(hStr, 10) || 0;
  const rawM = parseInt(mStr, 10) || 0;
  const ampm = rawH >= 12 ? 'PM' : 'AM';
  const hour12 = rawH % 12 || 12;
  const minute = rawM;
  const hours   = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const commit = (h12, m, ap) => { let h24 = h12 % 12; if (ap === 'PM') h24 += 12; onChange(`${pad(h24)}:${pad(m)}`); };

  return (
    <div className="tp-root" ref={ref}>
      <button type="button" className="tp-trigger form-input-box" onClick={() => setOpen(o => !o)}>
        <Clock size={16} className="tp-trigger-icon" />
        <span>{`${pad(hour12)}:${pad(minute)} ${ampm}`}</span>
        <ChevronDown size={14} className={`tp-caret ${open ? 'open' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="tp-panel glass-panel"
            initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.18 }}>
            <div className="tp-body">
              <ScrollColumn label="HR"  values={hours}   selected={hour12} onSelect={h => commit(h, minute, ampm)} />
              <div className="tp-sep">:</div>
              <ScrollColumn label="MIN" values={minutes} selected={minute} onSelect={m => commit(hour12, m, ampm)} />
              <div className="tp-ampm">
                {['AM','PM'].map(ap => (
                  <button key={ap} type="button" className={`tp-ampm-btn ${ampm === ap ? 'active' : ''}`} onClick={() => commit(hour12, minute, ap)}>{ap}</button>
                ))}
              </div>
            </div>
            <div className="tp-footer">
              <button type="button" className="tp-done" onClick={() => setOpen(false)}>Done</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   EMBED LINK INPUT — with live preview badge
═══════════════════════════════════════════════════════ */
const EmbedLinkInput = ({ value, onChange }) => {
  const embed = detectEmbed(value);

  return (
    <div className="embed-input-wrap">
      <div className="embed-input-row">
        <LinkIcon size={16} className="embed-icon" />
        <input
          type="url"
          className="embed-url-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste a YouTube or Instagram link…"
        />
        {value && (
          <button type="button" className="embed-clear" onClick={() => onChange('')}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* Live detection badge */}
      {value && (
        <div className={`embed-badge ${embed ? `embed-badge--${embed.type}` : 'embed-badge--unknown'}`}>
          {embed?.type === 'youtube'   && <><TvMinimalPlay size={13} /> YouTube detected</>}
          {embed?.type === 'instagram' && <><ImagePlay size={13} /> Instagram detected</>}
          {!embed && <>⚠ Unrecognised URL — paste a YouTube or Instagram link</>}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN UPLOADER
═══════════════════════════════════════════════════════ */
const MediaUploader = ({ onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file,       setFile]       = useState(null);
  const [embedUrl,   setEmbedUrl]   = useState('');
  const [title,      setTitle]      = useState('');
  const [date,       setDate]       = useState('');
  const [time,       setTime]       = useState('12:00');
  const [link,       setLink]       = useState('');
  const [isMajor,    setIsMajor]    = useState(false);

  const embed = detectEmbed(embedUrl);

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };
  const handleChange = (e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); };

  // Valid if: image file OR valid embed link
  const hasMedia = file || (embed !== null);
  const canSubmit = hasMedia && title && date && time;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const timestamp = new Date(`${date}T${time}`).toISOString();

    let mediaItem;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      mediaItem = { type: 'image', url: fileUrl };
    } else {
      mediaItem = {
        type: 'embed',
        embedType: embed.type,           // 'youtube' | 'instagram'
        embedId:   embed.id,
        embedUrl:  embed.embedUrl,
        url:       embedUrl,             // original link (for display)
      };
    }

    onUpload({
      id: `e_${Date.now()}`, title, timestamp,
      description: 'Newly uploaded media event.',
      mediaCount: 1, contributors: 1, location: 'Uploaded',
      thumbnail: file
        ? URL.createObjectURL(file)
        : embed?.type === 'youtube'
          ? `https://img.youtube.com/vi/${embed.id}/hqdefault.jpg`
          : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
      color: 'var(--accent-blue)', isMajor, isLive: false,
      link: link.trim() !== '' ? link : undefined,
      media: [mediaItem],
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <motion.div className="modal-content glass-panel"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}>

        <div className="modal-header">
          <h2>Upload Media</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">

          {/* ── Image drop zone (images only) ── */}
          <div className="media-tabs">
            <div className="media-tab-label">
              <ImageIcon size={15} /> Image Upload
            </div>
            <div
              className={`drop-zone ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            >
              <input type="file" id="file-upload" accept="image/*" onChange={handleChange} />
              {file ? (
                <div className="file-info">
                  <ImageIcon size={40} />
                  <p>{file.name}</p>
                  <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <button type="button" className="file-remove" onClick={() => setFile(null)}>Remove</button>
                </div>
              ) : (
                <label htmlFor="file-upload" className="drop-label">
                  <UploadCloud size={44} color="var(--accent-blue)" />
                  <p>Drag &amp; drop an image</p>
                  <span>JPG, PNG, GIF, WebP — or click to browse</span>
                </label>
              )}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="media-divider"><span>or embed a video</span></div>

          {/* ── Video embed link ── */}
          <div className="media-tabs">
            <div className="media-tab-label">
              <Video size={15} /> Video Embed Link
            </div>
            <EmbedLinkInput value={embedUrl} onChange={setEmbedUrl} />
          </div>

          {/* ── Title ── */}
          <div className="form-group">
            <label>Event Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Opening Keynote" required />
          </div>

          {/* ── Date + Time ── */}
          <div className="form-row">
            <div className="form-group">
              <label><Calendar size={16} /> Date</label>
              <CustomDatePicker value={date} onChange={setDate} />
            </div>
            <div className="form-group">
              <label><Clock size={16} /> Time</label>
              <CustomTimePicker value={time} onChange={setTime} />
            </div>
          </div>

          {/* ── Redirect link ── */}
          <div className="form-group">
            <label><LinkIcon size={16} style={{ display:'inline', verticalAlign:'text-bottom' }} /> Redirection Link (Optional)</label>
            <input type="url" value={link} onChange={e => setLink(e.target.value)} placeholder="e.g., https://example.com" />
          </div>

          {/* ── Major checkbox ── */}
          <div className="form-checkbox">
            <input type="checkbox" id="is-major" checked={isMajor} onChange={e => setIsMajor(e.target.checked)} />
            <label htmlFor="is-major">Mark as Major Event (Approved by Host)</label>
          </div>

          <button type="submit" className="submit-btn" disabled={!canSubmit}>
            Add to Timeline
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default MediaUploader;
