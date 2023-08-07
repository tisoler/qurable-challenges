import { Event, Registration } from '../types'

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`

export const getUpcomingEvents = async (): Promise<Event[] | null> => {
  try {
    const res = await fetch(`${API_URL}/event/upcoming`)
    if (res.status !== 200) {
      return null
    }
    const events = await res.json()

    return events
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const getEvent = async (id: number): Promise<Event | null> => {
  try {
    const res = await fetch(`${API_URL}/event/${id}`)
    if (res.status !== 200) {
      return null
    }
    const event = await res.json()

    return event
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const upsertEvent = async (payload: Event, token: string): Promise<Event | null> => {
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || '',
      },
    }

    const res = await fetch(`${API_URL}/event`, requestOptions)
    if (res.status !== 200) {
      return null
    }
    const event = await res.json()

    return event
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const removeEvent = async (idEvent: number, token: string): Promise<boolean> => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token || '',
      },
    }

    const res = await fetch(`${API_URL}/event/${idEvent}`, requestOptions)

    if (res.status !== 200) {
      return false
    }

    return true
  } catch (e) {
    console.log(`error: ${e}`)
    return false
  }
}

export const registerUser = async (payload: Registration): Promise<Registration | null> => {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    }

    const res = await fetch(`${API_URL}/event/register`, requestOptions)
    if (res.status !== 200) {
      return null
    }
    const event = await res.json()

    return event
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
