import React from 'react';

const ResolutionList = ({ resolutions }) => {
  if (!resolutions || resolutions.length === 0) {
    return <p className="text-center text-gray-500">No resolutions found. Start by creating a new one!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resolutions.map((resolution) => (
        <div key={resolution.id} className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900">{resolution.goal}</h3>
          <p className="text-sm text-gray-600">Created: {new Date(resolution.created_at).toLocaleDateString()}</p>
          {/* Add more resolution details here as needed */}
        </div>
      ))}
    </div>
  );
};

export default ResolutionList;