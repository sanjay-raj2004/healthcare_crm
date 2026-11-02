function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <h1>Healthcare CRM</h1>
        <nav className="nav">
          <a href="#summary">New Patient</a>
          <a href="#records">Patient Records</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;