import { useState } from "react";
import { FiSearch } from "react-icons/fi"
import "./style.css"
import api from "./services/api";

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});


  async function search(){
    if(input === ''){
      alert("preencha algum cep")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert("Ops! Verifique se o CEP foi digitado corretamente.")
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

    <div className="containerInput">

      <input 
      type="text" 
      placeholder="Digite o seu cep..."
      value={input}
      onChange={(x) => setInput(x.target.value)}
      />

      <button className="buttonSearch" onClick={search}>
        <FiSearch size={25} color="#fff"/>
      </button>
    </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    


    </div>
  );
}

export default App;
