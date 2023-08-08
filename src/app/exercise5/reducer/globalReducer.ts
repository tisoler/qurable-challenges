import { ACTIONS } from "../constants"
import { GlobalAction, GlobalState } from "../context/globalContext"
import { Event } from '../types'

const getUpcomingEvents = (events: Event[]) => {
  return events?.filter(e => e.dateTime && new Date(e.dateTime) >= new Date())
}

export function globalReducer(globalState: GlobalState, action: GlobalAction) {
  switch (action.type) {
    case ACTIONS.GET_EVENTS: {
      return {
        ...globalState,
        events: action.events ?? globalState.events,
        isLoading: false,
        isError: false,
      }
    }
    case ACTIONS.UPSERT_EVENT: {
      const event = action.event
      if (!event) return globalState

      const isUpdate = globalState.events?.some(e => e.id === event.id)
      const upcomingEvents = getUpcomingEvents(globalState.events)

      if (isUpdate) {
        return {
          ...globalState,
          events: upcomingEvents?.map(e => {
            if (e.id === event.id) {
              return event
            } else {
              return e
            }
          }),
        }
      } else {
        return {
          ...globalState,
          events: [...globalState.events, event].sort((a, b) => {
            const aDateTime = a.dateTime ? new Date(a.dateTime) : new Date()
            const bDateTime = b.dateTime ? new Date(b.dateTime) : new Date()
            return aDateTime.getTime() - bDateTime.getTime()
          }),
        }
      }
    }
    case ACTIONS.REMOVE_EVENT: {
      const eventId = action.eventId
      const upcomingEvents = getUpcomingEvents(globalState.events)
      if (!eventId) return globalState
      return {
        ...globalState,
        events: upcomingEvents?.filter(e => e.id !== eventId),
      }
    }
    case ACTIONS.UPDATE_USER: {
      const { userId = null, username = null, scope = [], token = '' } = action

      return {
        ...globalState,
        userId,
        username,
        scope,
        token,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
