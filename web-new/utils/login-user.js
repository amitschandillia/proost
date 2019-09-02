import axios from 'axios';

const loginUser = async (
  username,
  password,
  remember,
  pageURL,
) => {
  const url = '/auth/local';
  const res = await axios({
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    data: { username, password, remember },
  });
  if (res.data.success) {
    // Login successful
    window.location = pageURL;
  } else {
    // Login failed
    return false;
  }
  return true;
};

export default loginUser;
