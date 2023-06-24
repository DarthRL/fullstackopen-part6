import { createSlice } from "@reduxjs/toolkit";

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
  return async dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, timer * 1000)
  }
}

export default notificationSlice.reducer