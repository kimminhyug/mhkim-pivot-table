import React from 'react';

export const Cell = ({ text, style }): React.ReactElement => {
  return (
    <>
      <div className="pivot-list-cell" style={{ ...style }}>
        <span>{text}</span>
      </div>
    </>
  );
};
