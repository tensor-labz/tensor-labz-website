import { AnimatePresence,motion } from 'motion/react'
import React, { memo } from 'react'

function AnimatedMenuBar({open}) {
    return (
      <AnimatePresence>
        {open && (<motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        className='absolute top-20 left-0 w-full h-screen z-20'
        >

        </motion.div>)}
      </AnimatePresence> 
    )
}

export default memo(AnimatedMenuBar)
