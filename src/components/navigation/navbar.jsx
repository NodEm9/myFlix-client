export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-items">

        <div className="nav-item">
          <div className="nav-item__links">
            <h1 className="nav-item__links-one">
              <a href="/" className="nav-item__link">myFlix</a>
            </h1>
            <div className="nav-item__links-two">
              <a href="/" className="nav-item__link">Home</a>
              <a href="/profile" className="nav-item__link">Profile</a>
            </div>
          </div>
        </div>

        <div className="nav-item">
          <a href="/login" className="nav-item__link login">Login</a>
        </div>

      </div>
    </div>
  );
};