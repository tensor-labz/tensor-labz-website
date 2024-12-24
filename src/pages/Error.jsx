import React from 'react'
import { useRouteError } from 'react-router-dom'


export default function Error() {
 const error=useRouteError()
 const errorCode=error.status.toString()
  return (
    <div className="grid place-items-center min-h-screen bg-gray-100">
    <div className="max-w-lg text-center space-y-8">
 
      <h1 className="text-9xl font-extrabold text-gray-800 flex justify-center space-x-1">
        <span className="text-sky-700">{errorCode[0]}</span>
        <span className="text-sky-300">{errorCode[1]}</span>
        <span className="text-sky-700">{errorCode[2]}</span>
      </h1>
     
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
        {error.statusText}
      </h2>
 
      <p className="text-lg text-slate-500">{error.error.message}</p>
      <div>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  </div>
  
  )
}
