import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contact/contact.reducer';
import { nanoid } from 'nanoid';
import css from './PhoneBook.module.css';
import { GoPersonAdd } from 'react-icons/go';

export const PhoneBook = () => {
  const dispatch = useDispatch();
  const selectContacts = state => state.contactsStore.contacts;
  const contacts = useSelector(selectContacts);
  
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const hasDuplicates = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (hasDuplicates) {
      alert(`Oops, contact with name '${name}' already exists!`);
      return;
    }

    dispatch(addContact({ name, number, id: nanoid() }));
    setName('');
    setNumber('');
  };
  return (
    <form className={css.phoneBookForm} onSubmit={handleSubmit}>
      <h1>Phonebook</h1>
      <div className={css.inputContainer}>
        <h2>Name</h2>
        <input
          className={css.phoneBookInput}
          type="text"
          name="name"
          required
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.inputContainer}>
        <h2>Number</h2>
        <input
          className={css.phoneBookInput}
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <button type="submit" className={css.phoneBookButton}>
        <GoPersonAdd className={css.SearchFormButtonLabel} size={20} />
        Add contact
      </button>
    </form>
  );
};
export default PhoneBook;
