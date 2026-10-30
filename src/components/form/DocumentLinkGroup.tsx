import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

export interface DocumentLinkItem {
  id: string;
  title: string;
  category: 'PDS' | 'POLICY_WORDING' | 'SCHEDULE' | 'DISCLOSURE';
  fileFormat?: string;
  fileSize?: string;
  url?: string;
  onView?: () => void;
}

export interface DocumentLinkGroupProps {
  documents?: DocumentLinkItem[];
  title?: string;
  direction?: 'vertical' | 'grid';
  className?: string;
}

export const DEFAULT_DOCTORSHIELD_DOCUMENTS: DocumentLinkItem[] = [
  {
    id: 'doc-pds',
    title: 'Product Disclosure Sheet (PDS)',
    category: 'PDS',
    fileFormat: 'PDF',
    fileSize: '320 KB',
  },
  {
    id: 'doc-pw',
    title: 'Chubb Individual Indemnity Policy Wording',
    category: 'POLICY_WORDING',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
  },
  {
    id: 'doc-pidm',
    title: 'PIDM Insurance & Compensation Scheme Notice',
    category: 'DISCLOSURE',
    fileFormat: 'PDF',
    fileSize: '180 KB',
  },
  {
    id: 'doc-schedule',
    title: 'Table of Benefits & Specialization Categories',
    category: 'SCHEDULE',
    fileFormat: 'PDF',
    fileSize: '410 KB',
  },
];

/**
 * DoctorShield Document-Link Group Molecule
 * Standardized presentation of regulatory insurance disclosure documents.
 */
export const DocumentLinkGroup: React.FC<DocumentLinkGroupProps> = ({
  documents = DEFAULT_DOCTORSHIELD_DOCUMENTS,
  title,
  direction = 'vertical',
  className = '',
}) => {
  return (
    <div className={`ds-document-links ${className}`} style={{ marginBottom: 'var(--ds-primitive-space-4)' }}>
      {title && (
        <h4
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--ds-color-text-tertiary)',
            margin: '0 0 var(--ds-primitive-space-3) 0',
          }}
        >
          {title}
        </h4>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: direction === 'grid' ? 'repeat(auto-fit, minmax(240px, 1fr))' : '1fr',
          gap: 'var(--ds-primitive-space-2)',
        }}
      >
        {documents.map((doc) => (
          <div
            key={doc.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: 'var(--ds-color-surface-base)',
              border: '1px solid var(--ds-color-border-subtle)',
              borderRadius: 'var(--ds-comp-panel-radius)',
              transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--ds-color-surface-subtle)',
                  color: 'var(--ds-color-brand-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FileText size={16} />
              </div>

              <div style={{ minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: 'var(--ds-primitive-font-body)',
                    fontSize: 'var(--ds-primitive-font-size-xs)',
                    fontWeight: 'var(--ds-primitive-font-weight-medium)',
                    color: 'var(--ds-color-text-primary)',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {doc.title}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--ds-color-text-tertiary)',
                  }}
                >
                  {doc.fileFormat || 'PDF'} {doc.fileSize ? `· ${doc.fileSize}` : ''}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={doc.onView}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ds-primitive-color-teal-800)',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 6px',
                borderRadius: '4px',
                flexShrink: 0,
              }}
              aria-label={`View ${doc.title}`}
            >
              <span>View</span>
              <ExternalLink size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

