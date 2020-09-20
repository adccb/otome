import React from 'react'

import './index.css'

type HistoryProps = {
  onClick: Function
}

const defaultHistoryProps: HistoryProps = {
  onClick: () => null,
}

export const History = ({ onClick } = defaultHistoryProps) => {
  return (
    <aside className="History">
      <ul>
        {[].map(chapter => (
          <li key={chapter} onClick={() => onClick(chapter)}>
            {chapter}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default History
