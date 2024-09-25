import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Spocdashboard() {
  const [spocs, setSpocs] = useState([]);

  useEffect(() => {
    const fetchSpocs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/spocs');
        if (response.data && Array.isArray(response.data.spocs)) {
          setSpocs(response.data.spocs);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching SPOCs:', error);
      }
    };

    fetchSpocs();
  }, []);

  return (
    <div className="col-span-full xl:col-span-10 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">SPOCs</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Phone</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">University</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {spocs.map((spoc) => (
                <tr key={spoc._id}>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100">{spoc.name}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100">{spoc.email}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100">{spoc.phone}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100">
                      {spoc.university.long_name}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Spocdashboard;