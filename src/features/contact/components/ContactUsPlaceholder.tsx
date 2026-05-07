const ContactUsPlaceholder = () => {
  return (
    <div className="w-60 h-32 bg-gray-100 rounded-lg overflow-hidden shadow-sm relative mb-3">
      <div className="flex items-center px-4 py-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        <div className="ml-3 flex-1">
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
          <div className="h-2 bg-gray-200 rounded w-1/3 animate-pulse" />
        </div>
      </div>
      <div className="px-4">
        <div className="h-2 bg-gray-200 rounded w-full mb-2 animate-pulse" />
        <div className="h-2 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
        <div className="h-2 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
};

export default ContactUsPlaceholder;
