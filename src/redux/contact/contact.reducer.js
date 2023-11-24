import { createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { addContact, deleteContact, fetchContact } from './contact.actions';

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
    setFilter: (state, action) => {
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
        state.contacts.items = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Failed to fetch contacts.');
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items = [...state.contacts.items, action.payload];
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

// export const { addContact, deleteContact } = contactsSlice.actions;
export const { setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
