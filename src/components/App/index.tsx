import React, { useState, useCallback, useContext } from 'react'

import { test } from '../../scripts/'
import Input from '../Input/'
import History from '../History/'
import { ScriptProvider } from '../../ScriptProvider'
import type { Line } from '../../types'
import { isOptionLine, createNarrativeLine } from '../../types'
import './index.css'

type AppProps = {
  choose: Function
}

const defaultAppProps: AppProps = {
  choose: () => null,
}

const formatLine = (line: Line): JSX.Element => (
  <p key={line.id}>{`${
    ['Narrator', 'User'].includes(line.voice) ? '' : `${line.voice}: `
  } ${line.line}`}</p>
)

export const App = ({ choose } = defaultAppProps) => {
  const [conversation, setConversation] = useState<Line[]>([])
  const line = useContext(ScriptProvider)

  const jumpToChapter = useCallback(val => console.log(val), [])

  const handleClick = (option: string) => {
    choose(option)
    const newConversationEntry = [...conversation, line]
    if (option) newConversationEntry.push(createNarrativeLine(option))
    setConversation(newConversationEntry)
  }

  return (
    <div className="app">
      {conversation.map(formatLine)}
      {formatLine(line)}

      <Input line={line} onClick={handleClick} />
      <History onClick={jumpToChapter} />
    </div>
  )
}

// this is so clunky holy shit
export default () => {
  // starting off at zero
  const [idx, setIdx] = useState(0)
  // this is the broader array in config we're iterating through
  const [scriptNode, setScriptNode] = useState(test)
  // this is the individual step in that node
  const [step, setStep] = useState<Line>(scriptNode[idx] as Line)

  const choose = (value?: string) => {
    if (value && isOptionLine(step)) {
      const newScriptNode = step.options[value]
      setScriptNode(newScriptNode)
      setStep(newScriptNode[0])
      setIdx(0)
    } else {
      const newIdx = idx + 1
      setStep(scriptNode[newIdx] as Line)
      setIdx(newIdx)
    }
  }

  return (
    <ScriptProvider.Provider value={step}>
      <App choose={choose} />
    </ScriptProvider.Provider>
  )
}
