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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 text-red-500">
          <svg
            className="mx-auto h-24 w-24"
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

        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          Project Not Found
        </h1>
        <p className="mb-8 text-gray-600">
          We couldn&apos;t find the project you&apos;re looking for. It may have
          been deleted, moved, or never existed.
        </p>

        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={goBack}
            className="w-full rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:w-auto"
          >
            Go Back
          </button>
          <button
            onClick={goToProjects}
            className="w-full rounded-md border border-transparent bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 sm:w-auto"
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
