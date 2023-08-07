
import { MouseEvent } from "react"
import { Event } from '../../types'
import { useGlobalContext } from "../../context/globalContext"

interface EventTableProps {
  list: Event[],
  onRegister: (event: Event) => void,
  onEdit: (e: MouseEvent, event: Event) => void,
  onDelete: (e: MouseEvent, id: number) => void,
}

const EventTable = ({ list, onRegister, onEdit, onDelete }: EventTableProps) => {
  const { canWriteEvent } = useGlobalContext()
  const isCreator = canWriteEvent()

  return (
    <div className="relative flex items-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-hidden w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="block table-fixed text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="block">
            <th scope="col" className="px-6 py-3 inline-block w-5/12">
              Name
            </th>
            <th scope="col" className="px-6 py-3 inline-block w-7/12">
              Date and time
            </th>
          </tr>
        </thead>
        <tbody className="block table-fixed overflow-y-auto" style={{ height: '55vh' }}>
          {
            list?.map((event: Event) => (
              <tr
                key={event.id}
                onClick={() => onRegister(event)}
                className="block bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              >
                <td scope="row" className=" inline-block w-5/12 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {event.name}
                </td>
                <td className={`px-6 py-4 inline-block w-${isCreator ? 5 : 7}/12`}>
                  {event?.dateTime ? `${new Date(event.dateTime).toDateString()} ${new Date(event.dateTime).toLocaleTimeString()}` : ''}
                </td>
                { isCreator && (
                  <>
                    <td className="text-center inline-block hover:bg-blue-400 text-blue-500 hover:text-black rounded w-1/12 text-28">
                      <button onClick={(e) => onEdit(e, event)} className="text-2xl bold font-bold w-full h-full p-2">
                        🖉
                      </button>
                    </td>
                    <td className="text-center inline-block hover:bg-red-400 text-red-500 hover:text-black rounded h-full w-1/12 text-28">
                      <button onClick={(e) => onDelete(e, event.id || -1)} className="text-2xl bold font-bold w-full h-full p-2">
                        🗑
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default EventTable
