import React from 'react'
import { useLoaderData } from 'react-router-dom'
import PageLayout from '../layout/PageLayout'
import { TabProvider } from '../components/context/TabContext'
import HeroSection from '../components/pages/ServiceHeroSection'
import Tabs from '../components/pages/Tabs'
import TabContainer from '../components/pages/TabContainer'

export default function ServicePage() {
  return (
    <PageLayout className='mt-14'>
 <TabProvider>
      <div className="min-h-screen flex flex-col items-center">
        <HeroSection />
        <Tabs />
        <TabContainer/>
      </div>
    </TabProvider>
    </PageLayout>
  )
}
