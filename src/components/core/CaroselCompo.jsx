import React, { useReducer } from 'react'
import { CarouselButton } from './Buttons'

const ACTION={
    NEXT:'next',
    PREV:'prev'
}
const reducer=(state,action)=>{
    switch(action.type){
case ACTION.NEXT:return state<action.length?state++:1
case ACTION.NEXT:return state>1?state--:action.length
default: return state
    }
}
export default function CaroselCompo({FrameComponent,width='max-w-screen-xl',height="h-auto",enabledIndicator=true,enableManualBtb}) {
const [currentSlide,setcurrentSlide]=useReducer(reducer,0)
  return (
    <div className={`relative ${width}  mx-auto overflow-hidden ${height}`}>
        <h1>fgdgdgdgd</h1>
<CarouselButton type='prev' horizontal='left-0'/>
<CarouselButton/>
      {enabledIndicator&&<Indicator onClick={()=>{}} data={[]} activeIndex={0}/>}
    </div>
  )
}


export function Indicator({
    data,
    activeIndex,
    onClick,
    container={position:'absolute',vertical:'bottom-2',horizontal:'left-1/2',space:'space-x-3',width:'w-auto'},
indicator={height:"h-2",width:"w-2",bg:"bg-green-100",active:{width:"w-3",bg:"bg-green-800"}}
}){
    return(
        <div className={`${container?.position+" "+container?.vertical+" "+container?.horizontal+" "+container?.space+" "+container?.width} sm:hidden transform -translate-x-1/2 flex`}>
        {data.map((_, index) => (
          <span
            onClick={onClick}
            key={index}
            className={`transition-all duration-300 ease-in-out ${indicator?.height} ${activeIndex - 1 === index ? `${indicator.active.width+" "+indicator.active.bg} rounded-3xl  scale-125 shadow-lg ` : `${indicator.width+" "+indicator.bg}  rounded-full`}`}
          ></span>
        ))}
      </div>
    )
}