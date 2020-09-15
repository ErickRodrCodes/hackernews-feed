import React, {useState, useEffect} from 'react'
import './index.scss'
const ModalStoryComment = (props) => {
    const { commentId } = props
    const [commentLoaded, setCommentLoaded] = useState(false)
    const [commentData, setCommentData] = useState({})
    useEffect(() => {
    const callAPI = async () => {
        if (!commentLoaded) {
            const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
            const json = await res.json()
            setCommentData(json)
            setCommentLoaded(true)
          return Promise.resolve(json)  
        }
    }
    
    callAPI()
  },[commentId,setCommentData,setCommentLoaded,commentLoaded])
    console.log({commentData})
    return (<div className="commentContainer" >
        {!commentLoaded
            ? (<>Loading comment...</>)
            : (
                <>
                    <b>{commentData.by}</b> said at {new Date(commentData.time*1000).toLocaleString()}:<br />
                    <div className="commentText">{commentData.text}</div>
                </>
            )
        }
    </div>)
}

export default ModalStoryComment