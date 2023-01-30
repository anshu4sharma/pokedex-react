const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container-md">
        <a className="navbar-brand" href="/">
          Pokédex
        </a>
        <div className="vr"></div>
        <div className="container-fluid">
          <span className="navbar-text">
            Search for any Pokémon that exists on the planet
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
