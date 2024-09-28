import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssessmentResults() {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      const response = await axios.get(`${baseUrl}/assessments/manage`);
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  const fetchResults = async (assessmentId) => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      const response = await axios.get(`${baseUrl}/assessments/${assessmentId}/details`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assessment Results</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Assessments</h2>
          {assessments.map((assessment) => (
            <div
              key={assessment._id}
              className="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedAssessment(assessment);
                fetchResults(assessment._id);
              }}
            >
              {assessment.title}
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          {results && (
            <div>
              <h3 className="text-lg font-medium">{selectedAssessment.title}</h3>
              <p>Total Students: {results.totalStudents}</p>
              <p>Completed: {results.completedStudents.length}</p>
              <p>Pending: {results.pendingStudents}</p>
              <h4 className="text-md font-medium mt-2">Scores:</h4>
              <ul>
                {results.completedStudents.map((student) => (
                  <li key={student.studentId}>
                    Student ID: {student.studentId} - Score: {student.score}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssessmentResults;