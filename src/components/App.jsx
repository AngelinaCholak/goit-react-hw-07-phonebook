
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleContacts } from 'redux/contact/selectors';
import { fetchContact } from 'redux/contact/contact.actions';
import PhoneBook from './PhoneBook/PhoneBook';
import css from './App.module.css';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <PhoneBook />
      <Filter />
      {contacts.length > 0 && <Contacts />}
    </div>
  );
};

export default App;