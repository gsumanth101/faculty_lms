import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Coursedashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/spoc/students', { withCredentials: true });
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Error fetching students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="col-span-full xl:col-span-10 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Students</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="table-auto w-full dark:text-gray-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Regd No</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Section</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Stream</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Year</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Dept</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">{student.regd_no}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">{student.name}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">{student.email}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">{student.section}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">{student.stream}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">{student.year}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">{student.dept}</div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Coursedashboard;