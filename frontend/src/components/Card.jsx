import React from 'react';
import '../styles/Card.css';

const Card = ({ name, address, hours, services, image }) => {
  return (
    <div className="card">
      <h2 className="card-title">{name}</h2>

      <div className="card-info">
        <p><strong>Endereço:</strong> {address}</p>
        <p><strong>Telefone:</strong> {hours}</p>

        <div>
          <strong>Serviços:</strong>
          {Array.isArray(services) ? (
            <ul className="card-services">
              {services.map((service, index) => (
                <li key={index}>
                  {service.nome} ({service.especialidade}) - {service.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>{services || "Nenhum serviço disponível"}</p>
          )}
        </div>

        <button className="card-button">
          Mais informações
        </button>
      </div>
    </div>
  );
};

export default Card;
