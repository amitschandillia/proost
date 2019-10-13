import axios from 'axios';

const signUpEmail = async (to) => {
  const url = '/mail';
  const res = await axios({
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    data: { to },
  });
  return (res.data);
};
export default signUpEmail;
