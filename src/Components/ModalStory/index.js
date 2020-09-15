import React, { useContext, useState, useEffect } from 'react'
import './index.scss'
import ModalNavigation from '../ModalNavigation'
import ApplicationContext from '../ApplicationContext'
import ModalStoryComment from '../ModalStoryCommment'

const ModalStory = (props) => {
  const { activeStoryId , storyInfo } = useContext(ApplicationContext)
  const { url, kids, title, by, time } = storyInfo.get(activeStoryId)
  const [isCommentsLoaded, setIsCommentsLoaded] = useState(false)
  const [comments, setComments] = useState([])
  
  const CommentComponent = (props) => {
    const { id, time, text, by } = props.data
      return (
        <div className="comment" data-commentid={id} key={`comment-${id}`}>
          <p><b>{by}</b> at {time}:</p>
          <p>{text}</p>
        </div>
      )
  }

  return (
    <>
    <div className="modal-story__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-story">
          <h3>Posted By {by} - {title}</h3>
          <iframe className="modal-story-frame" title="storyname" src={url}></iframe>
          <p>Posted on {new Date(time*1000).toLocaleString()}</p>
          <div>Cannot see it? <a href={url} target="_blank" rel="noopener noreferrer">Click here</a></div>
          <h3>Comments</h3>
          <div class="modal-story__comments">
            {kids.map((item, key) => <ModalStoryComment commentId={item} key={`comment-${item}`} />)}
          </div>
      </div>
      <ModalNavigation />
    </div>
    </>
  )
}

export default ModalStory