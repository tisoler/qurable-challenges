
import { Event } from '../../types'
import { useDialogContext } from '../../context/dialogContext'
import { getEvent, registerUser } from '../../services/event'
import { useEffect, useState } from 'react'
import Spinner from '../spinner'
import { useGlobalContext } from '../../context/globalContext'

interface ExerciseTwoProps {
  event: Event,
  onRegister: () => void,
  onGoBack: () => void,
}

const EventRegister = ({ event, onRegister, onGoBack }: ExerciseTwoProps) => {
  const [eventData, setEventData] = useState<Event>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fullname, setFullname] = useState<string>('')

  const { openDialog, closeDialog } = useDialogContext()

  useEffect(() => {
    const getEventData = async () => {
      setIsLoading(true)

      if (!event.id) return
      const res = await getEvent(event.id)
      if (res) setEventData(res)
      
      setIsLoading(false)
    }

    getEventData()
  }, [event.id])

  const handleConfirmRegistration = async() => {
    if (!event.id) return
    await registerUser({ fullname, idEvent: event.id })
    closeDialog()
    if (eventData?.id) onRegister()
  }

  const handleRegister = () => {
    openDialog(
      'Event registration',
      `Do you confirm your registration to the event: ${eventData?.name}?`,
      handleConfirmRegistration,
      () => closeDialog()
    )
  }

  return (
    <div className="w-11/12 md:w-3/4 px-4 lg:px-16 flex m-auto items-center justify-around flex-col shadow-md sm:rounded-lg" style={{ height: '90vh' }}>
      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
        Event details
      </label>
      { isLoading || !eventData
        ? <Spinner />
        : (
          <>
            <div className="w-full flex items-center justify-center flex-col md:flex-row">
              <label className="block w-full md:w-5/12 tracking-wide text-gray-700 text-sm font-bold mr-2">Event name:</label>
              <label className="block w-full tracking-wide text-gray-700 text-md">
                {eventData.name}
              </label>
            </div>
            <div className="w-full flex items-center justify-center flex-col md:flex-row">
              <label className="block w-full md:w-5/12 tracking-wide text-gray-700 text-sm font-bold mr-2">Event descripton:</label>
              <label className="block w-full tracking-wide text-gray-700 text-md">
                {eventData.description}
              </label>
            </div>
            <div className="w-full flex items-center justify-center flex-col md:flex-row">
              <label className="block w-full md:w-5/12 tracking-wide text-gray-700 text-sm font-bold mr-2">Event descripton:</label>
              <label className="block w-full tracking-wide text-gray-700 text-md">
                {eventData?.dateTime ? `${new Date(eventData.dateTime).toLocaleDateString()} ${new Date(eventData.dateTime).toLocaleTimeString()}` : ''}
              </label>
            </div>
            <div className="w-full flex items-center justify-center flex-col md:flex-row">
              <label className="block w-full md:w-5/12 tracking-wide text-gray-700 text-sm font-bold mr-2">Current attendance:</label>
              <label className="block w-full tracking-wide text-gray-700 text-md">
                {eventData?.attendance || 0}
              </label>
            </div>
            <div className="w-full flex items-center justify-center flex-col md:flex-row">
              <label className="block w-full md:w-5/12 tracking-wide text-gray-700 text-sm font-bold mr-2">Enter your full name:</label>
              <input
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )
      }
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
        <button
          className={`bg-${fullname ? 'green' : 'gray'}-500 hover:bg-${fullname ? 'green' : 'gray'}-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-16 md:h-20 m-2`}
          onClick={handleRegister}
          disabled={!fullname}
        >
          Register me!
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-16 md:h-20 m-2"
          onClick={onGoBack}
        >
          {'< Back'}
        </button>
      </div>
    </div>
  )
}

export default EventRegister
