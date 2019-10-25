import axios from 'axios';

const shouldBypassLogin = async (pageURL) => {
  const url = '/auth/local/remember';
  const res = await axios({
    method: 'post',
    url,
  });
  if (res.data.success) {
    // Hash authenticated
    window.location = pageURL;
  } else {
    // Hash auth failed
    return false;
  }
  return true;
};

export default shouldBypassLogin;
