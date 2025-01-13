
type TabItemProps={
item:string,
key:number,
}
export default function TabItem({item,key}:TabItemProps) {
  return (
    <button
    key={index}
    className={`py-2 px-4 text-xs font-bold rounded ${
      activeTab?.slug === tab?.slug || (!activeTab && tab.slug===null)? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
    }`}
    onClick={() => handleTabClick(tab?.slug)}
  >
    {tab?.title}
  </button>
  )
}
