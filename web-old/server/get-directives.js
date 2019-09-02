import dotenv from 'dotenv';

dotenv.config();

const getDirectives = () => {
  const self = '\'self\'';
  const unsafeInline = '\'unsafe-inline\'';
  const scripts = [
    '*.google-analytics.com',
  ];
  const images = [
    '*.google-analytics.com',
    'data:',
    `i.${process.env.THIS_DOMAIN}.com`,
  ];
  const styles = [
    // `https://fonts.googleapis.com/`,
    // `https://platform.twitter.com/`
  ];
  const connect = [
    `dev.${process.env.THIS_DOMAIN}.com`,
    `i.${process.env.THIS_DOMAIN}.com`,
  ];
  const frames = [
    'https://www.youtube.com/',
    'https://player.vimeo.com/',
    'https://syndication.twitter.com/',
  ];
  const fonts = [
    'https://fonts.gstatic.com/',
  ];

  return {
    upgradeInsecureRequests: true,
    defaultSrc: [self],
    scriptSrc: [self, ...scripts],
    styleSrc: [self, unsafeInline, ...styles],
    fontSrc: [self, ...fonts],
    frameSrc: [self, ...frames],
    connectSrc: [self, ...connect],
    imgSrc: [self, ...images],
    objectSrc: [self],
    mediaSrc: [self],
  };
};

export default getDirectives;
