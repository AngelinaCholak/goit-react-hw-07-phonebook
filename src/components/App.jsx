
import React from 'react';
import PhoneBook from './PhoneBook/PhoneBook';
import css from './App.module.css';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

export const App = () => {
  return (
    <div className={css.container}>
      <PhoneBook />
      <Filter />
      <Contacts />
    </div>
  );
};

export default App;
