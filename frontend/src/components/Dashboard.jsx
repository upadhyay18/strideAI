import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResolutionList from './ResolutionList';
import { getResolutions, createResolution } from '../api'; // Import both API functions

const Dashboard = () => {
  const [resolutions, setResolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = 1; 

  useEffect(() => {
    const fetchResolutions = async () => {
      try {
        const response = await getResolutions(userId);
        setResolutions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch resolutions.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchResolutions();
  }, [userId]);

  const handleCreateResolution = async () => {
    try {
      const newResolutionGoal = "New Resolution"; // This would typically come from a user input
      const response = await createResolution(userId, newResolutionGoal);
      if (response.data.resolution) {
        navigate(`/resolution-chat/${response.data.resolution.id}`); // Redirect to the chat page with the new resolution ID
      }
    } catch (err) {
      console.error('Error creating resolution:', err);
      setError('Failed to create new resolution.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading resolutions...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <button
            onClick={handleCreateResolution}
            className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New Resolution
          </button>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ResolutionList resolutions={resolutions} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;