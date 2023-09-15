// pages/index.tsx

import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleCheckSEO = async () => {
    try {
      const response = await axios.post(
        'https://api.dataforseo.com/v3/on_page/task_post',
        {
          data: [
            {
              target: url,
              options: ['page_info', 'load_resources', 'load_js', 'render'],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.DATAFORSEO_API_KEY}`,
          },
        }
      );

      const taskId = response.data[0]?.task_id;
      if (taskId) {
        const checkStatus = await axios.get(
          `https://api.dataforseo.com/v3/on_page/task_get/${taskId}`,
          {
            headers: {
              'Authorization': `Basic ${process.env.DATAFORSEO_API_KEY}`,
            },
          }
        );
        setResult(JSON.stringify(checkStatus.data, null, 2));
      }
    } catch (error) {
      console.error('Error checking SEO:', error);
    }
  };

  return (
    <div>
      <h1>SEO Checker Widget</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleCheckSEO}>Check SEO</button>
      {result && <pre>{result}</pre>}
    </div>
  );
};

export default Home;
