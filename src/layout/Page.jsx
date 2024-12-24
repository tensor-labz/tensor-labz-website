import React, { memo } from 'react'
import { motion } from "motion/react"
function Page({children}) {
    return (
        <motion.div initial={{width:0}} animate={{width:"100%"}} exit={{x:window.innerWidth}} transition={{ duration: 0.3, delay: 0.8, ease: "ease-in-out" }}>

{children}
        </motion.div>
    )
}

export default memo(Page)
