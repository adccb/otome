import React from 'react'

import type { Line } from '../../types'
import { isOptionLine, defaultLine } from '../../types'
import './index.css'

type InputProps = {
  line: Line
  onClick: Function
}

const defaultInputProps: InputProps = {
  line: defaultLine,
  onClick: () => null,
}

export const Input = ({ line, onClick } = defaultInputProps) => (
  <div className="Input">
    <ul>
      {isOptionLine(line) ? (
        Object.keys(line.options).map(opt => (
          <li key={opt} onClick={() => onClick(opt)}>
            {opt}
          </li>
        ))
      ) : (
        <li onClick={() => onClick()}>Continue...</li>
      )}
    </ul>
  </div>
)

export default Input
