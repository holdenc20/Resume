import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Repo = ({ repo }) => {
  const [readmeContent, setReadmeContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch README content for the repository
  const fetchReadmeContent = async () => {
    try {
      const response = await axios.get(repo.contents_url.replace('{+path}', 'README.md'));
      const content = atob(response.data.content);

      // Check if the content has HTML tags or not
      const isHtml = content.trim().startsWith('<');

      // If content has HTML tags, render as HTML, otherwise render as plain text
      if (isHtml) {
        const absoluteContent = content.replace(/src="([^"]*)"/g, (match, src) => {
          if (src.startsWith('http') || src.startsWith('/')) {
            return match;
          } else {
            return `src="${repo.html_url}/raw/main/${src}"`;
          }
        });

        setReadmeContent(absoluteContent);
      } else {
        // Extract image URLs from the content using a regex pattern
        const imageMatches = content.match(/!\[[^\]]*\]\((https:\/\/user-images\.githubusercontent\.com\/[^)]+)\)/g);
        const extractedImageUrls = imageMatches
          ? imageMatches.map(match => match.match(/\((https:\/\/user-images\.githubusercontent\.com\/[^)]+)\)/)[1])
          : [];

        // Replace relative image URLs with absolute URLs
        const absoluteContent = content.replace(/!\[([^\]]*)\]\((https:\/\/user-images\.githubusercontent\.com\/[^)]+)\)/g, (match, altText, src) => {
          return `![${altText}](${src})`;
        });

        setReadmeContent(absoluteContent);
        setImageUrls(extractedImageUrls);
      }
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
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} />
        ))}
        {readmeContent.startsWith('<') ? (
          <div dangerouslySetInnerHTML={{ __html: readmeContent }} />
        ) : (
          <pre>{readmeContent}</pre>
        )}
      </div>
    </div>
  );
};

export default Repo;
