// js/gallery.js

// 1) Your three category definitions
const categories = [
  {
    name: 'Castles & Fortresses',
    thumb: 'images/castle-thumb.jpg',
    images: [
      { full: 'images/edinburgh.jpg',      alt: 'Edinburgh Castle' },
      { full: 'images/lauriston.jpg',      alt: 'Lauriston Castle' },
      { full: 'images/craigmillar.jpg',    alt: 'Craigmillar Castle' },
      { full: 'images/blackness-castle.jpg', alt: 'Blackness Castle' },
      { full: 'images/holyrood.jpg',       alt: 'Holyrood Palace' },
      { full: 'images/linlithgow.jpg',     alt: 'Linlithgow Palace' }
    ]
  },
  {
    name: 'Mountains & Hills',
    thumb: 'images/hill-thumb.jpg',
    images: [
      { full: 'images/hill-thumb.jpg', alt: 'Arthurs Seat' },
      { full: 'images/allermuir.jpg', alt: 'Allemuir Hill' },
      { full: 'images/calton.jpg', alt: 'Carlton Hill' },
      { full: 'images/costorphine hill.jpg', alt: 'Costorphine Hill' },
      { full: 'images/blackford.jpg', alt: 'Blackford Hill' },
      { full: 'images/crow.jpg', alt: 'Crow Hill' }
    ]
  },
  {
    name: 'Nature & Wildlife',
    thumb: 'images/wildlife-thumb.jpg',
    images: [
      { full: 'images/redfox.jpg', alt: 'Red Fox' },
      { full: 'images/redsquirrel.jpg', alt: 'Red Squirrel' },
      { full: 'images/roedeer.jpg', alt: 'Roe Deer' },
      { full: 'images/muteswan.jpg', alt: 'Mute Swan' },
      { full: 'images/kingfisher.jpg', alt: 'King Fisher' },
      { full: 'images/songbird.jpg', alt: 'Songbird' }
    ]
  },
  {
    name: 'Bridges & Viaducts',
    thumb: 'images/bridges-thumb.jpg',
    images: [
      { full: 'images/bridges-thumb.jpg', alt: 'Forth Bridge' },
      { full: 'images/forth.jpg', alt: 'Forth Road Bridge' },
      { full: 'images/qfcrossing.jpg', alt: 'Queensferry Crossing' },
      { full: 'images/northbridge.jpg', alt: 'North Bridge' },
      { full: 'images/dean.jpg', alt: 'Dean Bridge' },
      { full: 'images/blackfordb.jpg', alt: 'Blackford Bridge' }
    ]
  },
  
  
  {
    name: 'Parks & Gardens',
    thumb: 'images/park-thumb.jpg',
    images: [
      { full: 'images/park-thumb.jpg', alt: 'Royal Botanic Garden' },
      { full: 'images/ps.jpg', alt: 'Princes Street Gardens' },
      { full: 'images/meadows.jpg', alt: 'The Meadows' },
      { full: 'images/Inverleith Park.jpg', alt: 'Inverleith Park' },
      { full: 'images/niel.jpg', alt: 'Dr Neils Garden' },
      { full: 'images/dell.jpg', alt: 'Colinton Dell' }
    ]
  },
  
  {
    name: 'Coastal & Water Views',
    thumb: 'images/coastal-thumb.jpg',
    images: [
      { full: 'images/coastal-thumb.jpg', alt: 'Portobello Beach' },
      { full: 'images/cramond.jpeg', alt: 'Cramond Island' },
      { full: 'images/waterofleith.jpg', alt: 'Water of Leith Walkaway - Shore' },
      { full: 'images/duddingston.jpg', alt: 'Duddingston Loch' },
      { full: 'images/musselburgh.jpg', alt: 'Musselburgh Harbour' },
      { full: 'images/granton harbour.jpg', alt: 'Granton Harbor' }
    ]
  }
];

// 2) Grab references to your grid & lightbox elements
const grid     = document.getElementById('image-grid');
const lb       = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-image');
const btnClose = document.getElementById('lb-close');
const btnPrev  = document.getElementById('lb-prev');
const btnNext  = document.getElementById('lb-next');

let current    = 0;
let currentCat = 0;

// 3) Render the category chooser cards
function renderCategories() {
  grid.innerHTML = '';
  categories.forEach((cat, i) => {
    const fig = document.createElement('figure');
    fig.innerHTML = `
      <img src="${cat.thumb}" alt="${cat.name}">
      <figcaption>${cat.name}</figcaption>
    `;
    fig.style.cursor = 'pointer';
    fig.addEventListener('click', () => {
      currentCat = i;
      renderImages(i);
    });
    grid.appendChild(fig);
  });
}

// 4) Render the thumbnails for one category
function renderImages(catIndex) {
  grid.innerHTML = '';
  categories[catIndex].images.forEach((imgData, idx) => {
    const fig = document.createElement('figure');
    fig.innerHTML = `
      <img src="${imgData.full}"
           data-full="${imgData.full}"
           alt="${imgData.alt}"
           loading="lazy">
      <figcaption>${imgData.alt}</figcaption>
    `;
    fig.style.cursor = 'pointer';
    fig.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(fig);
  });
}

// 5) Lightbox controls
function openLightbox(i) {
  current = i;
  lbImg.src = categories[currentCat].images[i].full;
  lb.classList.remove('hidden');
}
function closeLightbox() {
  lb.classList.add('hidden');
}
function navigate(delta) {
  const imgs = categories[currentCat].images;
  current = (current + delta + imgs.length) % imgs.length;
  lbImg.src = imgs[current].full;
}

btnClose.addEventListener('click', closeLightbox);
btnPrev .addEventListener('click', () => navigate(-1));
btnNext .addEventListener('click', () => navigate(+1));
lb      .addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

// 6) Entry point: if PAGE_CATEGORY is set, show that category’s images;
//    otherwise show the category chooser.
if (typeof PAGE_CATEGORY !== 'undefined') {
  const idx = categories.findIndex(c => c.name === PAGE_CATEGORY);
  if (idx >= 0) {
    currentCat = idx;
    renderImages(idx);
  } else {
    renderCategories();
  }
} else {
  renderCategories();
}
