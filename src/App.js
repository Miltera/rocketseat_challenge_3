import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";
 
function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [techs, setTechs] = useState('')
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const techsArray = techs.split(',');
    
    api.post('/repositories', {
      title,
      url,
      techs: techsArray
    }).then(response => {
      setRepositories([...repositories, response.data])
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repos = repositories.filter(repo => repo.id !== id);
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
        
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <hr />
      
      <div className="api-data-container">
        <input 
          type="text" 
          placeholder="Nome do Repositório"
          value={title}
          onChange={e => setTitle(e.target.value)} 
        />
       
        <input 
          type="text" 
          placeholder="URL do Repositório no GitHub" 
          value={url}
          onChange={e => setURL(e.target.value)} 
        />

        <input 
          type="text" 
          placeholder="Tecnologias Utilizadas (separado por vírgula)" 
          value={techs}
          onChange={e => setTechs(e.target.value)}   
        />
      </div>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
