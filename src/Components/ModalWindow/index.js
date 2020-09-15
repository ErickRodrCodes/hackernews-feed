import React, { useContext, useState, use } from 'react'
import ModalStory from '../ModalStory'
import PropTypes from 'prop-types'
import './index.scss'
import ApplicationContext from '../ApplicationContext'

const ModalWindow = (props) => {
    const { isModalOpen, setIsModalOpen } = useContext(ApplicationContext)
    const closeModal = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsModalOpen(false)
    }

    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal-close" onClick={closeModal}>X</div>
            <ModalStory />
        </div>
    )
}

ModalWindow.defaultProps = {
    isModalOpen: false,
    setIsModalOpen: (shut)=> { console.log (shut)}
}

ModalWindow.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired
}

export default ModalWindow