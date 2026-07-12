import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectNotFound() {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  const goToProjects = () => navigate('/services/all', { replace: true });
  const goBack = () => window.history.back();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    goToProjects();
    return undefined;
  }, [countdown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 text-red-500">
          <svg
            className="w-24 h-24 mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Project Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find the project you&apos;re looking for. It may have
          been deleted, moved, or never existed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={goBack}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 w-full sm:w-auto"
          >
            Go Back
          </button>
          <button
            onClick={goToProjects}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 w-full sm:w-auto"
          >
            View All Projects
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Redirecting to Projects page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}
