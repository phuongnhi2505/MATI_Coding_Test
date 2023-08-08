import { configureStore  } from "@reduxjs/toolkit"
import dateOfWeekReducer from '../Pages/Board/DateOfWeekBoardSlice'

export const store = configureStore({
    reducer: {
      dateOfWeek: dateOfWeekReducer,
    },
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch