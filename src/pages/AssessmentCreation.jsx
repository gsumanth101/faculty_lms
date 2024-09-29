import React, { useState } from 'react';
import axios from 'axios';
import { generateQuestions } from '../services/geminiService';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function AssessmentCreation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '', marks: 1 }]);
  const [deadline, setDeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(1);
  const [marksPerQuestion, setMarksPerQuestion] = useState(1);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '', marks: 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/assessments/create', {
        facultyId: '01', // Replace with actual faculty ID
        title,
        questions,
        deadline
      });
      alert('Assessment created successfully!');
      // Reset form
      setTitle('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '', marks: 1 }]);
      setDeadline('');
    } catch (error) {
      console.error('Error creating assessment:', error);
      alert('Error creating assessment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!topic) {
      alert('Please enter a topic for question generation.');
      return;
    }
    setIsLoading(true);
    try {
      const generatedQuestions = await generateQuestions(topic, numQuestions, marksPerQuestion);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert(`Error generating questions: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Assessment</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Assessment Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Questions</h3>
                  <div className="mb-4 p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-2">AI-Powered Question Generation</h4>
                    <div className="space-y-2 mb-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter topic for questions"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
                          <input
                            type="number"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
                            min="1"
                            max="10"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Marks per Question</label>
                          <input
                            type="number"
                            value={marksPerQuestion}
                            onChange={(e) => setMarksPerQuestion(parseInt(e.target.value) || 1)}
                            min="1"
                            max="10"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateQuestions}
                      disabled={isLoading}
                      className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-300"
                    >
                      {isLoading ? 'Generating...' : 'Generate Questions'}
                    </button>
                  </div>
                  
                  {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-4 p-4 border rounded-md">
                      <div className="flex items-center mb-2">
                        <span className="font-bold text-lg mr-2">Q{questionIndex + 1}.</span>
                        <input
                          type="text"
                          value={question.questionText}
                          onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                          placeholder={`Question ${questionIndex + 1}`}
                          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <div className="ml-2 flex items-center">
                          <label className="text-sm font-medium text-gray-700 mr-1">Marks:</label>
                          <input
                            type="number"
                            value={question.marks}
                            onChange={(e) => handleQuestionChange(questionIndex, 'marks', parseInt(e.target.value) || 1)}
                            min="1"
                            max="10"
                            className="w-16 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      {question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      ))}
                      <select
                        value={question.correctAnswer}
                        onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
                        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Correct Answer</option>
                        {question.options.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                  <div className="flex justify-between items-center mb-4">
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Add Question
                    </button>
                    <div className="text-gray-600">
                      <span className="mr-4">Total Questions: {questions.length}</span>
                      <span>Total Marks: {questions.reduce((sum, question) => sum + question.marks, 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
                >
                  {isLoading ? 'Creating...' : 'Create Assessment'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AssessmentCreation;