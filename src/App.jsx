import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from './redux/contactsSlice';
import { setFilter } from './redux/filterSlice';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);

  const addContactToStore = contact => {
    dispatch(addContact(contact));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContactToStore} />
      <h2>Contacts</h2>
      <Filter setFilter={value => dispatch(setFilter(value))} filter={filter} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
