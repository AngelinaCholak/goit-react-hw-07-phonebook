import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import css from './contacts.module.css';
import { selectContacts, selectFilter } from 'redux/contact/selectors';
import { deleteContact, fetchContact } from 'redux/contact/contact.actions';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

   const filteredContacts = () => {
     const items = contacts?.items || []; 
     const filteredItems = items.filter(
       ({ name, phone }) =>
         name.toLowerCase().includes(filter.toLowerCase().trim()) ||
         phone.toLowerCase().includes(filter.toLowerCase().trim())
     );
     return filteredItems;
   };

   const handleDeleteContact = contactId => {
     dispatch(deleteContact(contactId));
   };

  return (
    <div>
      <h2>Contacts</h2>
      {filteredContacts().length > 0 && (
        <ul className={css.contactsList}>
          {filteredContacts().map(contact => (
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
