'use client'

import { useState } from "react"
import { authenticate } from "../../services/user"
import { useGlobalContext } from "../../context/globalContext"
import Spinner from "../spinner"

const Login = ({ onGoBack }: { onGoBack: () => void }) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { saveToken } = useGlobalContext()

  const handleAuthenticate = async() => {
    setIsLoading(true)
    setError('')

    if (username || password) {
      const token = await authenticate({ username, password })

      if (!token) {
        setError('username or password incorrect')
      } else {
        saveToken(token || '')
        onGoBack()
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="w-3/4 flex m-auto items-center justify-around flex-col shadow-md sm:rounded-lg" style={{ height: '60vh' }}>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
        <label className="block uppercase w-full md:w-4/12 tracking-wide text-gray-700 text-sm font-bold mr-2">username:</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="w-full sm:w-11/12 md:w-8/12 flex items-center justify-center flex-col md:flex-row">
        <label className="block uppercase w-full md:w-4/12 tracking-wide text-gray-700 text-sm font-bold mr-2">password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {error && <label className="block tracking-wide text-gray-700 text-sm text-red-500 font-bold mr-2">{error}</label>}
      <div className="w-full sm:w-11/12 md:w-10/12 flex items-center justify-center">
        <button
          className={`bg-${isLoading ? 'gray' : 'blue'}-500 hover:bg-${isLoading ? 'gray' : 'blue'}-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2 flex justify-center items-center`}
          onClick={handleAuthenticate}
        >
          {isLoading ? <Spinner /> : 'Login'}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-11/12 md:w-8/12 h-20 m-2"
          onClick={onGoBack}
        >
          {'< Back'}
        </button>
      </div>
    </div>
  )
}

export default Login
