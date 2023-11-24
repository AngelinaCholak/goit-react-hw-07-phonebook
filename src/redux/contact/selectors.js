import { createSelector } from '@reduxjs/toolkit/dist';

export const selectContacts = state => state.contactsStore.contacts.items;
export const selectFilter = state => state.contactsStore.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
        contact.phone.toLowerCase().includes(filter.toLowerCase().trim())
    );
  }
);
