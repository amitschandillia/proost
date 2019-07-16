// Remove if static/fonts works well


const FontFaceObserver = require('fontfaceobserver');

const addFont = (fontUrl) => {
  const fontName = fontUrl.split('=')[1].split(':')[0].split('&')[0];
  const fontNameWithSpace = fontName.replace(/\+/g, ' ');
  const link = document.createElement('link');
  link.href = fontUrl;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  const addedFont = new FontFaceObserver(fontNameWithSpace);
  addedFont.load().then(() => {
    document.documentElement.classList.add(fontName);
  });
};

const Fonts = () => {
  // Oswald
  addFont('https://fonts.googleapis.com/css?family=Oswald:400,500,600,700&display=swap');
  // Roboto
  addFont('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
  // Source Sans Pro
  addFont('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap');
};

export default Fonts;
