import React from "react";
import "../css/MyNavbar.css";

export default function Header({ pageTitle, breadcrumbs }) {
  return (
    <div>
      <header
        className="py-4 fixed-top head d-flex align-items-center"
        style={{ marginTop: "130px", backgroundColor: "#F1F2F4" }}
      >
        <h1
          style={{
            marginLeft: "20%",
            fontSize: "16px",
            textAlign: "left",
            marginBottom: "0",
            flexGrow: 1,
          }}
        >
          {pageTitle}
        </h1>
        <nav style={{ marginRight: "20%", fontSize: "14px" }}>
          <ol className="breadcrumb" style={{ marginBottom: "0", padding: "0", backgroundColor: "transparent" }}>
            {breadcrumbs.map((crumb, index) => (
              <li
                key={index}
                className={`breadcrumb-item ${
                  index === breadcrumbs.length - 1 ? "active" : ""
                }`}
                style={{ color: index === breadcrumbs.length - 1 ? "#6c757d" : "#007bff" }}
              >
                {index === breadcrumbs.length - 1 ? (
                  crumb.label
                ) : (
                  <a href={crumb.path} style={{color: '#4ea4ff'}}>{crumb.label}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </header>
    </div>
  );
}
