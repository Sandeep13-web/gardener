import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMetaDescription = createAsyncThunk(
  'metaDescription',
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
