import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Repo = ({ repo }) => {
  const [readmeContent, setReadmeContent] = useState('');

  // Fetch README content for the repository
  const fetchReadmeContent = async () => {
    try {
      const response = await axios.get(repo.contents_url.replace('{+path}', 'README.md'));
      const content = atob(response.data.content); // Decode Base64 content
      setReadmeContent(content);
    } catch (error) {
      console.error('Error fetching README content:', error);
    }
  };

  useEffect(() => {
    fetchReadmeContent();
  }, [repo]);

  return (
    <div className='repo-content'>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <a href={repo.html_url}>View on GitHub</a>
      <div>
        <h4>README Content:</h4>
        <pre>{readmeContent}</pre>
      </div>
    </div>
  );
};

export default Repo;
