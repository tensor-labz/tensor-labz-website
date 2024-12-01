import React from 'react'
import PageTitle from '../components/core/PageTitle'

export default function PageLayout({children,id='',className="",title=''}) {
  return (
    <section id={id} className={`${className} sm:min-h-screen mb-10 max-w-full`}>
      {title&&<PageTitle>
        {title}
        </PageTitle>}
{children}
    </section>
  )
}
