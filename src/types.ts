export type Character = 'Narrator' | 'Chloe' | 'User'

// types

export type Line = {
  id: string
  voice: Character
  line: string
}

export type NarrativeLine = Line

export type LinkLine = Line

export type OptionLine = NarrativeLine & {
  options: Record<string, Line[]>
}

export type Conversation = Line[]

// type guards and utilities

export const isOptionLine = (line: Line): line is OptionLine =>
  line.hasOwnProperty('options')

export const isNarrativeLine = (line: Line): line is NarrativeLine =>
  !isOptionLine(line)

export const isLinkLine = (line: Line): line is LinkLine => /^@/.test(line.line)

export const createNarrativeLine = (option: string): NarrativeLine => ({
  id: option,
  voice: 'User',
  line: option,
})

export const defaultLine: NarrativeLine = {
  id: '0',
  voice: 'Narrator',
  line: '',
}
