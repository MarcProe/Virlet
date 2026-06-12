import { useState, useEffect } from 'react';

export default function Home() {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch('/api/helloworld')
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch(() => setApiMessage('API Error'));
  }, []);

  return (
    <div>
      <h1>HELLO WORLD</h1>
      {apiMessage && <p>{apiMessage}</p>}
    </div>
  );
}
