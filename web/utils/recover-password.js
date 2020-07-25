import axios from 'axios';

const recoverPassword = async (to) => {
//   const url = '/mail';
//   const res = await axios({
//     method: 'post',
//     url,
//     headers: { 'Content-Type': 'application/json; charset=UTF-8' },
//     data: { to },
//   });
//   return (res.data);

    return({
        verify: false,
        signin: true,
        ewarn: null,
    });
};
export default recoverPassword;
