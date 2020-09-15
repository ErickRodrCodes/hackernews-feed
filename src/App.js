import React, { useState, useEffect } from 'react';
import { ApplicationProvider} from './Components/ApplicationContext';
import AppWrapper from './Components/AppWrapper';
import setListOfTopStories from './Components/ApplicationContext/dataTransform'
import './App.css';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [backupList, setBackupList] = useState([])
  const [unUsedList, setUnusedList] = useState([])
  const [defaultList, setDefaultList] = useState(Array(15).fill(null))
  const [activeStoryId, setActiveStoryId] = useState(0)
  const [mapComments, setMapComments] = useState(new Map())
  const [storyInfo, setStoryInfo] = useState(new Map())
  useEffect(() => {
    setListOfTopStories()
      .then(data => {
        const unusedList = data;
        const initialList = unusedList.slice(0, 15)
        const backupList = unusedList.slice(16,unusedList.length - 1)
        setUnusedList(data)
        setDefaultList(initialList)
        setBackupList(backupList)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  
  
  return (
  
    <>
      <ApplicationProvider value={{
        isModalOpen,
        setIsModalOpen,
        defaultList,
        setDefaultList,
        backupList,
        setBackupList,
        unUsedList,
        setUnusedList,
        activeStoryId,
        setActiveStoryId,
        mapComments,
        setMapComments,
        storyInfo,
        setStoryInfo
      }}>
        <AppWrapper />
      </ApplicationProvider>
    </>  
  ) 
}

export default App;