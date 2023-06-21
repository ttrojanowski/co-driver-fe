import { configureStore } from '@reduxjs/toolkit'
import { localStorageApi } from './configurationApi'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [localStorageApi.reducerPath]: localStorageApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of `rtk-query`
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageApi.middleware),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch