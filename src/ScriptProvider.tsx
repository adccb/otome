import React from 'react'

import type { Conversation, Line } from './types'
import { defaultLine } from './types'

type Schema = {
  line: Line
  conversation: Conversation
}

export const ScriptProvider = React.createContext<Schema>({
  line: defaultLine,
  conversation: [],
})
