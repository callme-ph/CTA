export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <h1 className="site-name">UBS+INFORMAÇÃO</h1>
        <div className="button-group">
          <a href={`${import.meta.env.VITE_API_url}/admin`} className="login-button">Área Admin</a>
          <a href="/login" className="register-button">Presença Medico</a>
    </div>
  </div>
</div>

  );
} 