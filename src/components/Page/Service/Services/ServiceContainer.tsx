import  { memo } from 'react'
import Pagination from './Pagination'

interface Props {}

function ServiceContainer(props: Props) {
    const {} = props

    return (
        <Pagination totalItems={100} itemsPerPage={10}/>
    )
}

export default memo(ServiceContainer)
