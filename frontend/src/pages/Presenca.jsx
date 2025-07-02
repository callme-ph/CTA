import React, { useState } from "react";
import axios from "axios";
import "../styles/Presenca.css";

function Presenca() {
  const [cpf, setCpf] = useState("");

  const API_URL = import.meta.env.VITE_API_url + '/api/presenca/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cpf) {
      alert("Por favor, insira o CPF.");
      return;
    }

    try {
      // Envia o CPF direto no corpo da requisição, não dentro de objeto
      const response = await axios.post(API_URL, cpf, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert(response.data.mensagem);
      setCpf("");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.erro || "Erro desconhecido ao registrar presença.");
      } else {
        alert("Erro de conexão com o servidor.");
      }
    }
  };
  return (
    <div className="presenca-container">
      <div className="presenca-card">
        <h1 className="presenca-titulo">Marcar Presença do Médico</h1>
        <form className="presenca-form" onSubmit={handleSubmit}>
          <div className="presenca-campo">
            <label htmlFor="cpf">CPF do Médico:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite o CPF"
              maxLength={11}
            />
          </div>
          <button type="submit">Marcar Presença</button>
        </form>
      </div>
    </div>
  );
}

export default Presenca;
