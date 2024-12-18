import React from "react";
import JobAdSection from "../../components/jobsection";

function Home() {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", 
  };

  const imageStyle = {
    width: "650px", 
    height: "auto",
    marginRight: "-70px",
    marginTop: "-80px", 
  };

  return (
    <div style={containerStyle}>
      <JobAdSection />
      <img
        style={imageStyle}
        src="/src/assets/employer.jpg" 
   
      />
    </div>
  );
}

export default Home;
