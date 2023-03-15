import { createSlice } from '@reduxjs/toolkit';
import { getTestData } from '@store/actions/test-actions';

interface Test {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface State {
    testData: Test[];
    isLoading: boolean;
}

const initialState: State = {
    testData: [],
    isLoading: true,
};

const testSlice = createSlice({
    name: 'test slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTestData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTestData.fulfilled, (state, action) => {
            state.testData = action.payload[0];
            state.isLoading = false;
        });
        builder.addCase(getTestData.rejected, (state, action) => {
            state.testData = [];
            state.isLoading = false;
        });
    },
});

export default testSlice.reducer;
