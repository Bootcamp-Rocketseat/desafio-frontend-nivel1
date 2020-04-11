import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    loadRepositories();
  }, [])

  async function loadRepositories() {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": "Desafio node.js 5",
      "url": "http://github.com/...",
      "techs": [
        "Nodejs",
        "JS"
      ]
    })

    if (response.status === 200) {
      loadRepositories()
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    if (response.status === 204) {
      loadRepositories()
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
