import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Internships = ({ setInternshipData }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobProfile: "",
    startDate: "",
    endDate: "",
    stipend: "",
    certificate: null,
  });

  const [errors, setErrors] = useState({});
  const [internships, setInternships] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const dummyData = [
      {
        companyName: "Company A",
        jobProfile: "Software Engineer Intern",
        startDate: "2023-06-01",
        endDate: "2023-08-31",
        stipend: "5000",
        certificate: null,
      },
      {
        companyName: "Company B",
        jobProfile: "Data Analyst Intern",
        startDate: "2023-07-15",
        endDate: "2023-09-15",
        stipend: "6000",
        certificate: null,
      },
      {
        companyName: "Company C",
        jobProfile: "Web Developer Intern",
        startDate: "2023-05-10",
        endDate: "2023-07-10",
        stipend: "4500",
        certificate: null,
      },
      {
        companyName: "Company D",
        jobProfile: "Graphic Designer Intern",
        startDate: "2023-04-20",
        endDate: "2023-06-20",
        stipend: "4000",
        certificate: null,
      },
      {
        companyName: "Company E",
        jobProfile: "Project Management Intern",
        startDate: "2023-08-01",
        endDate: "2023-10-01",
        stipend: "7000",
        certificate: null,
      },
    ];
    setInternships(dummyData);
    setInternshipData(dummyData); // Pass the dummy data to the parent
  }, [setInternshipData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificate") {
      setFormData({ ...formData, certificate: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company name is required.";
    if (!formData.jobProfile) newErrors.jobProfile = "Job profile is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";
    if (!formData.stipend) newErrors.stipend = "Stipend is required.";
    return newErrors;
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingIndex === null) {
      setInternships([...internships, formData]);
      alert("Internship added successfully!");
    } else {
      const updatedInternships = [...internships];
      updatedInternships[editingIndex] = formData;
      setInternships(updatedInternships);
      alert("Internship updated successfully!");
    }

    resetForm();
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      const updatedInternships = internships.filter((_, i) => i !== index);
      setInternships(updatedInternships);
    }
  };

  const handleEdit = (index) => {
    const internship = internships[index];
    setFormData(internship);
    setEditingIndex(index);
    setErrors({});
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      jobProfile: "",
      startDate: "",
      endDate: "",
      stipend: "",
      certificate: null,
    });
    setEditingIndex(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="bg-white border p-10 shadow-2xl w-full max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-black text-left mb-6">
          Internship Details
        </h1>
        <form onSubmit={handleAddOrUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.companyName && (
              <p className="text-red-600">{errors.companyName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Job Profile</label>
            <input
              type="text"
              name="jobProfile"
              value={formData.jobProfile}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.jobProfile && (
              <p className="text-red-600">{errors.jobProfile}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.startDate && (
              <p className="text-red-600">{errors.startDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.endDate && <p className="text-red-600">{errors.endDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stipend</label>
            <input
              type="number"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            {errors.stipend && <p className="text-red-600">{errors.stipend}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Certificate</label>
            <input
              type="file"
              name="certificate"
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingIndex === null ? "Add Internship" : "Update Internship"}
          </button>
        </form>

        {/* Internships List */}
        <div className="mt-8 grid grid-cols-1 gap-6">
          {internships.map((internship, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 border"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                {internship.companyName}
              </h2>
              <p className="text-gray-600">
                Job Profile: {internship.jobProfile}
              </p>
              <p className="text-gray-600">
                Duration: {internship.startDate} - {internship.endDate}
              </p>
              <p className="text-gray-600">Stipend: ₹{internship.stipend}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:underline flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internships;
