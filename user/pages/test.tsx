import React, { useEffect } from 'react';

export default function Test() {

  useEffect(() => {
    fetch(`${API_URL}/api/web_data/addViewWebsite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Total Visitors</h1>
    </div>
  );
}
