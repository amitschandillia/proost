import axios from 'axios';

import User from '../models/user';

const updateLocalIP = async (req, ip) => {
  let login = {};
  if (ip.length > 7) {
    const url = `https://www.iplocate.io/api/lookup/${ip}`;
    const { data } = await axios.get(url);
    if (data && data.country) {
      if (data.country.length > 3) {
        login = {
          ip: data.ip,
          country: data.country,
          countryCode: data.country_code,
          city: data.city,
          continent: data.continent,
          subdivision: data.subdivision,
          provider: 'local',
        };
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { logins: login } },
          { new: true },
        );
        return updatedUser;
      }
    }
  }
  return null;
};

export default updateLocalIP;
