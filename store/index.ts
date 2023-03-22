import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '@store/slices/user-slice';
import metaSlice from './slices/test-slice';
import usersTableSlice from './slices/users-table-slice';


export const store = configureStore({
  reducer: {
    users: usersReducer,
    userTable: usersTableSlice,
    metaData: metaSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
