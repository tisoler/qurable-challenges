'use client'

import { ChangeEvent, useState } from "react"

interface ExerciseTwoProps {
  onGoBack: () => void
}

const ExerciseTwo = ({ onGoBack }: ExerciseTwoProps) => {
  const [list, setList] = useState<string>('')
  const [sortedList, setSortedList] = useState<number[]>([])

  const handleUpdateList = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value
    setList(value)
  }

  const handleSort = () => {
    const listString = list?.replace(/\s/g, '')?.split(',')
    const listNumbers = listString?.filter(s => s && !isNaN(s as any))?.map(n => parseFloat(n)) || []

    for (let i=0; i < listNumbers.length; i++) {
      for (let j=i+1; j < listNumbers.length; j++) {
        if (listNumbers[i] > listNumbers[j]) {
          const least = listNumbers[j]
          listNumbers[j] = listNumbers[i]
          listNumbers[i] = least
        }
      }
    }
    setSortedList(listNumbers)
  }

  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Enter a comma separated list of numbers (e.g. 3,2,1,5,4)
      </label>
      <input
        value={list}
        onChange={handleUpdateList}
        placeholder="Enter list here"
        className="shadow appearance-none border rounded w-4/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        className={`bg-${!list ? 'gray' : 'green'}-500 ${list && 'hover:bg-green-700'} text-white font-bold py-2 px-4 rounded w-4/12 h-20 m-2`}
        disabled={!list}
        onClick={handleSort}
      >
        Sort!
      </button>
      <div className="w-8/12 md:flex md:items-center justify-center">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mr-2">Sorted list:</label>
        <input
          value={sortedList.join(',') || ''}
          disabled
          className="shadow appearance-none border rounded w-7/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-4/12 h-20 m-2"
        onClick={onGoBack}
      >
        {'< Back'}
      </button>
    </>
  )
}

export default ExerciseTwo
