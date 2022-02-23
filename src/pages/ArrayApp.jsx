import { useEffect, useState } from 'react';
import { arrayService } from '../services/arrayService.service';
import { socketService } from '../services/socket.service';
import { ArrayDisplay } from '../cmps/ArrayDisplay';

export const ArrayApp = () => {
  const [numForArray, setNumForArray] = useState('');
  const [arrayToDisplay, setArrayToDisplay] = useState('');
  const [userMsg, setUserMsg] = useState(null);

  let timeoutId;

  useEffect(() => {
    (async () => {
      socketService.setup();
      socketService.on('addedArray', (array) => {
        console.log('other user added array to DB', array);
        timeoutId = setTimeout(() => {
          setUserMsg('success');
        }, 2500);
      });
    })();
    return () => {
      setArrayToDisplay('');
      if (timeoutId) clearTimeout(timeoutId);
      setUserMsg(null);
      socketService.off('addedArray');
    };
  }, []);

  const handleChange = ({ target }) => {
    setNumForArray(target.value);
  };

  const onShowArray = async (ev) => {
    ev.preventDefault();
    try {
      let arrayDisplay = await arrayService.showArray(numForArray);

      socketService.emit('addedArray', arrayDisplay);

      setArrayToDisplay(arrayDisplay.toString());
    } catch (err) {
      console.log('error');
    }
  };

  return (
    <section className='main-container'>
      <div className='form-container'>
        <form onSubmit={onShowArray}>
          <label htmlFor='numberArray' className='label'>
            Enter number
          </label>
          <input
            min='1'
            max='1000'
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
      <div className={`user-msg ${userMsg}`}>
        {userMsg === 'success' ? (
          <div>
            A new array has been added to DB by other user
            <button
              onClick={() => {
                clearTimeout(timeoutId);
                setUserMsg(null);
              }}>
              X
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  );
};
