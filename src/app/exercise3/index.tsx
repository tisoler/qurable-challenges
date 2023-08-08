'use client'

import { ChangeEvent, useState } from "react"

interface ExerciseTwoProps {
  onGoBack: () => void
}

type Tuple = [number, number]
type MeetingArray = Tuple[]

const ExerciseThree = ({ onGoBack }: ExerciseTwoProps) => {
  const [meetingArray, setMeetingArray] = useState<MeetingArray>([[8,9], [9,10], [9,11], [8.5, 9], [7.5,8.5], [11,12]])
  const [bestSchedule, setBestSchedule] = useState<MeetingArray>()
  const [meeting, setMeeting] = useState<{ start?: number, end?: number }>()
  const [warning, setWarning] = useState<string>()

  const handleChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value
    if (isNaN(value as any)) return
  
    setMeeting({ ...meeting, start: parseFloat(value) })
  }

  const handleChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value
    if (isNaN(value as any)) return

    setMeeting({ ...meeting, end: parseFloat(value) })
  }

  const handleAddTuple = () => {
    setWarning('')
    if (!meeting?.start || !meeting.end) return

    if (meeting.start >= meeting.end) {
      setWarning('End time must be greater than start time.')
      return
    }

    setMeetingArray([
      ...meetingArray,
      [meeting.start, meeting.end]
    ])
    setMeeting({})
  }

  const checkOverlap = (slotA: [number, number], slotB: [number, number]) => {
    return slotA[0] < slotB[1] && slotA[1] > slotB[0]
  }

  const scheduleMeetings = (
    meetingsArray: MeetingArray,
    currentLevel = 0,
    currentSchedule?: MeetingArray,
    bestSchedule?: MeetingArray,
  ): MeetingArray => {
    let newBestSchedule = [...(bestSchedule || [])]

    for (let i = currentLevel; i < meetingsArray.length; i++) {
      let newCurrentSchedule = [...(currentSchedule || [])]

      const currentMeeting = meetingsArray[i]
      if (newCurrentSchedule.some(s => checkOverlap(s, currentMeeting))) continue

      newCurrentSchedule.push(currentMeeting)

      if (newCurrentSchedule.length + (meetingsArray.length - 1 - currentLevel) > newBestSchedule.length) {
        newBestSchedule = scheduleMeetings(meetingsArray, i + 1, newCurrentSchedule, newBestSchedule)
      }

      if (newCurrentSchedule.length > newBestSchedule.length) {
        newBestSchedule = newCurrentSchedule
      }
    }

    return newBestSchedule
  }

  const handleScheduleMeetings = () => {
    if (!meetingArray?.length) return

    const resp = scheduleMeetings(meetingArray)
    setBestSchedule(resp)
  }
  
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Enter a list of meetings with start and end time (e.g. (9,10) - (11,12.5))
      </label>
      <div className="w-full sm:w-11/12 md:w-8/12 flex flex-col">
        <div className="w-full flex items-center justify-center">
          {'('}
          <input
            type="number"
            className="shadow appearance-none border rounded w-2/12 sm:w-1/12 py-2 px-3 m-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChangeStart}
            value={meeting?.start || ''}
          />
          {','}
          <input
            type="number"
            className="shadow appearance-none border rounded w-2/12 sm:w-1/12 py-2 px-3 m-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChangeEnd}
            value={meeting?.end || ''}
          />
          {')'}
          <button
            className={`bg-${!meeting?.start || !meeting.end ? 'gray' : 'green'}-500 ${meeting?.start && meeting.end && 'hover:bg-green-700'} text-white font-bold ml-4 py-2 px-4 rounded w-3/12 sm:w-2/12 h-20 m-2`}
            disabled={!meeting?.start || !meeting.end}
            onClick={handleAddTuple}
          >
            Add tuple
          </button>
          <button
            className={`bg-${!meetingArray.length ? 'gray' : 'green'}-500 ${meetingArray?.length && 'hover:bg-green-700'} text-white font-bold ml-4 py-2 px-4 rounded w-3/12 sm:w-2/12 h-20 m-2`}
            disabled={!meetingArray?.length}
            onClick={() => setMeetingArray([])}
          >
            Clean
          </button>
        </div>
        {warning && <label className="block w-full text-center text-red-500 text-xs font-bold">{warning}</label>}
      </div>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center">
        <label className="block uppercase w-2/12 tracking-wide text-gray-700 text-xs font-bold mr-2">Meetings:</label>
        <input
          value={meetingArray?.map((t: Tuple) => (`(${t})`)).join(',') || ''}
          disabled
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        className={`bg-${!meetingArray?.length ? 'gray' : 'green'}-500 ${meetingArray?.length && 'hover:bg-green-700'} text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2`}
        disabled={!meetingArray?.length}
        onClick={handleScheduleMeetings}
      >
        Schedule meetings!
      </button>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center">
        <label className="block uppercase tracking-wide w-2/12 text-gray-700 text-xs font-bold mr-2">Best schedule:</label>
        <input
          value={bestSchedule?.sort((a: Tuple, b: Tuple) => a[0] - b[0]).map((t: Tuple) => (`(${t})`)).join(',') || ''}
          disabled
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
        onClick={onGoBack}
      >
        {'< Back'}
      </button>
    </>
  )
}

export default ExerciseThree
