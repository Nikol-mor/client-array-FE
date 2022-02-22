import { useState } from 'react';
import { arrayService } from '../services/arrayService.service';

export const ArrayApp = () => {
  const [numForArray, setNumForArray] = useState('');

  const handleChange = ({ target }) => {
    // === 'number' ? +target.value : target.value
    setNumForArray(target.value);
  };

  const onShowArray = async (ev) => {
    ev.preventDefault();
    console.log(numForArray);
    await arrayService.showArray(numForArray);
  };

  return (
    <section className=''>
      <form onSubmit={onShowArray}>
        <label htmlFor='numberArray'>Enter number</label>
        <input
          onChange={handleChange}
          value={numForArray}
          type='number'
          name='numberArray'
          id='number'
        />
        <button>Show the array</button>
      </form>
    </section>
  );
};
