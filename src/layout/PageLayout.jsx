import React from 'react'
import PageTitle from '../components/core/PageTitle'
import { motion } from 'motion/react';

export default function PageLayout({children,id='',className="",title=''}) {
  return (
    <motion.section id={id} className={`${className} sm:min-h-screen mb-10 max-w-full`}>
      {title&&<PageTitle>
        {title}
        </PageTitle>}
{children}
    </motion.section>
  )
}
