import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTestData = createAsyncThunk(
    'testData',
    async () => {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/albums/1/photos`
        );
        return response.data;
    }
);
