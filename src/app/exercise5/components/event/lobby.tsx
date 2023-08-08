'use client'

import { useState, MouseEvent } from "react"
import { useRouter } from 'next/navigation'
import './lobby.css'
import { Event } from '../../types'
import EventComponent from "./event"
import { useDialogContext } from "../../context/dialogContext"
import EventTable from "./eventTable"
import EventRegister from "./eventRegister"
import { removeEvent } from "../../services/event"
import { useGlobalContext } from "../../context/globalContext"
import Spinner from "../spinner"
import Login from "../user/login"
import { ACTIONS } from "../../constants"

const Lobby = () => {
  const [opeEventPage, setOpeEventPage] = useState<boolean>(false)
  const [updateEvent, setUpdateEvent] = useState<Event>()
  const [registerEvent, setRegisterEvent] = useState<Event>()
  const [openLogin, setOpeLogin] = useState<boolean>(false)

  const { globalState, dispatch, canWriteEvent, removeToken } = useGlobalContext()
  const { events, isLoading, isError, userId, username, token } = globalState
  const { openDialog, closeDialog } = useDialogContext()

  const router = useRouter()

  const handleRegister = (event: Event) => {
    setRegisterEvent(event)
  }

  const handleEditEvent = (e: MouseEvent, event: Event) => {
    e.stopPropagation()
    setUpdateEvent(event)
    setOpeEventPage(true)
  }
  
  const handleDeleteEventConfirmation = async(idEvent: number) => {
    if (!idEvent) return
    // remove event from DB through API
    await removeEvent(idEvent, token)
    // remove the event from state
    dispatch({
      type: ACTIONS.REMOVE_EVENT,
      eventId: idEvent,
    })
    closeDialog()
  }

  const handleCancelDeleteEvent = () => {
    closeDialog()
  }

  const handleDeleteEvent = (e: MouseEvent, id: number) => {
    e.stopPropagation()
    if (!id) return
    openDialog(
      "Delete event",
      "Are you sure you want to remove the event?",
      () => handleDeleteEventConfirmation(id),
      handleCancelDeleteEvent
    )
  }

  const handleSaveEvent = () => {
    setUpdateEvent(undefined)
    setOpeEventPage(false)
  }

  const handleCancel = () => {
    setUpdateEvent(undefined)
    setOpeEventPage(false)
  }

  const handleAddEvent = () => {
    setOpeEventPage(true)
  }

  const handleRegisterUser = () => {
    setRegisterEvent(undefined)
  }

  const handleLoginLogout = () => {
    if (!userId) setOpeLogin(true)
    else removeToken()
  }

  const getTableContent = () => {
    if (isError) {
      return (
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Some error loading the upcoming events. Please try again.
        </label>
      )
    }

    if (events?.length) {
      return (
        <EventTable list={events} onRegister={handleRegister} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
      )
    } else {
      return (
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          There are no scheduled events
        </label>
      )
    }
  }

  if (opeEventPage) {
    return <EventComponent updateEvent={updateEvent} onSave={handleSaveEvent} onCancel={handleCancel} />
  }

  if (registerEvent) {
    return <EventRegister event={registerEvent} onRegister={handleRegisterUser} onGoBack={() => setRegisterEvent(undefined)} />
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (openLogin) return <Login onGoBack={() => setOpeLogin(false)} />

  return (
    <>
      {userId && username && (
        <div className="absolute right-5 top-5 flex items-center justify-center text-blue-500 w-20">
          Hi {username}!
        </div>
      )}
      <button
        onClick={handleLoginLogout}
        className={`absolute right-5 top-${username ? '10' : '5'} flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-16 h-16 m-2`}
      >
        {userId ? 'logout' : 'login'}
      </button>
      <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
        Upcoming events
      </label>
      <div className="w-full sm:w-11/12 md:w 10/12 mt-20 sm:mt-0 flex items-center justify-center" style={{ height: '60vh' }}>
        {getTableContent()}
      </div>
      <div className="w-full sm:w-11/12 md:w-10/12 flex items-center justify-center">
        { canWriteEvent() && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
            onClick={handleAddEvent}
          >
            Add event
          </button>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
          onClick={() => router.push('/')}
        >
          {'< Back'}
        </button>
      </div>
    </>
  )
}

export default Lobby
