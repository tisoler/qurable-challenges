'use client'

import { useState, MouseEvent } from "react"
import './lobby.css'
import { Event } from '../types'
import EventComponent from "./event"
import { useDialogContext } from "../context/dialogContext"

interface ExerciseTwoProps {
  onGoBack: () => void
}

const l = [
  {id: 1, name: 'event 1', description: 'event desc', dateTime: new Date()},
  {id: 2, name: 'event 2', description: 'event desc 2', dateTime: new Date()},
  {id: 3, name: 'event 3', description: 'event desc 3', dateTime: new Date()},
  {id: 4, name: 'event 4', description: 'event desc', dateTime: new Date()},
  {id: 5, name: 'event 5', description: 'event desc 2', dateTime: new Date()},
  {id: 6, name: 'event 6', description: 'event desc 3', dateTime: new Date()},
  {id: 7, name: 'event 7', description: 'event desc', dateTime: new Date()},
  {id: 8, name: 'event 8', description: 'event desc 2', dateTime: new Date()},
  {id: 9, name: 'event 9', description: 'event desc 3', dateTime: new Date()},
  {id: 10, name: 'event 10', description: 'event desc', dateTime: new Date()},
  {id: 11, name: 'event 12', description: 'event desc 2', dateTime: new Date()},
  {id: 12, name: 'event 13', description: 'event desc 3', dateTime: new Date()},
]

interface EventTableProps {
  list: Event[],
  onEdit: (event: Event) => void
  onDelete: (e: MouseEvent, id: number) => void,
}

const EventTable = ({ list, onEdit, onDelete }: EventTableProps) => {
  return (
    <div className="relative flex items-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-hidden w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="block table-fixed text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="block">
            <th scope="col" className="px-6 py-3 inline-block w-1/2">
              Name
            </th>
            <th scope="col" className="px-6 py-3 inline-block w-1/2">
              Date and time
            </th>
          </tr>
        </thead>
        <tbody className="block table-fixed overflow-y-auto" style={{ height: '55vh' }}>
          {
            list?.map((event: Event) => (
              <tr
                key={event.id}
                onClick={() => onEdit(event)}
                className="block bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              >
                <td scope="row" className=" inline-block w-6/12 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {event.name}
                </td>
                <td className="px-6 py-4 inline-block w-5/12">
                  {`${event.dateTime?.toDateString()} ${event.dateTime?.toLocaleTimeString()}`}
                </td>
                <td className="text-center px-2 py-2 inline-block hover:bg-red-400 text-red-500 hover:text-black rounded w-1/12 text-28">
                  <button onClick={(e) => onDelete(e, event.id || -1)} className="text-2xl bold font-bold">🗑</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const Lobby = ({ onGoBack }: ExerciseTwoProps) => {
  const [eventList, setEventList] = useState<Event[]>(l)
  const [eventId, setEventId] = useState<number | null>()
  const [opeAddEvent, setOpenAddEvent] = useState<boolean>(false)
  const [updateEvent, setUpdateEvent] = useState<Event>()

  const { openDialog, closeDialog } = useDialogContext()


  const handleDeleteEvent = (e: MouseEvent, id: number) => {
    e.stopPropagation()
    if (!id) return
    setEventId(id)
    openDialog("Delete event", "Are you sure you want to remove the event?", handleDeleteEventConfirmation, handleCancelDeleteEvent)
  }

  const handleDeleteEventConfirmation = () => {
    if (!eventId) return
    setEventList([...eventList.filter(e => e.id !== eventId)])
    setEventId(null)
    closeDialog()
  }

  const handleCancelDeleteEvent = () => {
    closeDialog()
  }

  const handleAddEvent = () => {
    setOpenAddEvent(true)
  }

  const handleEditEvent = (event: Event) => {
    setUpdateEvent(event)
    setOpenAddEvent(true)
  }

  const handleSaveEvent = (event: Event) => {
    setEventList([...eventList, event].sort((a, b) => (a.dateTime?.getTime() || new Date().getTime()) - (b.dateTime?.getTime() || new Date().getTime())))
    setUpdateEvent(undefined)
    setOpenAddEvent(false)
  }

  const handleCancel = () => {
    setUpdateEvent(undefined)
    setOpenAddEvent(false)
  }

  if (opeAddEvent) {
    return <EventComponent updateEvent={updateEvent} onSave={handleSaveEvent} onCancel={handleCancel} />
  }

  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Upcoming events
      </label>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center">
        {
          eventList?.length ? (
            <EventTable list={eventList} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
          ) : (
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              There are no scheduled events
            </label>
          )
        }
      </div>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
          onClick={handleAddEvent}
        >
          Add event
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
          onClick={onGoBack}
        >
          {'< Back'}
        </button>
      </div>
    </>
  )
}

export default Lobby
