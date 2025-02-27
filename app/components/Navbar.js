// components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky-navbar">
      <div className="container flex justify-center items-center">
        {/* Logo Placeholder */}
        <div className="navbar-logo">
          <Link href="/">
            <img
              src="./assets/logo_nella.png" // Placeholder for the logo
              alt="Logo"
              className="logo-image"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
