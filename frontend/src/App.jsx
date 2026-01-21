import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ResolutionForm from './components/ResolutionForm';
import ResolutionChatPage from './components/ResolutionChatPage'; // Import the new component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-xl font-bold text-gray-900">Resolution Tracker</Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/dashboard" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Dashboard</Link>
                  <Link to="/set-resolution" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Set Resolution</Link>
                  {!isAuthenticated && <Link to="/auth" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Login/Register</Link>}
                  {isAuthenticated && <button onClick={() => setIsAuthenticated(false)} className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Logout</button>}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} />
          <Route path="/set-resolution" element={isAuthenticated ? <ResolutionForm /> : <Navigate to="/auth" />} />
          <Route path="/resolution-chat/:resolutionId" element={isAuthenticated ? <ResolutionChatPage /> : <Navigate to="/auth" />} />
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
