import React from 'react';
import '../App.css';

function Home() {
  return (
    <div className='page'>
      <h2>Hello, my name is</h2>
      <h1>Casey Holden</h1>
      <h2>I'm a CE/CS Student at Northeastern University.</h2>
      <div className='social-links'>
        <a className="social-link" href='https://github.com/holdenc20' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-github'></i>
        </a>
        <a className="social-link" href='https://www.linkedin.com/in/casey-holden/' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-linkedin'></i>
        </a>
        <a className="social-link" href='/path/to/your/resume.pdf' target='_blank' rel='noopener noreferrer'>
          <i className='fas fa-file'></i>
        </a>
      </div>
    </div>
  );
}

export default Home;
