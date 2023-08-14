import React, { useEffect, useState } from 'react';
import Repo from '../components/Repo';
import Repos from '../components/Repos';
import "../styles/Repos.css";

const Projects = () => {
  const githubUser = "holdenc20";
  const [githubData, setGithubData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);


  //fetches user data from github api
  const fetchData = () => {
    return fetch(`https://api.github.com/users/${githubUser}`)
      .then((response) => response.json())
      .then((data) => setGithubData(data));
  }

  useEffect(() => {
    fetchData();
  }, [])

  //fetches all repo data for user data
  const fetchAllRepos = async () => {
    let page = 1;
    let allRepos = [];

    while (true) {
      const response = await fetch(`${githubData.repos_url}?per_page=100&page=${page}`);
      const data = await response.json();

      if (data.length === 0) {
        break;
      }

      allRepos = allRepos.concat(data);
      page++;
    }

    setRepos(allRepos);
  }

  useEffect(() => {
    if (githubData.login) {
      fetchAllRepos();
    }
  }, [githubData])

  //filters out all the random repos
  const filtered_repos = repos
    .filter((repo) => repo.stargazers_count > 0)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
  };

  return (
    <div>
      <h2>My Projects</h2>
      <Repos>
        {filtered_repos.map((repo) => (
          <div
            key={repo.id}
            className={`repo-tab ${selectedRepo === repo ? 'active' : ''}`}
            onClick={() => handleRepoSelect(repo)}
          >
            {repo.name}
          </div>
        ))}
      </Repos>
      {selectedRepo && <Repo repo={selectedRepo} />}
    </div>
  );
};

export default Projects;
