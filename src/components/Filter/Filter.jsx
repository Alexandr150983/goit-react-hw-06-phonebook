import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <h3>Find contacts by name</h3>
      <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  );
};
