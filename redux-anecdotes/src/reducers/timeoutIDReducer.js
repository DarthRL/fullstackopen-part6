import { createSlice } from "@reduxjs/toolkit";

const timeoutIDSlice = createSlice({
  name: 'timeoutID',
  initialState: null,
  reducers: {
    setTimeoutID(state, action) {
      return action.payload
    },
    clearTimeoutID(state, action) {
      return null
    }
  }
})

export const {setTimeoutID, clearTimeoutID} = timeoutIDSlice.actions
export default timeoutIDSlice.reducer