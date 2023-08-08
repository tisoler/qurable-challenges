'use client'

import React, { createContext, useEffect, useContext, useState, ReactNode, useReducer, Dispatch } from "react"
import jwtDecode from "jwt-decode"
import EventSource from 'eventsource'
import { Event, UserData } from '../types'
import { getUpcomingEvents } from "../services/event"
import { globalReducer } from "../reducer/globalReducer"
import { ACTIONS, PERMISSIONS } from "../constants"

const STREAM_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/stream`
const ssEvents = new EventSource(STREAM_URL, { withCredentials: true })

export interface GlobalState {
  userId: number | null,
  username: string | null,
  events: Event[],
  isLoading: boolean,
  isError: boolean,
  scope: string[],
  token: string,
}

export interface GlobalAction {
  type: string,
  userId?: number | null,
  username?: string | null,
  events?: Event[],
  event?: Event,
  eventId?: number,
  scope?: string[],
  token?: string,
}

const INITIAL_STATE: GlobalState = {
  userId: null,
  username: null,
  events: [],
  isLoading: true,
  isError: false,
  scope: [],
  token: '',
}

interface GlobalContextProps {
  globalState: GlobalState,
  dispatch: Dispatch<GlobalAction>,
  saveToken: (token: string) => void,
  canWriteEvent: () => boolean,
  removeToken: () => void,
}

const GlobalContext = createContext<GlobalContextProps>(undefined as any)

export const useGlobalContext = (): GlobalContextProps => useContext(GlobalContext)

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, dispatch] = useReducer(globalReducer, INITIAL_STATE)

  const saveToken = (token: string) => {
    localStorage.setItem('token', token)
    const userData: UserData = jwtDecode(token)

    dispatch({
      type: ACTIONS.UPDATE_USER,
      userId: userData?.userId,
      username: userData?.username,
      scope: userData.scope,
      token,
    })
  }

  const getToken = (): number | null => {
    const token = localStorage.getItem('token')
    if (!token) return null
    const userData: UserData = jwtDecode(token)

    dispatch({
      type: ACTIONS.UPDATE_USER,
      userId: userData?.userId,
      username: userData?.username,
      scope: userData.scope,
      token,
    })

    return userData?.userId
  }

  const removeToken = () => {
    localStorage.removeItem('token')

    dispatch({
      type: ACTIONS.UPDATE_USER,
      userId: null,
      username: null,
      scope: [],
      token: '',
    })
  }

  useEffect(() => {
    // fetch upcomings events
    const getUpcomingEventsData = async () => {
      const upcomingEvents = await getUpcomingEvents()

      if (upcomingEvents) {
        const sortedEvents = upcomingEvents.sort((a, b) => {
          const aDateTime = a.dateTime ? new Date(a.dateTime) : new Date()
          const bDateTime = b.dateTime ? new Date(b.dateTime) : new Date()
          return aDateTime.getTime() - bDateTime.getTime()
        })
        dispatch({
          type: ACTIONS.GET_EVENTS,
          events: sortedEvents,
        })
      } else {
        // set isLoading to false
        dispatch({
          type: ACTIONS.GET_EVENTS,
        })
      }
    }

    getUpcomingEventsData()
    const userId = getToken()

    // listen to message event
    ssEvents.addEventListener("message", () => {})

    // listen to put event
    ssEvents.addEventListener("put_event", (res) => {
      const data = JSON.parse(res?.data)

      if (userId !== data?.userId) {
        getUpcomingEventsData()
      }
    })

    // listen to delete event
    ssEvents.addEventListener("delete_event", (res) => {
      const data = JSON.parse(res?.data)

      if (userId !== data?.userId) {
        getUpcomingEventsData()
      }
    })

    // listen to open event
    ssEvents.onopen = (e) => {
      console.log(e)
    }

    // listen to error event
    ssEvents.onerror = (e) => {
      console.log(e)
    }

    return () => {
      ssEvents.close()
    }
  }, [])

  const canWriteEvent = (): boolean => {
    return globalState.scope?.includes(PERMISSIONS.WRITE_EVENT)
  }

  return (
    <GlobalContext.Provider value={{ globalState, dispatch, saveToken, removeToken, canWriteEvent, }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
