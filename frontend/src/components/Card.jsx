import React from 'react';
import '../styles/Card.css';

const Card = ({ name, address, hours, services, image }) => {
  return (
    <div className="card">
      <h2 className="card-title">{name}</h2>

      <div className="card-info">
        <p><strong>Endereço:</strong> {address}</p>
        <p><strong>Horário de Funcionamento:</strong> {hours}</p>
        <div>
          <strong>Serviços:</strong>
          <ul className="card-services">
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>

          <button className="card-button">
            Mais informações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
