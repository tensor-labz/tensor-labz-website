import React from 'react';
import { useTabs } from '../../hooks/useTab';
import services from './../../data/Data_Services';


const Tabs = () => {
  const { activeTab, handleTabClick, tabs } = useTabs([{title:"All",slug:null},...services]);

  return (
    <div className="flex justify-start space-x-4 mt-4">

      {tabs.map((tab,index) => (
        <button
          key={index}
          className={`py-2 px-4 text-xs font-bold rounded ${
            activeTab?.slug === tab?.slug || (!activeTab && tab.slug===null)? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => handleTabClick(tab?.slug)}
        >
          {tab?.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;