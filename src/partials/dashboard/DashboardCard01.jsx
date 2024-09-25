import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardCard01() {
  const [universityCount, setUniversityCount] = useState(0);

  useEffect(() => {
    const fetchUniversityCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/counts');
        if (response.data && typeof response.data.count === 'number') {
          setUniversityCount(response.data.count);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching university count:', error);
      }
    };

    fetchUniversityCount();
  }, []);

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
      <div className="p-5">
        <header className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v2h-2V7zm0 4h2v4h-2v-4z"/>
            </svg>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-white">Faculty</h2>
            <div className="text-3xl font-bold text-white">{universityCount}</div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default DashboardCard01;