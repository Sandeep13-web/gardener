import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '@store/slices/user-slice';
import usersTableSlice from './slices/users-table-slice';
import testSlice from './slices/test-slice';


export const store = configureStore({
  reducer: {
    users: usersReducer,
    userTable: usersTableSlice,
    testData: testSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
