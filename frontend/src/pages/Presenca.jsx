import "../styles/Presenca.css";

function Presenca() {
    return (
        <div className="presenca-container">
            <div className="presenca-card">
                <h1 className="presenca-titulo">Marcar Presença do Médico</h1>
                <form className="presenca-form">
                    <div className="presenca-campo">
                        <label htmlFor="cpf">CPF do Médico:</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
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
