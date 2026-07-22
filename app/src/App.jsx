import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Upload, LayoutGrid, Layers, Search, Filter, Monitor, Smartphone, ShieldCheck, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import Timeline from './components/Timeline';
import MediaUploader from './components/MediaUploader';
import HostAuthModal from './components/HostAuthModal';
import HostControlPanel from './components/HostControlPanel';
import './App.css';
import { initialEvents } from './mockData';

const PHASES = [
  'All Phases',
  'Phase 1: The Spark',
  'Phase 2: Birth of Movement',
  'Phase 3: NEET Leak & Escalation',
  'Phase 4: The Hunger Strike',
  'Phase 5: Sansad Chalo March'
];

const CATEGORIES = [
  'All',
  'Judicial',
  'Movement',
  'Viral',
  'Scandal',
  'Protest',
  'Campaign',
  'Crackdown',
  'Hunger Strike',
  'Police Action',
  'March',
  'Negotiation',
  'Live Update'
];

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [activeEventId, setActiveEventId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('vertical'); // Default to 'vertical' for both desktop and mobile
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' (default) or 'oldest'
  const [selectedPhase, setSelectedPhase] = useState('All Phases');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showUploader, setShowUploader] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHostPanel, setShowHostPanel] = useState(false);
  const [userRole, setUserRole] = useState('user'); // 'user' or 'host'
  
  const [userVotes, setUserVotes] = useState(() => {
    const saved = localStorage.getItem('timeline_user_votes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Upload handler: Adds new event directly to the flat chronological timeline series
  const handleUpload = (newEvent) => {
    setEvents(prevEvents => {
      const created = {
        ...newEvent,
        id: `e_${Date.now()}`,
        phase: newEvent.phase || 'Phase 5: Sansad Chalo March',
        category: newEvent.category || 'Live Update',
        categoryColor: newEvent.categoryColor || '#06b6d4',
        upvotes: 0,
        downvotes: 0,
        contributors: 1,
      };

      const updated = [...prevEvents, created];
      // Sort strictly chronologically
      updated.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setActiveEventId(created.id);
      return updated;
    });
  };

  // Add media directly to an existing event
  const handleAddMediaToEvent = (eventId, newMediaItem) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const updatedMedia = [...(event.media || []), newMediaItem];
        return { ...event, media: updatedMedia };
      }
      return event;
    }));
  };

  // Add social link to an event (Host Action)
  const handleAddSocialLink = (eventId, newSocialLink) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const updatedLinks = [...(event.socialLinks || []), newSocialLink];
        return { ...event, socialLinks: updatedLinks };
      }
      return event;
    }));
  };

  // Delete social link from an event (Host Action)
  const handleDeleteSocialLink = (eventId, linkIdx) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const newLinks = [...(event.socialLinks || [])];
        newLinks.splice(linkIdx, 1);
        return { ...event, socialLinks: newLinks };
      }
      return event;
    }));
  };

  // Delete event (Host action)
  const handleDeleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
    if (activeEventId === eventId) setActiveEventId(null);
  };

  // Delete media item inside an event (Host action)
  const handleDeleteMedia = (eventId, mediaIdx) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const newMedia = [...event.media];
        newMedia.splice(mediaIdx, 1);
        return { ...event, media: newMedia };
      }
      return event;
    }));
  };

  // User: Report event
  const REPORT_THRESHOLD = 5;
  const handleReportEvent = (eventId) => {
    const storageKey = 'timeline_reported_events';
    const reported = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (reported[eventId]) return; // already reported
    reported[eventId] = true;
    localStorage.setItem(storageKey, JSON.stringify(reported));

    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const newCount = (event.reportCount || 0) + 1;
        return {
          ...event,
          reportCount: newCount,
          isReported: newCount >= REPORT_THRESHOLD
        };
      }
      return event;
    }));
  };

  // Host: Dismiss event reports
  const handleDismissReport = (eventId) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        return { ...event, reportCount: 0, isReported: false };
      }
      return event;
    }));
  };

  // User Voting
  const handleVote = (eventId, voteType) => {
    const currentVote = userVotes[eventId];
    let newVotes = { ...userVotes };
    
    if (currentVote === voteType) {
      delete newVotes[eventId];
    } else {
      newVotes[eventId] = voteType;
    }
    
    setUserVotes(newVotes);
    localStorage.setItem('timeline_user_votes', JSON.stringify(newVotes));

    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        let newUp = event.upvotes || 0;
        let newDown = event.downvotes || 0;
        
        if (currentVote === 'up') newUp -= 1;
        if (currentVote === 'down') newDown -= 1;
        
        if (currentVote !== voteType) {
          if (voteType === 'up') newUp += 1;
          if (voteType === 'down') newDown += 1;
        }
        
        return { ...event, upvotes: Math.max(0, newUp), downvotes: Math.max(0, newDown) };
      }
      return event;
    }));
  };

  const handleRoleToggle = () => {
    if (userRole === 'user') {
      setShowAuthModal(true);
    } else {
      setUserRole('user');
    }
  };

  // Scroll to Top or Bottom helper
  const handleScrollTo = (target) => {
    const el = document.querySelector('.timeline-wrapper');
    if (!el) return;
    if (viewMode === 'vertical') {
      el.scrollTo({
        top: target === 'top' ? 0 : el.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      el.scrollTo({
        left: target === 'top' ? 0 : el.scrollWidth,
        behavior: 'smooth'
      });
    }
  };

  // Filter & Sort events by Phase, Category, Search Query, and Sort Order (Default: Newest First)
  const filteredEvents = events
    .filter(event => {
      const matchesPhase = selectedPhase === 'All Phases' || event.phase === selectedPhase;
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        event.title.toLowerCase().includes(q) || 
        event.description.toLowerCase().includes(q) ||
        (event.location && event.location.toLowerCase().includes(q));

      return matchesPhase && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="app-header">
        <div className="brand-section">
          <h1>The Protest Chronicles</h1>
          <span className="live-indicator-tag">
            <span className="pulse-dot" /> 19 Events Live
          </span>
        </div>

        <div className="header-controls">
          {/* View Mode Orientation Switcher */}
          <div className="view-mode-toggle glass-panel">
            <button 
              className={`view-mode-btn ${viewMode === 'horizontal' ? 'active' : ''}`}
              onClick={() => setViewMode('horizontal')}
              title="Horizontal Timeline View (Landscape)"
            >
              <Monitor size={15} />
              <span className="btn-label">Horizontal</span>
            </button>
            <button 
              className={`view-mode-btn ${viewMode === 'vertical' ? 'active' : ''}`}
              onClick={() => setViewMode('vertical')}
              title="Vertical Chronicle View (Portrait / Mobile)"
            >
              <Smartphone size={15} />
              <span className="btn-label">Vertical</span>
            </button>
          </div>

          {/* Sort Order Configuration Switcher (Default: Newest First) */}
          <div className="sort-order-toggle glass-panel">
            <button 
              className={`sort-order-btn ${sortOrder === 'newest' ? 'active' : ''}`}
              onClick={() => setSortOrder('newest')}
              title="Most recent events at top / first"
            >
              <ArrowDown size={14} /> Newest First
            </button>
            <button 
              className={`sort-order-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
              onClick={() => setSortOrder('oldest')}
              title="Earliest events at top / first"
            >
              <ArrowUp size={14} /> Oldest First
            </button>
          </div>

          {/* Quick Scroll Navigation Buttons */}
          <div className="scroll-nav-controls glass-panel">
            <button 
              className="scroll-nav-btn"
              onClick={() => handleScrollTo('top')}
              title="Jump to Top"
            >
              <ArrowUp size={13} /> Top
            </button>
            <button 
              className="scroll-nav-btn"
              onClick={() => handleScrollTo('bottom')}
              title="Jump to Bottom"
            >
              <ArrowDown size={13} /> Bottom
            </button>
          </div>

          {/* Role Switcher (User / Host) */}
          <div className="role-switcher glass-panel">
            <span 
              className={`role-label ${userRole === 'user' ? 'active' : ''}`} 
              onClick={() => { if(userRole !== 'user') handleRoleToggle(); }}
            >
              User
            </span>
            <div className={`role-toggle ${userRole}`} onClick={handleRoleToggle}>
              <div className="toggle-thumb" />
            </div>
            <span 
              className={`role-label ${userRole === 'host' ? 'active' : ''}`} 
              onClick={() => { if(userRole !== 'host') handleRoleToggle(); }}
            >
              Host
            </span>
          </div>

          {userRole === 'host' && (
            <button 
              className="upload-btn host-panel-trigger glass-panel glass-panel-hover"
              onClick={() => setShowHostPanel(true)}
            >
              <ShieldCheck size={16} /> Host Panel
            </button>
          )}

          <button 
            className="upload-btn glass-panel glass-panel-hover"
            onClick={() => setShowUploader(true)}
          >
            <Upload size={16} /> Add Event
          </button>
        </div>
      </header>

      {/* Segregation & Filter Controls Bar */}
      <div className="filter-bar-container">
        {/* Phase Filter Tabs */}
        <div className="phase-filter-scroll">
          <span className="filter-label"><Layers size={13} /> Phases:</span>
          {PHASES.map(phase => (
            <button
              key={phase}
              className={`phase-chip ${selectedPhase === phase ? 'active' : ''}`}
              onClick={() => setSelectedPhase(phase)}
            >
              {phase}
            </button>
          ))}
        </div>

        {/* Category Filter & Search Bar */}
        <div className="category-search-row">
          <div className="category-filter-scroll">
            <span className="filter-label"><Filter size={13} /> Category:</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-box glass-panel">
            <Search size={14} className="search-icon" />
            <input 
              type="text"
              placeholder="Search event timeline..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
        </div>
      </div>

      {/* Main Timeline Workspace */}
      <main className="app-main">
        {filteredEvents.length === 0 ? (
          <div className="empty-events-state glass-panel">
            <p>No events match your filter criteria.</p>
            <button className="reset-filter-btn" onClick={() => { setSelectedPhase('All Phases'); setSelectedCategory('All'); setSearchQuery(''); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <Timeline 
            events={filteredEvents} 
            activeEventId={activeEventId} 
            onSelectEvent={setActiveEventId} 
            isMobile={viewMode === 'vertical'}
            userRole={userRole}
            onVote={handleVote}
            onReportEvent={handleReportEvent}
            onDeleteEvent={handleDeleteEvent}
            onAddSocialLink={handleAddSocialLink}
            onDeleteSocialLink={handleDeleteSocialLink}
            onDismissReport={handleDismissReport}
            userVotes={userVotes}
          />
        )}
      </main>

      {/* Modals & Popovers */}
      <AnimatePresence>
        {showUploader && (
          <MediaUploader 
            onClose={() => setShowUploader(false)} 
            onUpload={handleUpload}
          />
        )}
        {showAuthModal && (
          <HostAuthModal 
            onClose={() => setShowAuthModal(false)}
            onAuthenticate={() => {
              setUserRole('host');
              setShowAuthModal(false);
            }}
          />
        )}
        {showHostPanel && (
          <HostControlPanel 
            events={events}
            onClose={() => setShowHostPanel(false)}
            onDeleteEvent={handleDeleteEvent}
            onDeleteMedia={handleDeleteMedia}
            onDismissReport={handleDismissReport}
          />
        )}
      </AnimatePresence>
      {/* Floating Bottom-Right Quick Scroll Action Buttons */}
      <div className="floating-scroll-bar glass-panel">
        <button 
          className="floating-scroll-btn"
          onClick={() => handleScrollTo('top')}
          title="Scroll to Top / Latest"
        >
          <ArrowUp size={16} />
        </button>
        <button 
          className="floating-scroll-btn"
          onClick={() => handleScrollTo('bottom')}
          title="Scroll to Bottom / Oldest"
        >
          <ArrowDown size={16} />
        </button>
      </div>
    </div>
  );
}

export default App;
