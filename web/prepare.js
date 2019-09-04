/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const crypto = require('crypto');

// get hash seed
const seed = String((new Date()).getTime());
// create hash
const swcachehash = crypto
  .createHash('md5')
  .update(seed + process.env.SW_CACHE_VERSION)
  .digest('hex');

// Service worker path
const swPath = './offline/serviceWorker.js';

// Delete existing service worker
try {
  fs.statSync(swPath);
  console.log('Service worker already exists...\nDeleting...');
  fs.unlinkSync(swPath);
} catch (e) {
  console.log('Service worker does not exist...\nCreating...');
}
// Create new service worker
fs.appendFile(swPath, '', (err) => {
  if (err) throw err;
  console.log('New service worker created successfully.');
});

// PREPARE CACHE FILES AND SERVICE WORKER
// -----------------------------------------------------------------------------
const cachedItems = ['/'];
function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}
// Cache pages
walkSync('./pages/', (filePath) => {
  const cachedItem = filePath.substr(5);
  if (cachedItem.indexOf('_') === -1) {
    cachedItems.push(cachedItem.substr(0, cachedItem.length - 4));
  }
});
// Cache favicons
const faviconList = './static/brand/favicons';
walkSync(faviconList, (filePath) => {
  const cachedItem = filePath.substr(faviconList.length - 1);
  if (!(cachedItem === 'html_code.html' || cachedItem === 'README.md')) {
    cachedItems.push(cachedItem);
  }
});
// Cache pwa icons
const pwaList = './static/brand/pwa';
walkSync(pwaList, (filePath) => {
  const cachedItem = filePath.substr(pwaList.length - 1);
  cachedItems.push(cachedItem);
});
// Cache images
const imageList = './static/images';
walkSync(imageList, (filePath) => {
  const cachedItem = filePath.substr(imageList.length - 1);
  cachedItems.push(`/_f/images/${cachedItem}`);
});
// Cache media
const mediaList = './static/media';
walkSync(mediaList, (filePath) => {
  const cachedItem = filePath.substr(mediaList.length - 1);
  cachedItems.push(`/_f/media/${cachedItem}`);
});
// Cache fonts
const fontList = './static/fonts';
walkSync(fontList, (filePath) => {
  const cachedItem = filePath.substr(fontList.length - 1);
  if (!(cachedItem.substr(cachedItem.length - 4) === 'scss')) {
    cachedItems.push(`/_f/fonts/${cachedItem}`);
  }
});
// Cache stylesheet
// walkSync('./.build/static/css', (filePath) => {
//   let cachedItem =filePath.substr(18);
//   cachedItems.push('/_next/static/css/' + cachedItem);
// });

// Prepare URLSTOCACHE
// -----------------------------------------------------------------------------
let urlsToCache = 'const URLS_TO_CACHE = [\n';
for (let i = 0; i < cachedItems.length; i += 1) {
  urlsToCache += `  '${cachedItems[i]}',\n`;
}
urlsToCache += ']';

// Save updated contents to service worker
// -----------------------------------------------------------------------------
const swContent = `/* eslint-disable */

const CACHE_NAME = '${swcachehash}';
${urlsToCache};

// Call install event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting()),
  );
});

// Call activate event
self.addEventListener('activate', (e) => {
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

// Call fetch event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request)),
  );
});
`;

fs.writeFile(
  swPath,
  swContent,
  'utf8', (err) => {
    if (err) throw err;
  },
);

const reducerPath = './reducers/index.js';
// Delete existing reducer
try {
  fs.statSync(reducerPath);
  console.log('Reducer already exists...\nDeleting...');
  fs.unlinkSync(reducerPath);
} catch (e) {
  console.log('Reducer does not exist...\nCreating...');
}
// Create new reducer
fs.appendFile(reducerPath, '', (err) => {
  if (err) throw err;
  console.log('New reducer created successfully.');
});

// Prepare reducer
const reducers = [];
let reducerStore = 'const reducerStore = combineReducers({\n ';
let imports = 'import { createStore, combineReducers } from \'redux\';\n';
const reducersList = './reducers/slices';
walkSync(reducersList, (filePath) => {
  let reducer = filePath.substr(reducersList.length - 1);
  reducer = reducer.substring(0, reducer.length - 3);
  reducerStore += ` ${reducer},\n `;
  imports += `import ${reducer} from './slices/${reducer}';\n`;
  reducers.push(reducer);
});
imports += '\n';
reducerStore = `${reducerStore.trim()}\n});`;
reducerStore += '\n\nconst makeStore = (initialState) => createStore(reducerStore, initialState);';
reducerStore += '\n\nexport default makeStore;\n';

fs.writeFile(
  reducerPath,
  imports + reducerStore,
  'utf8', (err) => {
    if (err) throw err;
  },
);
