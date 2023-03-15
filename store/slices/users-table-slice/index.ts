import { createSlice } from '@reduxjs/toolkit';
import { getUserTableData } from '@store/actions/user-table-actions';

interface TableUsers {
  id: number;
  name: string;
  phone: string;
  address: any;
  company: any;
  email: string;
  username: string;
  website: string;
}

interface State {
  Users: TableUsers[];
  pageSize: number | undefined;
  totalRecords: number | undefined;
  pageNumber: number;
  isLoading: boolean;
}

const initialState: State = {
  Users: [],
  pageSize: 3,
  totalRecords: undefined,
  pageNumber: 1,
  isLoading: true,
};

const userTableSlice = createSlice({
  name: 'User Slice',
  initialState,
  reducers: {
    changePageUserTable: (state, action) => {
      state.pageNumber = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserTableData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserTableData.fulfilled, (state, action) => {
      state.Users = action.payload;
      state.totalRecords = action.payload.length;
      state.isLoading = false;
    });
    builder.addCase(getUserTableData.rejected, (state, action) => {
      state.Users = [];
      state.isLoading = false;
    });
  },
});
export const { changePageUserTable } = userTableSlice.actions;

export default userTableSlice.reducer;
