import React from 'react';
import { FaPaintBrush, FaCode, FaBullhorn, FaVideo, FaMusic, FaChartLine, FaHeartbeat, FaDatabase } from 'react-icons/fa';

const categories = [
  { icon: <FaPaintBrush />, title: "Graphics & Design", positions: 357 },
  { icon: <FaCode />, title: "Code & Programming", positions: 357 },
  { icon: <FaBullhorn />, title: "Digital Marketing", positions: 357 },
  { icon: <FaVideo />, title: "Video & Animation", positions: 357 },
  { icon: <FaMusic />, title: "Music & Audio", positions: 357 },
  { icon: <FaChartLine />, title: "Account & Finance", positions: 357 },
  { icon: <FaHeartbeat />, title: "Health & Care", positions: 357 },
  { icon: <FaDatabase />, title: "Data Science", positions: 357 },
];

const PopularCategories = () => (
  <div className="container text-center" style={{ padding: '20px', marginTop: '70px', marginBottom: '30px' }}>
    <h2 className="mb-4">Popular Category</h2>
    <div className="row row-cols-1 row-cols-md-4 g-4"> {/* Adjusted the grid gap to g-4 */}
      {categories.map((category, index) => (
        <div key={index} className="col mb-4"> {/* Added margin bottom to each column */}
          <div className="card border shadow-sm h-100 d-flex align-items-center p-3">
            <div className="d-flex align-items-center">
              <div className="icon me-3" style={{ fontSize: '2rem', color: '#3498db' }}>
                {category.icon}
              </div>
              <div className="text-start">
                <h5 className="card-title mb-1">{category.title}</h5>
                <p className="card-text text-muted">{category.positions} Open positions</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PopularCategories;
