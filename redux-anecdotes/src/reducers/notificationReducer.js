import { createSlice } from "@reduxjs/toolkit";
import { clearTimeoutID, setTimeoutID } from "./timeoutIDReducer";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    deleteNotification(state, action) {
      return null
    }
  }
})

export const {createNotification, deleteNotification} = notificationSlice.actions

export const setNotification = (content, timer) => {
  return async (dispatch, getState) => {
    if(getState().timeoutID !== null) {
      clearTimeout(getState().timeoutID)
      dispatch(clearTimeoutID())
    }
    dispatch(createNotification(content))
    const timeoutID = setTimeout(() => {
      dispatch(deleteNotification())
    }, timer * 1000)
    dispatch(setTimeoutID(timeoutID))
  }
}

export default notificationSlice.reducer