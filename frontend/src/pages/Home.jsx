import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import TopBar from "../components/TopBar"; 
import "../styles/Home.css";
import "../styles/TopBar.css";
import axios from "axios";
import "../styles/Modal.css"

function Home() {
  const API_URL = import.meta.env.VITE_API_url+'/api/ubs/'; // || 'http://127.0.0.1:8000/api/ubs/';

  const [ubsList, setUbsList] = useState([]);
  const [filtro, setFiltro] = useState("");

  const ubsFiltradas = ubsList.filter((ubs) => {
    const texto = filtro.toLowerCase();
    return (
      ubs.nome?.toLowerCase().includes(texto) ||
      ubs.endereco?.rua?.toLowerCase().includes(texto) ||
      ubs.medicos?.some(m => m.especialidade?.toLowerCase().includes(texto))
    );
  });

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ titulo: "", detalhes: "" });

  const handleVerMais = (dados) => {
    setModalData(dados);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setModalData({ titulo: "", detalhes: "" });
  };

  return (
    <div>
      <TopBar />
      
      <input
        type="text"
        placeholder="Pesquisar por nome, endereço ou serviço..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="search-bar"
      />

      <div className="card-grid">
        {ubsFiltradas.map((ubs, index) => (
          <Card
            onVerMais={() => handleVerMais(ubs)}
            key={ubs.id || index}
            name={ubs.nome}
            address={`${ubs.endereco?.rua}, ${ubs.endereco?.numero} - ${ubs.endereco?.bairro}, ${ubs.endereco?.cidade}/${ubs.endereco?.estado}`}
            hours={ubs.telefone}
            services={Array.isArray(ubs.medicos)
              ? ubs.medicos.map(m => ` ${m.especialidade}`).join()
              : "Nenhum médico disponível"}
            
          />
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-titulo">{modalData.nome}</h2>

            <div className="modal-scroll-content">
              <div className="modal-box">
                <h4>Endereço</h4>
                <p>
                  {modalData.endereco?.rua}, {modalData.endereco?.numero} –{" "}
                  {modalData.endereco?.bairro}, {modalData.endereco?.cidade}/
                  {modalData.endereco?.estado}
                </p>
              </div>

              <div className="modal-box">
                <h4>Telefone para contato</h4>
                <p>{modalData.telefone || "Não informado"}</p>
              </div>

              <div className="modal-box">
                <h4>Médicos e Especialidades</h4>
                <div className="medico-lista">
                  {Array.isArray(modalData.medicos) ? (
                    modalData.medicos.map((m, i) => (
                      <div key={i} className="medico-box">
                        <div>
                          <strong>{m.nome}</strong> – {m.especialidade}
                        </div>
                        <div className="status">
                          <span
                            className={`status-indicador ${
                              m.status === "presente" ? "verde" : "vermelho"
                            }`}
                          ></span>
                          <span>{m.status === "presente" ? "Presente" : "Ausente"}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Nenhum médico disponível</p>
                  )}
                </div>
              </div>
            </div>

        <footer style={{ textAlign: "right" }}>
        <button onClick={handleClose}>Fechar</button>
      </footer>
    </div>
  </div>
)}

    </div>
  );
}

export default Home;