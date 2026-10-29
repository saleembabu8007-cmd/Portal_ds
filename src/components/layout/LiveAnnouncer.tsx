import React from 'react';

export interface LiveAnnouncerProps {
  message?: string;
  assertive?: boolean;
}

export const LiveAnnouncer: React.FC<LiveAnnouncerProps> = ({
  message = '',
  assertive = false,
}) => {
  return (
    <div
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {message}
    </div>
  );
};

