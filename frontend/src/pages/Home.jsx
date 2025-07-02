import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import TopBar from "../components/TopBar"; 
import "../styles/Home.css";
import "../styles/TopBar.css";
import axios from "axios";

function Home() {
  const API_URL = import.meta.env.VITE_API_url+'/api/ubs/'; // || 'http://127.0.0.1:8000/api/ubs/';

  const [ubsList, setUbsList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, { 
          signal: controller.signal 
        });

        console.log("Dados recebidos da API:", response.data);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setUbsList(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Requisição cancelada: limpeza do useEffect.");
        } else {
          console.error("Erro ao buscar dados da API:", error);
        }
      }
    };

    fetchData();

    // Função de limpeza que será chamada na desmontagem
    return () => {
      controller.abort();
    };
  }, [API_URL]); // Adicionado API_URL aqui caso ela possa mudar

  return (
    <div>
      <TopBar />
      <div className="card-grid">
        {ubsList.map((ubs, index) => (
          <Card
            key={ubs.id || index}
            name={ubs.nome}
            address={ubs.endereco}
            hours={ubs.telefone}
            services={ubs.medicos}
          />
        ))}
        {/* ... seu card de exemplo ... */}
      </div>
    </div>
  );
}

export default Home;