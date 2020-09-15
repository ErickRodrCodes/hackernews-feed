import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import ApplicationContext from '../ApplicationContext'
import './index.scss'
import loading from './loading.svg'
import fetch from 'node-fetch'
const FrontStory = (props) => {
  const {title,paragraph, storyId, setStory, storyIsRead, storyIndex} = props
  const [storyRead, setStoryRead] = useState(storyIsRead)
  const [totalComments, setTotalComments] = useState(0)
  const [loadedData, setLoadedData] = useState(false)
  const [currentIdStory, setCurrentIdStory] = useState(0)
  const {
    setIsModalOpen,
    defaultList,
    setDefaultList,
    mapComments,
    setMapComments,
    setActiveStoryId,
    backupList,
    setBackupList,
    setStoryInfo,
    storyInfo,
  } = useContext(ApplicationContext)
  const [storyData, setStoryData] = useState(null)
 


  useEffect(() => {
    if (!Boolean(storyData)) {
      const fetchStory = async (storyToUse) => {
          if (!loadedData) {
            const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyToUse}.json?print=pretty`)
            const json = await res.json()
            if (json && json.type === 'story') {
              let listOfComments = mapComments;
              let listOfDataStory = storyInfo;
              let listOfKids = Boolean(json.kids) ? json.kids : []
              setCurrentIdStory(json.id)
              setTotalComments(listOfKids.length)
              setStoryData(json)
              listOfDataStory.set(json.id, json)
              setStoryInfo(listOfDataStory)
              listOfComments.set(json.id, listOfKids)
              setMapComments(listOfComments)
              setLoadedData(true)
              return Promise.resolve(json)
            } else {
              console.log({NotAStory:json})
              if (backupList.length) {
                // run a dequeue from the list of arrays,
                // pop from the backup list an item
                console.log({ previousdefaultList: defaultList })
                const newStoryId = backupList.shift();
                console.log({oldStory:storyToUse})
                console.log({newStoryId})
                // then switch the value of the non story to this one
                const idxToReplace = defaultList.indexOf(storyToUse)
                // replace the storyId on the requested index.
                defaultList[idxToReplace] = newStoryId
                setDefaultList(defaultList)
                console.log({ newDefaultList: defaultList })
                setBackupList(backupList)
                fetchStory(newStoryId)   
              }
            }
          }
      }
      if(storyId) fetchStory(storyId)
    }
  }, [storyId, storyData, mapComments, setMapComments, setBackupList, setDefaultList, defaultList, loadedData, backupList, setCurrentIdStory])

    // console.log(props)
    const launchStory = (e) => {
      if (Boolean(storyData)){
        let storyId = e.currentTarget.getAttribute('data-story-id')
        storyId = Number(storyId)
        setIsModalOpen(true)
        setStoryRead(true)
        setActiveStoryId(storyId)
      }
    }
    return (
      <div className={`frontStory ${storyRead ? 'storyRead':''}`}
        onClick={launchStory}
        data-story-id={currentIdStory}
      >
        {loadedData
          ? (<>
            <h4>{storyData.title} - {storyData.type}</h4>
            <div className="footer">
              <h5>{totalComments} Comment{totalComments === 1 ? (<></>) : (<>s</>)}</h5> 
              <span>Posted on {new Date(storyData.time*1000).toLocaleString()}</span>
            </div>
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