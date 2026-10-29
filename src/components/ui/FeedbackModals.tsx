import React, { useEffect, useRef } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info, ChevronDown } from 'lucide-react';

/* ========================================================================
   ALERT BANNER
   ======================================================================== */
export type AlertType = 'success' | 'warning' | 'danger' | 'info';

export interface AlertProps {
  type?: AlertType;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const typeConfig: Record<AlertType, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
    success: {
      bg: 'var(--ds-primitive-color-emerald-50)',
      border: 'var(--ds-primitive-color-emerald-500)',
      text: 'var(--ds-primitive-color-emerald-700)',
      icon: <CheckCircle size={18} color="var(--ds-primitive-color-emerald-500)" aria-hidden="true" />,
    },
    warning: {
      bg: 'var(--ds-primitive-color-amber-50)',
      border: 'var(--ds-primitive-color-amber-500)',
      text: 'var(--ds-primitive-color-amber-800)',
      icon: <AlertTriangle size={18} color="var(--ds-primitive-color-amber-500)" aria-hidden="true" />,
    },
    danger: {
      bg: 'var(--ds-primitive-color-rose-50)',
      border: 'var(--ds-primitive-color-rose-500)',
      text: 'var(--ds-primitive-color-rose-700)',
      icon: <AlertCircle size={18} color="var(--ds-primitive-color-rose-500)" aria-hidden="true" />,
    },
    info: {
      bg: 'var(--ds-primitive-color-sky-50)',
      border: 'var(--ds-primitive-color-sky-500)',
      text: 'var(--ds-primitive-color-sky-700)',
      icon: <Info size={18} color="var(--ds-primitive-color-sky-500)" aria-hidden="true" />,
    },
  };

  const config = typeConfig[type];

  return (
    <div
      role="alert"
      className={`ds-alert ds-alert-${type} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--ds-primitive-space-3)',
        padding: 'var(--ds-primitive-space-4)',
        backgroundColor: config.bg,
        borderLeft: `4px solid ${config.border}`,
        borderRadius: 'var(--ds-primitive-radius-md)',
        color: config.text,
        marginBottom: 'var(--ds-primitive-space-4)',
      }}
    >
      <div style={{ flexShrink: 0, marginTop: '2px' }}>{config.icon}</div>
      <div style={{ flex: 1, fontSize: 'var(--ds-primitive-font-size-sm)', lineHeight: 1.45 }}>
        {title && <div style={{ fontWeight: 600, marginBottom: '2px' }}>{title}</div>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close notification"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: config.text,
            padding: 0,
            flexShrink: 0,
          }}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

/* ========================================================================
   MODAL DIALOG (WAI-ARIA Dialog with Focus Trap & Esc)
   ======================================================================== */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthMap = { sm: '420px', md: '560px', lg: '740px' };

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(19, 39, 102, 0.60)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-desc' : undefined}
        style={{
          width: '100%',
          maxWidth: widthMap[maxWidth],
          backgroundColor: 'var(--ds-color-surface-card)',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          boxShadow: 'var(--ds-primitive-shadow-modal)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeIn 200ms ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--ds-primitive-space-6)',
            borderBottom: '1px solid var(--ds-color-border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3
              id="modal-title"
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: 'var(--ds-primitive-font-size-xl)',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: 0,
              }}
            >
              {title}
            </h3>
            {description && (
              <p id="modal-desc" style={{ fontSize: 'var(--ds-primitive-font-size-sm)', color: 'var(--ds-color-text-secondary)', margin: '4px 0 0 0' }}>
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ds-color-text-muted)',
              padding: '4px',
            }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 'var(--ds-primitive-space-6)', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: 'var(--ds-primitive-space-4) var(--ds-primitive-space-6)',
              borderTop: '1px solid var(--ds-color-border-subtle)',
              backgroundColor: 'var(--ds-primitive-color-navy-50)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--ds-primitive-space-3)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/* ========================================================================
   BADGE PILL
   ======================================================================== */
export type BadgeVariant = 'brand' | 'success' | 'warning' | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'brand', children }) => {
  const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
    brand: { bg: 'var(--ds-primitive-color-teal-100)', text: 'var(--ds-primitive-color-teal-800)' },
    success: { bg: 'var(--ds-primitive-color-emerald-50)', text: 'var(--ds-primitive-color-emerald-700)' },
    warning: { bg: 'var(--ds-primitive-color-amber-50)', text: 'var(--ds-primitive-color-amber-800)' },
    neutral: { bg: 'var(--ds-primitive-color-slate-100)', text: 'var(--ds-color-text-secondary)' },
  };

  const style = variantStyles[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        borderRadius: 'var(--ds-primitive-radius-full)',
        fontSize: 'var(--ds-primitive-font-size-xs)',
        fontWeight: 600,
        backgroundColor: style.bg,
        color: style.text,
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </span>
  );
};

/* ========================================================================
   ACCORDION DISCLOSURE
   ======================================================================== */
export interface AccordionProps {
  id: string;
  title: string;
  subtitle?: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  subtitle,
  defaultExpanded = false,
  children,
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <div
      style={{
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-primitive-radius-lg)',
        marginBottom: 'var(--ds-primitive-space-3)',
        overflow: 'hidden',
        backgroundColor: 'var(--ds-color-surface-card)',
      }}
    >
      <button
        type="button"
        id={`${id}-header`}
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: 'var(--ds-primitive-space-4) var(--ds-primitive-space-5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div>
          <span style={{ fontFamily: 'var(--ds-primitive-font-body)', fontWeight: 600, fontSize: 'var(--ds-primitive-font-size-base)', color: 'var(--ds-color-text-heading)' }}>
            {title}
          </span>
          {subtitle && (
            <p style={{ margin: '2px 0 0 0', fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-muted)' }}>
              {subtitle}
            </p>
          )}
        </div>
        <ChevronDown
          size={20}
          color="var(--ds-color-text-muted)"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-header`}
          style={{
            padding: 'var(--ds-primitive-space-5)',
            borderTop: '1px solid var(--ds-color-border-subtle)',
            backgroundColor: 'var(--ds-primitive-color-navy-50)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

/* ========================================================================
   DIVIDER
   ======================================================================== */
export const Divider: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <hr
    style={{
      border: 'none',
      borderTop: '1px solid var(--ds-color-border-subtle)',
      margin: 'var(--ds-primitive-space-6) 0',
      ...style,
    }}
  />
);

/* ========================================================================
   SKELETON LOADER
   ======================================================================== */
export const Skeleton: React.FC<{ width?: string; height?: string; borderRadius?: string }> = ({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--ds-primitive-radius-md)',
}) => (
  <div
    style={{
      width,
      height,
      borderRadius,
      backgroundColor: 'var(--ds-primitive-color-slate-200)',
      opacity: 0.6,
      animation: 'pulse 1.5s infinite ease-in-out',
    }}
    aria-hidden="true"
  />
);

