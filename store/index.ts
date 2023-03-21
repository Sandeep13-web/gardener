import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

import usersReducer from '@store/slices/user-slice';
import { createWrapper } from 'next-redux-wrapper';
import testSlice from './slices/test-slice';
import usersTableSlice from './slices/users-table-slice';

export const store: any = configureStore({
  reducer: {
    users: usersReducer,
    userTable: usersTableSlice,
    testData: testSlice,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
