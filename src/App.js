import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }

    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    if (response.status === 200) {
      setRepositories([...repositories, response.data])
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(value => value.id === id)

      if (repositoryIndex >= 0) {
        const updatedRepository = [...repositories]
        updatedRepository.splice(repositoryIndex, 1)
        setRepositories(updatedRepository)
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((item, index) => {
            return (
              <li key={index}>
                { item.title}
                <button onClick={() => handleRemoveRepository(item.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
