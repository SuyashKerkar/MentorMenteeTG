import React, { useState } from 'react';
import Navbar from './Navbar';
import Internships from './Internships';

const Download = () => {
  const [filters, setFilters] = useState({
    all: false,
    internship: false,
    extracurricularactivities: false,
    curricular: false,
    higherstudy: false,
    placement: false,
  });

  const handleFilterChange = (event) => {
    const { name } = event.target;

    // Set the selected checkbox to true and others to false
    setFilters({
      all: false,
      internship: false,
      extracurricularactivities: false,
      curricular: false,
      higherstudy: false,
      placement: false,
      [name]: true, // Only the selected checkbox becomes true
    });
  };

  return (
    <div className="font-sans">
      <Navbar />
      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 space-x-10">
          <label>
            <input
              type="checkbox"
              name="all"
              checked={filters.all}
              onChange={handleFilterChange}
            />
            All
          </label>
          <label>
            <input
              type="checkbox"
              name="internship"
              checked={filters.internship}
              onChange={handleFilterChange}
            />
            Internship
          </label>
          <label>
            <input
              type="checkbox"
              name="extracurricularactivities"
              checked={filters.extracurricularactivities}
              onChange={handleFilterChange}
            />
            Extra-curricular Activities
          </label>
          <label>
            <input
              type="checkbox"
              name="curricular"
              checked={filters.curricular}
              onChange={handleFilterChange}
            />
            Co-curricular Activities
          </label>
          <label>
            <input
              type="checkbox"
              name="higherstudy"
              checked={filters.higherstudy}
              onChange={handleFilterChange}
            />
            Higher Studies
          </label>
          <label>
            <input
              type="checkbox"
              name="placement"
              checked={filters.placement}
              onChange={handleFilterChange}
            />
            Placement
          </label>
        </div>
      </div>
    </div>
  );
};

export default Download;
