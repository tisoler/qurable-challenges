'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Event } from '../../types'
import { useDialogContext } from '../../context/dialogContext'
import { getEvent, upsertEvent } from '../../services/event'
import Spinner from '../spinner'
import { useGlobalContext } from '../../context/globalContext'
import { ACTIONS } from '../../constants'

interface ExerciseTwoProps {
  updateEvent?: Event,
  onSave: () => void,
  onCancel: () => void,
}

const EMPTY_EVENT: Event = {
  name: '',
  description: '',
  dateTime: new Date(),
}

const EventComponent = ({ updateEvent = EMPTY_EVENT, onSave, onCancel }: ExerciseTwoProps) => {
  const [event, setEvent] = useState<Event>(updateEvent)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const { dispatch, globalState } = useGlobalContext()
  const { token } = globalState
  const { openDialog, closeDialog } = useDialogContext()

  useEffect(() => {
    const getEventData = async () => {
      setIsLoading(true)

      if (updateEvent?.id) {
        const res = await getEvent(updateEvent.id)
        if (res) setEvent(res)
      }
      
      setIsLoading(false)
    }

    getEventData()
  }, [updateEvent.id])

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value
    if (value === null || !event) return
    
    setEvent({
      ...event,
      name: value,
    })
  }

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e?.target?.value
    if (value === null || !event) return
    
    setEvent({
      ...event,
      description: value,
    })
  }

  const handleChangeDateTime = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value
    if (!value || !event) return
    
    setEvent({
      ...event,
      dateTime: new Date(value),
    })
  }

  const handleSaveConfirmation = async() => {
    if (!event) return

    setIsLoading(true)
    // create or update event in DB through API
    const eventFromDB = await upsertEvent(event, token)
    // create or update the event in state
    if (eventFromDB) {
      dispatch({
        type: ACTIONS.UPSERT_EVENT,
        event: eventFromDB,
      })
    }
    onSave()
    closeDialog()
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

  const getEditableDateValue = (dateValue: Date) => {
    if (!dateValue) return ''

    const dateTime = new Date(dateValue)
    const year = dateTime.toLocaleDateString("en-US", { year: "numeric" })
		const month = dateTime.toLocaleDateString("en-US", { month: "2-digit" })
		const day = dateTime.toLocaleDateString("en-US", { day: "2-digit" })
		const time = dateTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })

    return `${year}-${month}-${day}T${time}`
	}

  return (
    <div className="w-11/12 md:w-3/4 px-4 md:px-12 flex m-auto items-center justify-around flex-col shadow-md sm:rounded-lg" style={{ height: '90vh' }}>
      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
        {event?.id ? 'Edit event' : 'Add event'}
      </label>
      { isLoading
        ? <Spinner />
        : (
          <>
            <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
              <label className="block w-full md:w-5/12 tracking-wide text-gray-700 text-sm font-bold mr-2">Event name:</label>
              <input
                onChange={handleChangeName}
                value={event?.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
              <label className="block w-full md:w-5/12 tracking-wide text-gray-700 text-sm font-bold mr-2">Description:</label>
              <textarea
                onChange={handleChangeDescription}
                value={event?.description}
                rows={5}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
              <label className="block w-full md:w-5/12 tracking-wide text-gray-700 text-sm font-bold mr-2">Date time:</label>
              <input
                onChange={handleChangeDateTime}
                value={getEditableDateValue(event?.dateTime || new Date())}
                type='datetime-local'
                min={new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )
      }
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
        <button
          className={`bg-${!event?.name || !event.description || !event.dateTime || isLoading ? 'gray' : 'green'}-500 
            ${event?.name && event.description && event.dateTime && !isLoading && 'hover:bg-green-700'} 
            text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-16 md:h-20 m-2 flex justify-center items-center`
          }
          disabled={!event?.name || !event.description || !event.dateTime || isLoading}
          onClick={handleOnSave}
        >
          Save
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-16 md:h-20 m-2"
          onClick={handleOnCancel}
        >
          {'Cancel'}
        </button>
      </div>
    </div>
  )
}

export default EventComponent
