import axios from 'axios';

const loginUser = async (username, password) => {
  const url = '/auth/local';
  const res = await axios({
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    data: { username, password },
  });
  return (res.data);
};

export default loginUser;
