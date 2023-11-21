import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContact } from 'redux/contact/contact.reducer';
import PropTypes from 'prop-types';
import css from './contacts.module.css';
import { selectContacts, selectFilter } from 'redux/contact/selectors';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const filteredContacts =
    contacts && filter
      ? contacts.filter(
          contact =>
            contact.name &&
            contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <h2>Contacts</h2>
      {filteredContacts && filteredContacts.length > 0 && (
        <ul className={css.contactsList}>
          {filteredContacts.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button
                className={css.deleteButton}
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default Contacts;
