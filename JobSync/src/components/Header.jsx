import React from "react";

export default function Header({ pageTitle }) {
  return (
    <div>
      <header
        className="py-4 fixed-top"
        style={{ marginTop: "130px", backgroundColor: "#F1F2F4" }}
      >
        <h1 style={{ marginLeft: "20%", fontSize: "20px", textAlign: "left" }}>
          {pageTitle}
        </h1>
      </header>
    </div>
  );
}
