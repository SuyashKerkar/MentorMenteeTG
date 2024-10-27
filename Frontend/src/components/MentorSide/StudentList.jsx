import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const students = [
  {
    srNo: 1,
    collegeId: "VU2F2122001",
    name: "John Doe",
    contact: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    srNo: 2,
    collegeId: "VU2F2122002",
    name: "Jane Smith",
    contact: "987-654-3210",
    email: "jane.smith@example.com",
  },
  {
    srNo: 3,
    collegeId: "VU2F2122003",
    name: "Alex Johnson",
    contact: "555-123-4567",
    email: "alex.johnson@example.com",
  },
  {
    srNo: 4,
    collegeId: "VU2F2122004",
    name: "Emily Davis",
    contact: "444-555-6666",
    email: "emily.davis@example.com",
  },
];

const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(students);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, "students_list.xlsx");
};

const printTable = () => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["Sr. No.", "College ID", "Name", "Contact", "Email"]],
    body: students.map((student) => [
      student.srNo,
      student.collegeId,
      student.name,
      student.contact,
      student.email,
    ]),
  });
  doc.save("students_list.pdf");
};

const StudentList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.collegeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="font-sans">
      <Navbar />
      <div className="p-6 justify-center">
        <div className="overflow-x-auto mb-16">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 text-center text-md font-semibold border border-gray-200">
                  Sr. No.
                </th>
                <th className="py-3 px-6 text-center text-md font-semibold border border-gray-200">
                  College ID
                </th>
                <th className="py-3 px-6 text-center text-md font-semibold border border-gray-200">
                  Name
                </th>
                <th className="py-3 px-6 text-center text-md font-semibold border border-gray-200">
                  Contact
                </th>
                <th className="py-3 px-6 text-center text-md font-semibold border border-gray-200">
                  Email
                </th>
                <th className="py-3 px-6 text-center text-md font-semibold border border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.srNo}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition duration-300`}
                >
                  <td className="py-4 px-6 text-center border border-gray-200">
                    {student.srNo}
                  </td>
                  <td className="py-4 px-6 text-center border border-gray-200">
                    {student.collegeId}
                  </td>
                  <td className="py-4 px-6 text-left border border-gray-200">
                    {student.name}
                  </td>
                  <td className="py-4 px-6 text-left border border-gray-200">
                    {student.contact}
                  </td>
                  <td className="py-4 px-6 text-left border border-gray-200">
                    {student.email}
                  </td>
                  <td className="py-4 px-6 text-center border border-gray-200">
                    <Link
                      to={`/students/${student.collegeId}`}
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fixed bottom-0 right-0 p-6 bg-gray-100 w-full flex justify-end space-x-4 shadow-md">
          <button
            onClick={exportToExcel}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Export to Excel
          </button>
          <button
            onClick={printTable}
            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
