import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


export const fetchContact = createAsyncThunk(
  'contact/get',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        'https://655ce6f925b76d9884fe22dd.mockapi.io/contact'
      );
      return data;
    } catch (err) {
    
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
// Додати новий контакт
export const addContactAsync = createAsyncThunk(
  'contacts/add',
  async (contactData, thunkApi) => {
    try {
      const response = await axios.post(
        'https://655ce6f925b76d9884fe22dd.mockapi.io/contact',
        contactData
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Видалити контакт
export const deleteContactAsync = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkApi) => {
    try {
      await axios.delete(
        `https://655ce6f925b76d9884fe22dd.mockapi.io/contact/${contactId}`
      );
      return contactId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',

  initialState,

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Failed to fetch contacts.');
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      });
  },
});


export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
