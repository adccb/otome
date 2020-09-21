import React, { useState, useCallback, useContext, useEffect } from 'react'

import { test } from '../../scripts/'
import Input from '../Input/'
import History from '../History/'
import { ScriptProvider } from '../../ScriptProvider'
import { Conversation, Line, isLinkLine, isNarrativeLine } from '../../types'
import { isOptionLine } from '../../types'
import './index.css'

type AppProps = {
  choose: Function
  linkTo: Function
}

const defaultAppProps: AppProps = {
  choose: () => null,
  linkTo: (id: string) => null,
}

const formatLine = (line: Line): JSX.Element => (
  <p key={line.id}>{`${
    ['Narrator', 'User'].includes(line.voice) ? '' : `${line.voice}: `
  } ${line.line}`}</p>
)

export const App = ({ choose, linkTo } = defaultAppProps) => {
  const { line, conversation } = useContext(ScriptProvider)

  // going to a different script!
  if (isLinkLine(line)) linkTo(line.line.slice(1))

  const jumpToChapter = useCallback(val => console.log(val), [])

  return (
    <div className="app">
      {conversation.map(formatLine)}

      <Input line={line} onClick={choose} />
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

  // the cache of script nodes to display on the screen
  const [conversation, setConversation] = useState<Conversation>([])
  useEffect(() => setConversation([...conversation, step]), [step])

  const choose = (value?: string) => {
    // if the user has chosen an option
    if (value && isOptionLine(step)) {
      // make the choice
      const newScriptNode = step.options[value]

      // update script to the new array, start from step 0
      setScriptNode(newScriptNode)
      setStep(newScriptNode[0])
      setIdx(0)
    } else if (isNarrativeLine(step)) {
      // just go forward in the same node
      const newIdx = idx + 1
      setStep(scriptNode[newIdx] as Line)
      setIdx(newIdx)
    }
  }

  // todo: search through the script
  // and locate the node ids
  // (probably traverse the whole thing
  // and throw them all into a hash?)
  const linkTo = console.log

  return (
    <ScriptProvider.Provider value={{ line: step, conversation }}>
      <App choose={choose} linkTo={linkTo} />
    </ScriptProvider.Provider>
  )
}
