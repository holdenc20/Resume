import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

function Skills () {
    const githubUser = "holdenc20";
  const [githubData, setGithubData] = useState([]);
  const [repos, setRepos] = useState([]);

  //fetches github user data
  useEffect(() => {
    //fetches user data from github api
    const fetchData = async () => {
        try {
        const response = await fetch(`https://api.github.com/users/${githubUser}`);
        if(!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setGithubData(data);
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
    }

    fetchData();
  }, [])

  //fetching repo data after downloading the github user data
  useEffect(() => {
    if (githubData.login) {
        //fetches all repo data for user data
        const fetchAllRepos = async () => {
            let page = 1;
            let allRepos = [];

            while (true) {
              try {
                  const response = await fetch(`${githubData.repos_url}?per_page=100&page=${page}`);
              
                  if(!response.ok) {
                  throw new Error("Network response was not ok");
                  }

                  const data = await response.json();

                  if (data.length === 0) {
                    break;
                  }
                  
                  allRepos = allRepos.concat(data);
                  page++;
              } catch (error) {
                  console.error('Error fetching repos:', error);
              }
            }
            console.log(allRepos);
            setRepos(allRepos);
        }

        fetchAllRepos();
    }
  }, [githubData])

  //function to get the languages data
  const getLanguagesData = async () => {
    const languages = {};
  
    const fetchLanguageData = async (repo) => {
      const languagesUrl = repo.languages_url;
      return {};
      if(!languagesUrl) {
        return {};
      }
      try {
        const response = await fetch(languagesUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching languages:', error);
        return {};
      }
    };
  
    // Use Promise.all to fetch language data for all repos
    //const languageDataPromises = repos.map(repo => fetchLanguageData(repo));
    //const languageDataArray = await Promise.all(languageDataPromises);
  
    // Aggregate the language data
    //languageDataArray.forEach(data => {
    //  Object.keys(data).forEach(key => {
    //    if (languages[key]) {
    //      languages[key] += data[key];
     //   } else {
    //      languages[key] = data[key];
    //    }
    //  });
   // });
    return{};
    return {
      labels: Object.keys(languages),
      datasets: [
        {
          data: Object.values(languages),
          backgroundColor: [
            '#F1E05A',
            '#DE4B25',
            '#3572A5',
            '#555555',
            '#6e5494',
            '#89e051',
            '#f34b7d',
          ],
        },
      ],
    };
  };

    return (
        <div className="Skills">
        <h1>Skills</h1>

        {repos.length > 0 && (
            <div style={{ width: '400px', margin: 'auto' }}>
                <Doughnut key={repos.length} data={getLanguagesData()} />
            </div>
        )}
        </div>
    )
}

export default Skills;