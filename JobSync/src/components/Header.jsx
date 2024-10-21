import React from "react";
import '../css/MyNavbar.css'

export default function Header({ pageTitle }) {
  return (
    <div>
      <header
        className="py-4 fixed-top head"
        style={{ marginTop: "130px", backgroundColor: "#F1F2F4" }}
      >
        <h1 style={{ marginLeft: "20%", fontSize: "16px", textAlign: "left", marginBottom: "0" }}>
          {pageTitle}
        </h1>
      </header>
    </div>
  );
}
