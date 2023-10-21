import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ContactList.styled';
import { deleteContact } from 'redux/contactsSlice';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(contact => {
    const contactName = contact.name.toLowerCase();
    const filterValue = filter.toLowerCase();
    return contactName.includes(filterValue);
  });

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}{' '}
          <Button onClick={() => handleDeleteContact(id)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
};
