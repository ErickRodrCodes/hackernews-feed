import React from 'react'
import './index.scss'
import ModalNavigation from '../ModalNavigation'
const ModalStory = (props) => {
    return (
        <>
        <div className="modal-story__container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-story">
                    text to use
            </div>
                <ModalNavigation />
        </div>
            </>
    )
}

export default ModalStory