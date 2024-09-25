import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API requests

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function CreateUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    regd_no: '',
    name: '',
    mailid: '',
    section: '',
    stream: '',
    year: '',
    dept: '',
    password: '',
    universityId: ''
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { regd_no, name, mailid, section, stream, year, dept, password, universityId } = formData;

    if (!regd_no || !name || !mailid || !section || !stream || !year || !dept || !password || !universityId) {
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/admin/users', formData);
      setMessage(response.data.message);
      setFormData({
        regd_no: '',
        name: '',
        mailid: '',
        section: '',
        stream: '',
        year: '',
        dept: '',
        password: '',
        universityId: ''
      }); // Clear form
    } catch (error) {
      setMessage('Error creating user: ' + (error.response?.data?.message || error.message));
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
              <div className="col-span-12 xl:col-span-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full h-96 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Create User</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Registration Number</label>
                    <input
                      type="text"
                      name="regd_no"
                      value={formData.regd_no}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name</label>
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
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="mailid"
                      value={formData.mailid}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Section</label>
                    <input
                      type="text"
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Stream</label>
                    <input
                      type="text"
                      name="stream"
                      value={formData.stream}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Year</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Department</label>
                    <input
                      type="text"
                      name="dept"
                      value={formData.dept}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select University</label>
                    <select
                      name="universityId"
                      value={formData.universityId}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select a university</option>
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
                    Create User
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

export default CreateUser;