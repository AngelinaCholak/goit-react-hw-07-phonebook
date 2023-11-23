import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const contactBaseUrl = 'https://655ce6f925b76d9884fe22dd.mockapi.io/contact';

export const fetchContact = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(contactBaseUrl);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const response = await axios.post(contactBaseUrl, contactData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      await axios.delete(`${contactBaseUrl}/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
