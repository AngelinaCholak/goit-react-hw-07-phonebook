import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import css from './contacts.module.css';
import { selectVisibleContacts } from 'redux/contact/selectors';
import { deleteContact } from 'redux/contact/contact.actions';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <h2>Contacts</h2>
      <ul className={css.contactsList}>
        {contacts.map(contact => (
          <li key={contact.id}>
            <div>
              <span>
                {contact.name}: {contact.phone}
              </span>
              <button
                className={css.deleteButton}
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
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
