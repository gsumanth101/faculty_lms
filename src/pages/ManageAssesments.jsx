import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function ManageAssessments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      const response = await axios.get(`${baseUrl}/assessments/manage`);
      console.log('Fetched assessments:', response.data);
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setAssessments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssessmentDetails = async (id) => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      const response = await axios.get(`${baseUrl}/assessments/${id}/details`);
      setSelectedAssessment(response.data);
    } catch (error) {
      console.error('Error fetching assessment details:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) 
      ? date.toLocaleString()
      : 'Invalid Date';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-4">Manage Assessments</h1>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Assessments</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : assessments.length > 0 ? (
                assessments.map((assessment) => (
                  <div 
                    key={assessment._id} 
                    className="mb-2 p-2 border rounded hover:bg-gray-100 cursor-pointer" 
                    onClick={() => fetchAssessmentDetails(assessment._id)}
                  >
                    <h3 className="font-medium">{assessment.title}</h3>
                    <p>Completed: {assessment.completedCount} | Pending: {assessment.pendingCount}</p>
                    <p>Average Score: {assessment.averageScore.toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p>No assessments found. Create an assessment to see it here.</p>
              )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Assessment Details</h2>
              {selectedAssessment ? (
                <div>
                  <h3 className="font-medium">{selectedAssessment.assessment.title}</h3>
                  <p>Total Students: {selectedAssessment.totalStudents}</p>
                  <p>Completed: {selectedAssessment.completedStudents.length}</p>
                  <p>Pending: {selectedAssessment.pendingStudents}</p>
                  <h4 className="font-medium mt-2">Completed Students:</h4>
                  <ul>
                    {selectedAssessment.completedStudents.map((student, index) => (
                      <li key={index} className="mb-1">
                        Student ID: {student.studentId} | Score: {student.score} | 
                        Submitted: {formatDate(student.submittedAt)}
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-medium mt-2">Pending Students:</h4>
                  <p>{selectedAssessment.pendingStudents} students have not completed the assessment.</p>
                </div>
              ) : (
                <p>Select an assessment to view details</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageAssessments;