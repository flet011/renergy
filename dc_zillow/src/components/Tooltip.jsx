import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { getDefinition } from '../data/glossary';
import { HelpCircle } from 'lucide-react';

export function Tip({ k, children }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const def = getDefinition(k);

  // Recalculate position whenever the tooltip becomes visible
  useLayoutEffect(() => {
    if (!show || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tipEl = tooltipRef.current;
    const tipRect = tipEl.getBoundingClientRect();
    const tipW = tipRect.width;
    const tipH = tipRect.height;

    // Horizontal: center on trigger, clamp to viewport
    let left = triggerRect.left + triggerRect.width / 2 - tipW / 2;
    if (left < 8) left = 8;
    if (left + tipW > window.innerWidth - 8) left = window.innerWidth - tipW - 8;

    // Vertical: ALWAYS above the trigger
    let top = triggerRect.top - tipH - 8;

    // Only fall below if literally no room above at all (< 4px from top of viewport)
    if (top < 4) {
      top = triggerRect.bottom + 8;
    }

    setPos({ top, left });
  }, [show]);

  if (!def) return children || null;

  return (
    <span
      ref={triggerRef}
      className="tip-wrap"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={() => setShow(s => !s)}
    >
      {children}
      <span className="tip-icon-box">
        <HelpCircle size={10} />
      </span>
      {show && (
        <div
          ref={tooltipRef}
          className="tip-popup"
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="tip-term">{def.term}</div>
          <div className="tip-def">{def.definition}</div>
        </div>
      )}
    </span>
  );
}

export function TipLabel({ k, children }) {
  return (
    <Tip k={k}>
      <span className="tip-label-text">{children}</span>
    </Tip>
  );
}
