import React from 'react'

export default function PageTitle({children}) {
  return (
    <h1 className="md:text-4xl text-2xl font-bold text-center text-blue-800 mb-12">{children}</h1>
  )
}
