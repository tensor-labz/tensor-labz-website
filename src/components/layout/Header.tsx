import { memo } from "react"
import { ParentType } from "../../base/type/CommonType"


type HeaderProps=ParentType &{

}

function Header({className}:HeaderProps):JSX.Element {
  let styleclass=`${className} sticky top-0 left-0 w-full mt-0`
  return (
    <header className={styleclass}>

    </header>
  )
}
Header.displayName='Header'
export default memo(Header)
