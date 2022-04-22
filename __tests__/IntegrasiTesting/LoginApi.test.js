import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LOGIN_API} from '../../src/helpers/baseAPI';
import {dataLogin} from '../../src/helpers/dummyres/DummyLogin';

describe('API', () => {
  it('API LOGIN', async () => {
    let mock = new MockAdapter(axios);
    const body = {
      email: 'siregar25v@gmail.com',
      password: 'siregar25',
    };
    mock
      .onPost(`http://code.aldipee.com/api/v1/auth/login`)
      .reply(200, dataLogin);

    //act
    let res = await axios.post(`${LOGIN_API}`, body);
    expect(res.data).toEqual(dataLogin);
    expect(res.status).toEqual(200);
  });
});
