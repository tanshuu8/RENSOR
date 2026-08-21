import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RensorAI.css';

const SUGGESTED_PROMPTS = [
  'What does RENSOR build?',
  'I run a restaurant. What could you build for me?',
  'Can you build a full-stack product?',
  'How could AI help my business?',
  'How do I start a project?',
];

/**
 * Mock response system — clean separation for future LLM/API integration.
 *
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The assistant's response
 */
async function getAssistantResponse(userMessage) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const msg = userMessage.toLowerCase();

  if (msg.includes('what does rensor build') || msg.includes('what do you build')) {
    return 'RENSOR builds high-performance websites, digital products and AI-powered experiences. From brand websites and landing pages to full-stack web applications, SaaS dashboards and intelligent automation systems.';
  }

  if (msg.includes('restaurant') || msg.includes('hospitality') || msg.includes('cafe')) {
    return 'For hospitality businesses, we design high-conversion websites with digital menus, table reservation flows, and AI assistants that handle booking enquiries & FAQ automatically via web or WhatsApp.';
  }

  if (msg.includes('full-stack') || msg.includes('product') || msg.includes('saas') || msg.includes('app')) {
    return 'Yes — we design and develop full-stack digital products from concept to launch: SaaS platforms, customer portals, custom dashboards, and MVPs with modern architecture and API integrations.';
  }

  if (msg.includes('ai') || msg.includes('automation') || msg.includes('intelligence')) {
    return 'We engineer custom AI assistants, knowledge bots, automated lead qualification, appointment booking, and workflow automation to help your business operate faster and convert more leads.';
  }

  if (msg.includes('start') || msg.includes('project') || msg.includes('begin') || msg.includes('contact')) {
    return 'You can start a project by heading to our Contact page. Select what you are looking to build, tell us your vision, and we will get back to you with a tailored roadmap.';
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('budget')) {
    return 'Every build is tailored to your business goals. Reach out via our Contact form with your project scope, and we will prepare a dedicated proposal.';
  }

  return 'RENSOR is a design-led digital studio creating high-performance websites, digital products, and intelligent experiences. Feel free to ask about our capabilities or visit our contact page to start a build.';
}

export default function RensorAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = useCallback(async (text) => {
    const message = (text || inputValue).trim();
    if (!message || isLoading) return;

    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await getAssistantResponse(message);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again or visit our contact page.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (prompt) => {
    handleSend(prompt);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    setInputValue('');
  };

  const handleResetConversation = () => {
    setMessages([]);
    setInputValue('');
  };

  return (
    <>
      {/* Black Circular Floating Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="rensor-ai-trigger"
            onClick={handleOpen}
            aria-label="Open RENSOR AI Assistant"
            id="rensor-ai-trigger"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/images/logo-mark.png"
              alt="RENSOR AI"
              className="rensor-ai-trigger__icon"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* RENSOR AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rensor-ai-panel"
            role="dialog"
            aria-label="RENSOR AI Assistant"
            id="rensor-ai-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="rensor-ai-panel__header">
              <div className="rensor-ai-panel__header-left">
                {messages.length > 0 ? (
                  <button
                    className="rensor-ai-panel__back-btn"
                    onClick={handleResetConversation}
                    aria-label="Back to prompts (New chat)"
                    title="New conversation"
                    type="button"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>NEW</span>
                  </button>
                ) : (
                  <div className="rensor-ai-panel__brand">
                    <img
                      src="/images/logo-mark.png"
                      alt=""
                      className="rensor-ai-panel__brand-icon"
                    />
                    <span className="rensor-ai-panel__title">RENSOR AI</span>
                  </div>
                )}
              </div>

              <div className="rensor-ai-panel__header-right">
                {messages.length > 0 && (
                  <span className="rensor-ai-panel__title-mini">RENSOR AI</span>
                )}
                <button
                  className="rensor-ai-panel__close"
                  onClick={handleClose}
                  aria-label="Close RENSOR AI Assistant"
                  id="rensor-ai-close"
                  type="button"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="rensor-ai-panel__body" ref={bodyRef} data-lenis-prevent>
              {messages.length === 0 ? (
                <div className="rensor-ai-panel__welcome">
                  <span className="rensor-ai-panel__label text-label">STUDIO ASSISTANT</span>
                  <h3 className="rensor-ai-panel__greeting text-h3">
                    WHAT ARE YOU LOOKING TO BUILD?
                  </h3>

                  <div className="rensor-ai-panel__suggestions">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        className="rensor-ai-panel__suggestion"
                        onClick={() => handleSuggestionClick(prompt)}
                        type="button"
                      >
                        <span className="rensor-ai-panel__suggestion-text">{prompt}</span>
                        <span className="rensor-ai-panel__suggestion-arrow">↗</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rensor-ai-panel__messages">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={`rensor-ai-msg-wrap rensor-ai-msg-wrap--${msg.role}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="rensor-ai-avatar" aria-hidden="true">
                          <img src="/images/logo-mark.png" alt="" />
                        </div>
                      )}
                      <div className={`rensor-ai-message rensor-ai-message--${msg.role}`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="rensor-ai-msg-wrap rensor-ai-msg-wrap--assistant">
                      <div className="rensor-ai-avatar" aria-hidden="true">
                        <img src="/images/logo-mark.png" alt="" />
                      </div>
                      <div className="rensor-ai-message rensor-ai-message--assistant rensor-ai-typing">
                        <span className="rensor-ai-dot"></span>
                        <span className="rensor-ai-dot"></span>
                        <span className="rensor-ai-dot"></span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Footer — Single Clean Seamless Bar */}
            <div className="rensor-ai-panel__footer">
              <form
                className="rensor-ai-panel__input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  className="rensor-ai-panel__input"
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  id="rensor-ai-input"
                  aria-label="Ask RENSOR AI a question"
                  autoComplete="off"
                />
                <button
                  className={`rensor-ai-panel__send ${inputValue.trim() ? 'rensor-ai-panel__send--active' : ''}`}
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  aria-label="Send message"
                  id="rensor-ai-send"
                >
                  <span className="arrow">↗</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
