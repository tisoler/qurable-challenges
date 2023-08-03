'use client'

import { ChangeEvent, useState } from 'react'
import { Event } from '../types'
import { useDialogContext } from '../context/dialogContext'

interface ExerciseTwoProps {
  updateEvent?: Event,
  onSave: (event: Event) => void,
  onCancel: () => void,
}

const EMPTY_EVENT: Event = {
  name: '',
  description: '',
}

const EventComponent = ({ updateEvent, onSave, onCancel }: ExerciseTwoProps) => {
  const [event, setEvent] = useState<Event | undefined>(updateEvent)

  const { openDialog, closeDialog } = useDialogContext()

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value
    if (!value) return
    
    setEvent({
      ...(event || EMPTY_EVENT),
      name: value,
    })
  }

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e?.target?.value
    if (!value) return
    
    setEvent({
      ...(event || EMPTY_EVENT),
      description: value,
    })
  }

  const handleChangeDateTime = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value
    if (!value) return
    
    setEvent({
      ...(event || EMPTY_EVENT),
      dateTime: new Date(value),
    })
  }

  const handleSaveConfirmation = () => {
    closeDialog()
    if (event) onSave(event)
  }

  const handleOnSave = () => {
    openDialog(
      event?.id ? 'Edit event' : 'Add event',
      'Are you sure you want to save the event?',
      handleSaveConfirmation,
      () => closeDialog()
    )
  }

  const handleCancelConfirmation = () => {
    closeDialog()
    onCancel()
  }
  
  const handleOnCancel = () => {
    openDialog(
      event?.id ? 'Edit event' : 'Add event',
      'Are you sure you want to cancel? All changes will be lost.',
      handleCancelConfirmation,
      () => closeDialog()
    )
  }

  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {event?.id ? 'Edit event' : 'Add event'}
      </label>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
        <label className="block uppercase w-full md:w-2/12 tracking-wide text-gray-700 text-xs font-bold mr-2">Event name:</label>
        <input
          onChange={handleChangeName}
          value={event?.name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
        <label className="block uppercase w-full md:w-2/12 tracking-wide text-gray-700 text-xs font-bold mr-2">Description:</label>
        <textarea
          onChange={handleChangeDescription}
          value={event?.description}
          rows={5}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
        <label className="block uppercase w-full md:w-2/12 tracking-wide text-gray-700 text-xs font-bold mr-2">Date time:</label>
        <input
          onChange={handleChangeDateTime}
          value={`${event?.dateTime?.toDateString()}${event?.dateTime?.toTimeString()}`}
          type='datetime-local'
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
        <button
          className={`bg-${!event?.name || !event.description || !event.dateTime ? 'gray' : 'green'}-500 ${event?.name && event.description && event.dateTime && 'hover:bg-green-700'} text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2`}
          disabled={!event?.name || !event.description || !event.dateTime}
          onClick={handleOnSave}
        >
          Save
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
          onClick={handleOnCancel}
        >
          {'Cancel'}
        </button>
      </div>
    </>
  )
}

export default EventComponent
