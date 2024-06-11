export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-items">

        <div className="nav-item">
          <div className="nav-item__links">
            <h1 className="nav-item__links-one">myFlix</h1>
            <div className="nav-item__links-two">
              <a href="/" className="nav-link">Home</a>
              <a href="/profile" className="nav-link">Profile</a>
            </div>
          </div>
        </div>

        <div className="nav-item">
          <a href="/login" className="nav-link login">Login</a>
        </div>

      </div>
    </div>
  );
};