import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const JobSection = () => {
  return (
    <div className="container-fluid p-0 mt-2">
      {/* Greeting Section inside a container with border and background */}
      <div
        className="container-fluid p-4 mb-4"
        style={{
          backgroundColor: "#f5f9ff", 
          border: "1px solid #e0e7ef",
          borderRadius: "8px",
        }}
      >
        <div className="mb-4">
          <h2 className="text-start">Hi Christian</h2>
          <p className="text-start">
            You are in the right place to find your next hire. Get started by
            creating your first job ad.
          </p>
          {/* Aligning the button to the left */}
          <div className="text-start">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#007bff", border: "none" }}
            >
              Create a job ad
            </button>
          </div>
        </div>
      </div>

      {/* Boost Hiring Section */}
      <div
        className="container-fluid p-4 rounded"
        style={{
          backgroundColor: "#f5f9ff",
          border: "1px solid #e0e7ef",
        }}
      >
        <div className="row align-items-center">
          {/* Text Content - takes up 8/12 of the space */}
          <div className="col-md-8 text-start">
            <h5 className="fw-bold">Boost your hiring with matching candidates</h5>
            <p>
              When you post a job ad, we'll match you with relevant candidates
              from our database.
            </p>
            <button className="btn btn-outline-dark">Post a job ad</button>
          </div>

          {/* Image - takes up 4/12 of the space */}
          <div className="col-md-4">
            <img
              src="/src/assets/pic.png"
              alt="Candidates"
              className="img-fluid"
              style={{ maxWidth: "150px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
