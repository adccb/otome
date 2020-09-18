import React from 'react'

import './index.css'

type InputProps = {
  options: string[]
  onClick: Function
}

const defaultInputProps: InputProps = {
  options: [],
  onClick: () => null,
}

export const Input = ({ options, onClick } = defaultInputProps) => (
  <div className="Input">
    <ul>
      {options.map(opt => (
        <li key={opt} onClick={() => onClick(opt)}>
          {opt}
        </li>
      ))}
    </ul>
  </div>
)

export default Input
