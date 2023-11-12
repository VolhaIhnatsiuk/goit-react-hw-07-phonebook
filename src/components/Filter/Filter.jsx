import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/slice';
import { selectFilter } from 'redux/selectors';
import css from './Filter.module.css';

export function Filter() {
  const dispatch = useDispatch();
  const savedFilter = useSelector(selectFilter);

  function filterContacts(evt) {
    const valueFilter = evt.target.value.trim();
    dispatch(setFilter(valueFilter));
  }
  return (
    <div>
      <p className={css.filter}>Find contacts by name</p>
      <input
        className={css.filterInput}
        type="text"
        onChange={filterContacts}
        value={savedFilter}
        name="filter"
      />
    </div>
  );
}