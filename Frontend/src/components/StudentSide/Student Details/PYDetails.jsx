import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Navbars from "../Navbars"; // Import Navbars component

const PYDetails = () => {
  const [formData, setFormData] = useState({
    tenthMarks: "",
    tenthPercentage: "",
    tenthPassingYear: "",
    twelfthMarks: "",
    twelfthPercentage: "",
    twelfthPassingYear: "",
    diplomaMarks: "",
    diplomaPercentage: "",
    diplomaPassingYear: "",
    gap: false,
    gapCertificate: null,
    certificates: { tenth: null, twelfth: null, diploma: null },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCertificateChange = (e, key) => {
    setFormData({
      ...formData,
      certificates: { ...formData.certificates, [key]: e.target.files[0] },
    });
  };

  const handleSubmit = () => {
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbars />
      <div className="flex items-center justify-center">
        <div className="bg-white border p-20 shadow-2xl w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-black mb-6">Previous Years Details</h1>

          <form className="space-y-8">
            {/* 10th Details */}
            <div>
              <h2 className="text-lg font-bold text-black mb-2">10th Details</h2>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                  <input
                    type="number"
                    name="tenthMarks"
                    value={formData.tenthMarks}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Percentage</label>
                  <input
                    type="number"
                    name="tenthPercentage"
                    value={formData.tenthPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                  <input
                    type="number"
                    name="tenthPassingYear"
                    value={formData.tenthPassingYear}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => handleCertificateChange(e, "tenth")}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-800" />

            {/* 12th Details */}
            <div>
              <h2 className="text-lg font-bold text-black mb-4">12th Details</h2>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                  <input
                    type="number"
                    name="twelfthMarks"
                    value={formData.twelfthMarks}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Percentage</label>
                  <input
                    type="number"
                    name="twelfthPercentage"
                    value={formData.twelfthPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                  <input
                    type="number"
                    name="twelfthPassingYear"
                    value={formData.twelfthPassingYear}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => handleCertificateChange(e, "twelfth")}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-800" />

            {/* Diploma Details */}
            <div>
              <h2 className="text-lg font-bold text-black mb-4">Diploma Details</h2>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                  <input
                    type="number"
                    name="diplomaMarks"
                    value={formData.diplomaMarks}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Percentage</label>
                  <input
                    type="number"
                    name="diplomaPercentage"
                    value={formData.diplomaPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                  <input
                    type="number"
                    name="diplomaPassingYear"
                    value={formData.diplomaPassingYear}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => handleCertificateChange(e, "diploma")}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-800" />

            {/* Academic Gap */}
            <div>
              <h2 className="text-lg font-bold text-black mb-4">Academic Gap</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  name="gap"
                  checked={formData.gap}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-800 border-gray-300 rounded"
                />
                <label className="block text-sm font-medium text-gray-700">Tick if there was a gap</label>
              </div>
              {formData.gap && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Upload Gap Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => handleCertificateChange(e, "gapCertificate")}
                    className="mt-1 block w-full"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-cyan-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PYDetails;
