import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import Front from '../Front'
import ModalWindow from '../ModalWindow'
import ApplicationContext from '../ApplicationContext'

const AppWrapper = () => {
    const { isModalOpen } = useContext(ApplicationContext)
    const {defaultList} = useContext(ApplicationContext)
    return (
        <>
            {isModalOpen
                ? (<ModalWindow />)
                : (null) }
            
            <Front articlesIds={defaultList} />
        </>
    )
}

AppWrapper.defaultProps = {
    isModalOpen : false
}

AppWrapper.propTypes = {
    isModalOpen: PropTypes.bool.isRequired
}

export default AppWrapper