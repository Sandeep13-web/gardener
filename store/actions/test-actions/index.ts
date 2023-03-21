import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTestData = createAsyncThunk('testData', async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/albums/1/photos`
  );
  return response.data;
});

export const getMetaDescription = createAsyncThunk<any, any>(
  'meta-description',
  async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/albums/1/photos'
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
