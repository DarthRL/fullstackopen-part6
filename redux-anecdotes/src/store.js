import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"
import notificationReducer from "./reducers/notificationReducer"
import timeoutIDReducer from "./reducers/timeoutIDReducer"

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
    timeoutID: timeoutIDReducer
  }
})

export default store