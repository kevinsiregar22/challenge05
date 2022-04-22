import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {BOOKS_API} from '../../src/helpers/baseAPI';
import {dummyBooks} from '../../src/helpers/dummyres/DummyBooks';

describe('API', () => {
  it('API LIST BOOKS', async () => {
    let mock = new MockAdapter(axios);
    mock.onPost(`http://code.aldipee.com/api/v1/books`).reply(200, dummyBooks);

    //act
    let res = await axios.post(`${BOOKS_API}`);
    expect(res.data).toEqual(dummyBooks);
    expect(res.status).toEqual(200);
  });
});
