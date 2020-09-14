import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import ApplicationContext from '../ApplicationContext'
import './index.scss'
import loading from './loading.svg'
import fetch from 'node-fetch'
const FrontStory = (props) => {
  const {title,paragraph, storyId, storyIsRead, storyIndex} = props
  const [storyRead, setStoryRead] = useState(storyIsRead)
  const {setIsModalOpen, defaultList } = useContext(ApplicationContext)
  const [storyData, setStoryData] = useState(null)
  

  // ifdefaultList[storyIndex]
  useEffect(() => {
    if (!Boolean(storyData)) {
      const fetchStory = async () => {
        if (storyId !== null) {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
          const json = await res.json()
          if (json.type === 'story') {
            setStoryData(json)
            return Promise.resolve(json)
          } else {
            //run a dequeue from the list of arrays, and replace the storyId on the requested index.
          }
        }
        return null
      }
      fetchStory()
    }
  }, [storyId, storyData])

    // console.log(props)
    const launchStory = (e) => {
      if (Boolean(storyData)){
        console.log(e.currentTarget.getAttribute('data-story-id'))
        setIsModalOpen(true)
        setStoryRead(true)
      }
    }
    return (
      <div className={`frontStory ${storyRead ? 'storyRead':''}`}
        onClick={launchStory}
        data-story-id={storyId}
      >
        {Boolean(storyData)
          ? (<>
            <p>{storyData.title} - {storyData.type}</p>
          </>)
          : (
            <>
              <img src={loading} alt="loading..." />
            </>
        )}
      </div>
    )
}

FrontStory.defaultProps = {
  storyId: 1,
  storyIsRead: false,
  title: "My Default Title",
  paragraph:"my default paragraph"
}

FrontStory.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired
}

export default FrontStory