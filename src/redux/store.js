import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contact/contact.reducer';

export const store = configureStore({
  reducer: {
    contactsStore: contactsReducer,
  },

});
