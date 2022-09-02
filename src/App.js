import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    // 1001000/json/

    if(input === ''){
      alert("Por favor digite algum CEP.")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');

    }catch{
      alert("Erro.")
      setInput("");
    }

    
  }

  return (
    <div className="container">
      <h1 className="title"> Informa CEP </h1>

      <div className="containerInput">
        <input type="text" placeholder="Informe seu CEP"
        value={input}
        onChange={(e) => setInput(e.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep} </h2>

          <span>Estado: {cep.localidade} - {cep.uf} </span>
          <span>Bairro: {cep.bairro} </span>
          <span>Complemento: {cep.complemento} </span>
          <span>DDD: {cep.ddd} </span>
        </main>
      )}
    </div>
  );
}

export default App;
