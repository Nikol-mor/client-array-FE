import { httpService } from './http.service';

export const arrayService = {
  showArray,
};

async function showArray(number) {
  console.log('number we got', number);
  try {
    const array = await httpService.post('clientArray', { number });
    console.log('array we got from BE', array);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
