import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API requests

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function Addcourse() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    universityIds: []
  });
  const [universities, setUniversities] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch universities on component mount
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/org');
        if (response.data && Array.isArray(response.data.universities)) {
          setUniversities(response.data.universities);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  // Handle form changes
const handleChange = (e) => {
  const { name, value, selectedOptions } = e.target;
  if (name === 'universityIds') {
    const selectedValues = Array.from(selectedOptions, option => option.value);
    setFormData({ ...formData, [name]: selectedValues });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/admin/add_course', formData);
      setMessage(response.data.message);
      setFormData({ name: '', description: '', universityIds: [] }); // Clear form
    } catch (error) {
      setMessage('Error creating course: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow flex items-center justify-center">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            {/* Form Card */}
            <div className="flex items-center justify-center">
              <div className="col-span-12 xl:col-span-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Create Course</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Course Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Universities</label>
                  <select
                    name="universityIds"
                    value={formData.universityIds}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    multiple
                    required
                  >
                    {universities.map((university) => (
                      <option key={university._id} value={university._id}>
                        {university.long_name}
                      </option>
                    ))}
                  </select>
                </div>

                  <button
                    type="submit"
                    className="btn bg-gray-900 text-white hover:bg-gray-700 w-full py-2 rounded-md"
                  >
                    Create Course
                  </button>
                </form>

                {/* Message */}
                {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Addcourse;