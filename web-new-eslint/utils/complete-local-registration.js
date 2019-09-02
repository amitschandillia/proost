import axios from 'axios';

const completeLocalRegistration = async (token, email, fname, lname, uname, pass, pass2) => {
  const url = '/registration';
  const res = await axios({
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    data: {
      token, email, fname, lname, uname, pass, pass2,
    },
  });
  return (res.data);
};
export default completeLocalRegistration;
