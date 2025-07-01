import React from "react"
import Card from "../components/Card"
import TopBar from "../components/TopBar" 
import "../styles/Home.css"
import "../styles/TopBar.css" 

function Home() {
  return (
    <div>
      <TopBar />

      <div className="card-grid">
        <Card
          name={"UPA Cidade Satélite"}
          address={"Avenida dos Xavantes, 1228 - Pitimbú, Natal - RN"}
          hours={"24h"}
          services={[
            'Consulta médica com clínico geral',
            'Exames laboratoriais',
            'Atendimento de urgência'
          ]}
        />
      </div>
    </div>
  )
}

export default Home
