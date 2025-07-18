import {React, useState} from 'react';
import '../styles/Card.css';

const Card = ({ name, address, hours, services, image, onVerMais }) => {

  return (
    <div className="card">
      <h2 className="card-title">{name}</h2>

      <div className="card-info">
        <p><strong>Endereçoo:</strong> {address}</p>
        <p><strong>Telefone:</strong> {hours}</p>

        <div>
          <strong>Atendimentos:</strong>
          {Array.isArray(services) ? (
            <ul className="card-services">
              {/* Este map não influencia em nada no Card??? */}
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

       <button className="card-button" onClick={() => onVerMais({ name, address, hours, services, image })}>
          Mais informações
        </button>
      </div>
    </div>
  );
};

export default Card;
