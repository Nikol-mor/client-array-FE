import { useEffect, useState } from 'react';
import { arrayService } from '../services/arrayService.service';
import { socketService } from '../services/socket.service';
import { ArrayDisplay } from '../cmps/ArrayDisplay';

export const ArrayApp = () => {
  const [numForArray, setNumForArray] = useState('');
  const [arrayToDisplay, setArrayToDisplay] = useState('');

  useEffect(() => {
    (async () => {
      socketService.setup();
      socketService.on('addedArray', (array) => {
        console.log('added to DB', array);
      });
    })();
    return () => {
      setArrayToDisplay('');
      socketService.off('addedArray');
    };
  }, []);

  const handleChange = ({ target }) => {
    // === 'number' ? +target.value : target.value
    setNumForArray(target.value);
  };

  const onShowArray = async (ev) => {
    ev.preventDefault();
    console.log(numForArray);
    let arrayDisplay = await arrayService.showArray(numForArray);
    console.log('array', arrayDisplay);

    socketService.emit('addedArray', arrayDisplay);

    setArrayToDisplay(arrayDisplay.toString());
  };

  return (
    <section className='main-container'>
      <div className='form-container'>
        <form onSubmit={onShowArray}>
          <label htmlFor='numberArray' className='label'>
            Enter number
          </label>
          <input
            onChange={handleChange}
            value={numForArray}
            type='number'
            name='numberArray'
            id='number'
          />
          <button>Show the array</button>
        </form>
      </div>
      <ArrayDisplay arrayToDisplay={arrayToDisplay} />
    </section>
  );
};
