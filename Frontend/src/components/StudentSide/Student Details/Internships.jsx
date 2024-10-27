import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbars from "../Navbars";
import axios from "axios";

const Internships = () => {
  const navigate = useNavigate();
  // Form data state
  const [formData, setFormData] = useState({
    int_id: null,
    idx: -1,
    updated: false,
    companyName: "",
    jobProfile: "",
    startDate: "",
    endDate: "",
    stipendStatus: "",
    stipend: "",
    certificate: null,
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Internships list state
  const [internships, setInternships] = useState([]);

  // Index for editing an internship, null if not editing
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const formDataObj = new FormData();
      formDataObj.append(
        "email",
        JSON.parse(localStorage.getItem("loggedInUser")).email
      );
  
      try {
        let response = await axios.post("http://localhost:3001/getInternships", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        let ints= [];
        response.data.forEach((e,index)=>{
          const newFormData = {
            int_id: e.int_id,
            idx: index,
            companyName: e.company_name,
            updated: false,
            jobProfile: e.job_profile,
            startDate: e.start_date.split("T")[0],
            endDate: e.end_date.split("T")[0],
            stipendStatus: e.stipent_status,
            stipend: e.stipent,
            certificate: e.internship_cerificate,
          };
          ints.push(newFormData)
        })
        setInternships(ints);
        console.log(response.data);
        // Update the state or handle response data as needed
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []); // Pass dependencies or leave empty for a single execution
  
  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificate") {
      setFormData({ ...formData, certificate: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.companyName || typeof formData.companyName !== "string") {
      newErrors.companyName =
        "Company name is required and must be a valid string.";
    }
    if (!formData.jobProfile || typeof formData.jobProfile !== "string") {
      newErrors.jobProfile =
        "Job profile is required and must be a valid string.";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    }
    if (!formData.stipend || formData.stipend <= 0) {
      newErrors.stipend = "please enter a valid input";
    }
    if (!formData.certificate) {
      newErrors.certificate = "please upload the certificate";
    }

    return newErrors;
  };

  const handleAddOrUpdate = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Ensure that certificate is set to "N/A" if not uploaded
    const updatedFormData = {
      ...formData,
      certificate: formData.certificate ? formData.certificate : "N/A",
    };

    if (editingIndex === null) {
      // Add new internship
      const addedFormData = {
        ...updatedFormData,
        idx: internships.length,
      };
      setInternships([...internships, addedFormData]);
      alert("Internship added successfully!"); // Alert for adding
    } else {
      // Update existing internship
      const editedFormData = {
        ...updatedFormData,
        idx: editingIndex,
        updated: true,
      };
      const updatedInternships = [...internships];
      updatedInternships[editingIndex] = editedFormData;
      setInternships(updatedInternships);
      alert("Internship updated successfully!"); // Alert for updating
    }

    // Reset the form and clear the editing index
    setFormData({
      int_id: null,
      idx: -1,
      companyName: "",
      updated: false,
      jobProfile: "",
      startDate: "",
      endDate: "",
      stipendStatus: "",
      stipend: "",
      certificate: null,
    });
    setEditingIndex(null);
    setErrors({});
  };

  // Handle deleting an internship
  const handleDelete = async(index) => {
    const updatedInternships = internships.filter((_, i) => i !== index);
    setInternships(updatedInternships);

    try {
      await axios.post("http://localhost:3001/deleteInt", {int_id: internships[index].int_id}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
  };

  // Handle editing an internship, pre-filling the form
  const handleEdit = (index) => {
    const internship = internships[index];
    setFormData(internship);
    setEditingIndex(index);
    setErrors({});
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    // Create a FormData object
    const formDataObj = new FormData();
    formDataObj.append(
      "email",
      JSON.parse(localStorage.getItem("loggedInUser")).email
    );

    // Create a modified internships array where the certificate is replaced with certificate.name
    const internshipsWithCertificateNames = internships.map((internship) => ({
      ...internship,
      certificate: internship.certificate ? internship.certificate.name : "N/A", // Replace certificate file with its name
    }));

    // Append the entire internships array as a JSON string to the FormData
    formDataObj.append(
      "internships",
      JSON.stringify(internshipsWithCertificateNames)
    );

    // Append each certificate file separately if they exist
    internships.forEach((internship, index) => {
      if (internship.certificate) {
        formDataObj.append("internship", internship.certificate); // Append actual file to FormData
      }
    });

    try {
      await axios.post("http://localhost:3001/internships", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // alert('Files successfully uploaded!');
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }

    // Save the internships with certificate names to localStorage
    localStorage.setItem(
      "Internships",
      JSON.stringify(internshipsWithCertificateNames)
    );

    alert("Internships saved successfully!");
    navigate("/cocurriact");
  };

  return (
    <>
      <Navbars />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="bg-white border p-10 shadow-2xl w-full max-xl mx-auto">
          <h1 className="text-2xl font-bold text-black text-left mb-6">
            Internship Details
          </h1>

          {/* Form */}
          <form className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {/* Company Name */}
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.companyName ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs">{errors.companyName}</p>
                )}
              </div>

              {/* Job Profile */}
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="jobProfile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Profile
                </label>
                <input
                  type="text"
                  id="jobProfile"
                  name="jobProfile"
                  value={formData.jobProfile}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.jobProfile ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.jobProfile && (
                  <p className="text-red-500 text-xs">{errors.jobProfile}</p>
                )}
              </div>

              {/* Start Date */}
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.startDate ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs">{errors.startDate}</p>
                )}
              </div>

              {/* End Date */}
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.endDate ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs">{errors.endDate}</p>
                )}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="jobProfile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stipend Status
                </label>
                <select
                  id="stipendStatus"
                  name="stipendStatus"
                  value={formData.stipendStatus}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.stipendStatus ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                >
                  <option value="" hidden>
                    Select
                  </option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
                {errors.jobProfile && (
                  <p className="text-red-500 text-xs">{errors.stipendStatus}</p>
                )}
              </div>

              {/* Stipend */}
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="stipend"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stipend
                </label>
                <input
                  type="number"
                  id="stipend"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.stipend ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm`}
                />
                {errors.stipend && (
                  <p className="text-red-500 text-xs">{errors.stipend}</p>
                )}
              </div>

              {/* Certificate Upload */}
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="certificate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Certificate/Offer Letter
                </label>
                <input
                  type="file"
                  id="certificate"
                  name="certificate"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* Add/Update Button */}
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className="bg-blue-800 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 mt-4"
            >
              {editingIndex === null ? "Add Internship" : "Update Internship"}
            </button>

            {/* Submit Button */}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-gray-800 text-white rounded-full font-semibold px-4 py-2 shadow-sm hover:bg-gray-600"
                onClick={handleSubmit1}
              >
                Submit
              </button>
            </div>
          </form>

          {/* Table to display internships */}
          {internships.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Internship Details
              </h3>
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Company Name</th>
                    <th className="border px-4 py-2">Job Profile</th>
                    <th className="border px-4 py-2">Start Date</th>
                    <th className="border px-4 py-2">End Date</th>
                    <th className="border px-4 py-2">Stiped Status</th>
                    <th className="border px-4 py-2">Stipend</th>
                    <th className="border px-4 py-2">Certificate</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map((internship, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {internship.companyName}
                      </td>
                      <td className="border px-4 py-2">
                        {internship.jobProfile}
                      </td>
                      <td className="border px-4 py-2">
                        {internship.startDate}
                      </td>
                      <td className="border px-4 py-2">{internship.endDate}</td>
                      <td className="border px-4 py-2">
                        {internship.stipendStatus}
                      </td>
                      <td className="border px-4 py-2">{internship.stipend}</td>
                      <td className="border px-4 py-2">
                        {internship.certificate
                          ? internship.certificate.name
                            ? internship.certificate.name
                            : internship.certificate
                          : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Internships;
