import React, { useCallback } from 'react'

import Input from '../Input/'
import History from '../History/'
import './index.css'

export const App = () => {
  const options = ['hi', 'hello', 'how are you']
  const chooseDialog = useCallback(val => console.log(val), [])
  const jumpToChapter = useCallback(val => console.log(val), [])

  return (
    <div className="app">
      <Input options={options} onClick={chooseDialog} />
      <History onClick={jumpToChapter} />
    </div>
  )
}

export default App
