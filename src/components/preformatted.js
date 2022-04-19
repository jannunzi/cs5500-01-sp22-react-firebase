import React from 'react';

const Preformatted = ({data}) => {
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default Preformatted;