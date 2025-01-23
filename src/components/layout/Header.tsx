import { memo } from "react"
import { ParentType } from "../../base/type/CommonType"
import logo from "../../assets/images/logo.png"
import NavBar from "./NavBar"

type HeaderProps=ParentType &{

}

function Header({className}:HeaderProps):JSX.Element {
  let styleclass=`${className} fixed top-0 left-0 w-full px-5 py-2 flex justify-between items-center bg-transparent`
  return (
    <header className={styleclass}>
<img  src={logo} loading="lazy" className="h-12"/>
<NavBar/>
    </header>
  )
}
Header.displayName='Header'
export default memo(Header)
