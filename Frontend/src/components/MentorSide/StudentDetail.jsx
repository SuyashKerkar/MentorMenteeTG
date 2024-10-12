import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const studentData = {
  VU2F2122001: {
    personalData: {
      name: "John Doe",
      collegeId: "VU2F2122001",
      contact: "123-456-7890",
      email: "john.doe@example.com",
      address: "123 Elm Street, City, Country",
      dob: "2000-01-01",
    },
    internship: "Intern at XYZ Corp.",
    results: "GPA: 3.8",
    achievements: "Top Scorer in Math Olympiad",
  },
};

const StudentDetail = () => {
  const { collegeId } = useParams();
  const [student, setStudent] = useState(null);
  const [filters, setFilters] = useState({
    all: true,
    internship: false,
    extracurricular: false,
    cocurricular: false,
    higherStudies: false,
    placement: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedStudent = studentData[collegeId];
    setStudent(fetchedStudent);
  }, [collegeId]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFilterChange = (event) => {
    const { name } = event.target;

    // Reset all filters, and set the clicked one to true
    setFilters({
      all: name === "all",
      internship: name === "internship",
      extracurricular: name === "extracurricular",
      cocurricular: name === "cocurricular",
      higherStudies: name === "higherStudies",
      placement: name === "placement",
    });
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="font-serif bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Student Details
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(filters).map((filterKey) => (
            <label
              key={filterKey}
              className="inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name={filterKey}
                checked={filters[filterKey]}
                onChange={handleFilterChange}
                className="form-checkbox h-5 w-5 text-blue-600 hidden"
              />
              <span
                className={`ml-2 px-4 py-2 rounded-full transition-colors ${
                  filters[filterKey]
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
              </span>
            </label>
          ))}
        </div>

        {/* Display Data based on filters */}
        {filters.all && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Personal Data
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(student.personalData).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-700 capitalize">{key}</p>
                  <p className="text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              Internship
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-900">{student.internship}</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              Results
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-900">{student.results}</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              Achievements
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-900">{student.achievements}</p>
            </div>
          </div>
        )}

        {/* Individual Filters Display */}
        {filters.internship && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Internship
            </h2>
            <p className="text-gray-900">{student.internship}</p>
          </div>
        )}
        {filters.extracurricular && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Extra-curricular Activities
            </h2>
            <p>Details about extra-curricular activities will go here.</p>
          </div>
        )}
        {filters.cocurricular && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Co-curricular Activities
            </h2>
            <p>Details about co-curricular activities will go here.</p>
          </div>
        )}
        {filters.higherStudies && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Higher Studies
            </h2>
            <p>Details about higher studies will go here.</p>
          </div>
        )}
        {filters.placement && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Placement
            </h2>
            <p>Details about placements will go here.</p>
          </div>
        )}

        {/* Buttons */}
        {filters.all && (
          <div className="flex justify-end space-x-4 mt-8">
            <button
              className="bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition duration-200"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
