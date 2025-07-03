import React, { useState } from "react";
import axios from "axios";
import "../styles/Presenca.css";

function Presenca() {
  const [cpf, setCpf] = useState("");
  const [ubsList, setUbsList] = useState([]);
  const [ubsSelecionada, setUbsSelecionada] = useState("");
  const [etapa, setEtapa] = useState(1); // 1 = buscar, 2 = marcar

  const API_BASE = import.meta.env.VITE_API_url;

  const buscarVinculos = async (e) => {
    e.preventDefault();

    if (!cpf) {
      alert("Por favor, insira o CPF.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/buscar-vinculo/`, {
        cpf: cpf,
      });

      const ubs = response.data.ubs_vinculadas;
      if (ubs.length === 0) {
        alert("Nenhuma UBS vinculada.");
        return;
      }

      setUbsList(ubs);
      setEtapa(2); // vai para seleção
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.erro || "Erro ao buscar vínculos.");
    }
  };

  const marcarPresenca = async () => {
    if (!ubsSelecionada) {
      alert("Selecione uma UBS.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/marcar-presenca/`, {
        cpf: cpf,
        ubs_nome: ubsSelecionada,
      });

      alert(response.data.mensagem);
      // limpa tudo
      setCpf("");
      setUbsSelecionada("");
      setUbsList([]);
      setEtapa(1);
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao marcar presença.");
    }
  };

  return (
    <div className="presenca-container">
      <div className="presenca-card">
        <h1 className="presenca-titulo">Marcar Presença do Médico</h1>

        {etapa === 1 && (
          <form className="presenca-form" onSubmit={buscarVinculos}>
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
            <button type="submit">Buscar UBSs vinculadas</button>
          </form>
        )}

        {etapa === 2 && (
          <>
            <div className="presenca-campo">
              <label>Selecione a UBS:</label>
              <select
                value={ubsSelecionada}
                onChange={(e) => setUbsSelecionada(e.target.value)}
              >
                <option value="">Selecione uma UBS</option>
                {ubsList.map((ubs, index) => (
                  <option key={index} value={ubs.nome}>
                    {ubs.nome} - {ubs.endereco}
                  </option>
                ))}
              </select>
            </div>
            <div className="presenca-buttons">
              <button onClick={marcarPresenca}>Alterar status de Presença</button>
              <button onClick={() => setEtapa(1)}>Voltar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Presenca;
