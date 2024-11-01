import { useState, useEffect } from "react"; 
import Navbars from "../Navbars";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cocurriact = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    co_id: null,
    idx: -1,
    updated: false,
    date: "",
    sem: "",
    activity: "",
    status: "",
    document: null,
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const formDataObj = new FormData();
      formDataObj.append(
        "email",
        JSON.parse(localStorage.getItem("loggedInUser")).email
      );
  
      try {
        let response = await axios.post("http://localhost:3001/getCoActivities", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const acts = response.data.map((e, index) => ({
          co_id: e.co_id,
          idx: index,
          updated: false,
          date: e.date.split("T")[0],
          sem: e.semester,
          status: e.status,
          activity: e.activity,
          document: e.activity_certificate,
        }));
        setActivities(acts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Handle adding or updating an activity
  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const updatedActivities = [...activities];
    if (editIndex !== null) {
      // Update the existing activity
      updatedActivities[editIndex] = { ...newActivity, idx: editIndex, updated: true, co_id: activities[editIndex].co_id };
      setEditIndex(null); // Reset edit index after update
    } else {
      // Add a new activity
      updatedActivities.push({ ...newActivity, idx: updatedActivities.length });
    }
    setActivities(updatedActivities);
    setNewActivity({
      co_id: null,
      idx: -1,
      updated: false,
      date: "",
      sem: "",
      activity: "",
      status: "",
      document: null,
    });
  };

  // Handle input changes for new activity fields
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setNewActivity({ ...newActivity, [name]: files[0] });
    } else {
      setNewActivity({ ...newActivity, [name]: value });
    }
  };

  // Handle selecting an activity for editing
  const selectActivityForEdit = (index) => {
    setNewActivity(activities[index]);
    setEditIndex(index);
  };

  // Handle deleting an activity
  const deleteActivity = async (index) => {
    const updatedActivities = [...activities];
    const removed = updatedActivities.splice(index, 1)[0];
    setActivities(updatedActivities);
    try {
      await axios.post("http://localhost:3001/deleteCoAct", { co_id: removed.co_id }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append(
      "email",
      JSON.parse(localStorage.getItem("loggedInUser")).email
    );

    const CocurriactWithDocNames = activities.map((activity) => ({
      ...activity,
      document: activity.document.name ? activity.document.name : (activity.document ? activity.document : "N/A"),
    }));

    formDataObj.append("Cocurriact", JSON.stringify(CocurriactWithDocNames));
    activities.forEach((activity) => {
      if (activity.document) {
        formDataObj.append("codoc", activity.document);
      }
    });

    try {
      await axios.post("http://localhost:3001/cocurriact", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Details successfully submitted!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }

    localStorage.setItem("Cocurriact", JSON.stringify(CocurriactWithDocNames));
  };

  return (
    <>
      <Navbars />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="bg-white border p-10 shadow-2xl w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-black text-left mb-6">
            Co-Curricular Activities
          </h1>

          {/* Form to Add or Update Activity */}
          <form onSubmit={handleAddOrUpdate} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newActivity.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Semester</label>
                <select
                  name="sem"
                  value={newActivity.sem}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-400 rounded"
                  required
                >
                  <option value="">Select a semester</option>
                  {[...Array(8).keys()].map((sem) => (
                    <option key={sem + 1} value={`Sem ${sem + 1}`}>
                      Sem {sem + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Activity</label>
                <select
                  name="activity"
                  value={newActivity.activity}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-400 rounded"
                  required
                >
                  <option value="">Select an activity</option>
                  <option value="Conference">Conference</option>
                  <option value="Paper Published">Paper Published</option>
                  <option value="Professional Society Workshop">
                    Professional Society Workshop
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <input
                  type="text"
                  name="status"
                  value={newActivity.status}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-400 rounded"
                  placeholder="Enter status"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Document</label>
                <input
                  type="file"
                  name="document"
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-400 rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-800 text-white py-2 px-4 rounded-md shadow-sm"
            >
              {editIndex !== null ? "Update Activity" : "Add Activity"}
            </button>
          </form>

          {/* Table to Display Activities */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold "> Activities List</h2>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Semester</th>
                  <th className="border px-4 py-2">Activity</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Document</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{activity.date}</td>
                    <td className="border px-4 py-2">{activity.sem}</td>
                    <td className="border px-4 py-2">{activity.activity}</td>
                    <td className="border px-4 py-2">{activity.status}</td>
                    <td className="border px-4 py-2">{activity.document.name ? activity.document.name : (activity.document ? activity.document : "N/A")}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => selectActivityForEdit(index)}
                        className="text-yellow-600 mx-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteActivity(index)}
                        className="text-red-600 mx-2"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit All Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-700 text-white py-2 px-4 rounded-md shadow-sm"
          >
            Submit All
          </button>
        </div>
      </div>
    </>
  );
};

export default Cocurriact;
