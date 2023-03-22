import { createSlice } from '@reduxjs/toolkit';
import { getMetaDescription } from '@store/actions/test-actions';

interface MetaDescription {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface MetaDataState {
    metaDescription: MetaDescription[];
    isLoading: boolean;
}

const initialState: MetaDataState = {
    metaDescription: [],
    isLoading: true,
};

const metaSlice = createSlice({
    name: 'test slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMetaDescription.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getMetaDescription.fulfilled, (state, action) => {
            state.metaDescription = action.payload[0];
            state.isLoading = false;
        });
        builder.addCase(getMetaDescription.rejected, (state, action) => {
            state.metaDescription = [];
            state.isLoading = false;
        });
    },
});

export default metaSlice.reducer;
