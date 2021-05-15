import React, {useState, useEffect} from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
  } 

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositorio ${randomNumber(1,200)}`,
      url: "https://github.com/Rocketseat/umbriel",
      techs:[
        "Node",
        "Express",
        "TypeScript"
        ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepos = [...repositories]
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if (repositoryIndex >= 0) {
      newRepos.splice(repositoryIndex,1)
      setRepositories(newRepos);
    }
    /* outro repositorio poderia ser incluido enquanto esse foi apagado
    await api.get('repositories').then(response => {
      setRepositories(response.data);
    })
    */
   }

  return (
    <div>
      Repositórios:
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
