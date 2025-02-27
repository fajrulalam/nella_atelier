import "../globals.css"; // Ensure this line is at the top of your layout.js or layout.tsx

import Navbar from "./Navbar";
import Footer from "./Footer";

export const metadata = {
  title: "Your Site Title",
  description: "Your Site Description",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
};

export default Layout;
