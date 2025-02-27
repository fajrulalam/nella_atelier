import "../globals.css"; // Ensure this line is at the top of your layout.js or layout.tsx

import Navbar from "./components/Navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Your Site Title",
  description: "Your Site Description",
};

const Layout = ({ children }: { children: ReactNode }) => {
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
