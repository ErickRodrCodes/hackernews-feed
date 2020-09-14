import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import FrontStory from '../FrontStory'
import ApplicationContext from '../ApplicationContext'
import './index.scss'
const Front = (props) => {
    // const {articlesIds} = props
    const {defaultList} = useContext(ApplicationContext)
    console.log({defaultList})
    return (
        <div className="front">
            {defaultList.map((item,index) => <FrontStory storyId={item} storyIndex={index} key={`storyId_${index}`}/>)}
        </div>
    )
}

Front.defaultProps = {
    articlesIds: Array.apply(null,{length:15}).map(item => {
        return Math.floor(Math.random() * 15000) + 1
    })
}

Front.propTypes = {
    articlesIds: PropTypes.array.isRequired
}

export default Front