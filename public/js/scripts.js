// to do:
// 1) captions (hover over) [√] 
// 2) delete images         [√] 
// 3) re-order images       [] 
// 4) revisit animation     []
// 5) Jest testing          []



var imgs = [
  {
    url: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/WsxUquz/full-moon-night-landscape-with-forest-lake_vy-im3w3c__F0000.png',
    text: 'The moon over a lake (1)'
  },
  {
    url: 'http://kenikin.com/w/tree-night-Wallpaper-For-Android-number-Kde.jpg',
    text: 'A desert night (2)'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Little_Gasparilla_sunrise.jpg',
    text: 'Ocean sunrise (3)'
  },
  {
    url: 'https://robotart.org/wp-content/uploads/2017/04/Mountain_Sunset_reference.jpg',
    text: 'Sunset behind the mountains (4)'
  },
  {
    url: 'https://images.fineartamerica.com/images-medium-large/alaskan-winter-sunset-michele-cornelius.jpg',
    text: 'An alaskan sunset (5)'
  }
];

var screen = document.getElementsByClassName('screen')[0];
var row = document.getElementsByClassName('dot-row')[0];
var currSlide = 0;
var dots = document.getElementsByClassName('dot');
var playBtn = document.getElementsByClassName('auto-btn')[0];
var autoPlay = false;
var slideBtns = document.getElementsByClassName('slide');
var inputs = document.getElementsByClassName('inputs')[0];
var fields = document.getElementsByClassName('field');
var caption = document.getElementsByClassName('caption-frame')[0];
var delImgRow = document.getElementsByClassName('image-row')[0];
var dashboardAdd = document.getElementsByClassName('dashboard')[0];
var dashboardDel = document.getElementsByClassName('dashboard')[1];


function start() {
  screen.children[0].src = `${imgs[currSlide].url}`;
  caption.textContent = imgs[currSlide].text
  for (var i=0; i<imgs.length; i++) {
    delImgRow.innerHTML += 
      `<div class='delImg' style='background-image:url(${imgs[i].url})' onClick='selectForDelete(this)'></div>`;
    row.innerHTML += `<div class='dot slide' onClick='goToSlide(${i})'></div>`;
  }
  dots[0].classList.add('selected');
}

window.onLoad = start();

function moveSlide(n) {
  dots[currSlide].classList.remove('selected');
  currSlide += n;
  if (currSlide == imgs.length) {
    currSlide = 0;
  } else if (currSlide < 0) {
    currSlide = imgs.length-1;
  }
  screen.children[0].src = `${imgs[currSlide].url}`;
  caption.textContent = imgs[currSlide].text;
  dots[currSlide].classList.add('selected');
};


var autoRoll = setInterval(function() {
  if (autoPlay) {
    moveSlide(1)
  }
}, 2000);

function playPause() {
  if (!autoPlay) {
    playBtn.textContent = '⏸';
    autoPlay = true;
  } else {
    playBtn.textContent = '▶️';
    autoPlay = false;
  }
}

function goToSlide(n) {
  if (autoPlay) {
    playPause()
  }
  dots[currSlide].classList.remove('selected');
  currSlide = n;
  screen.children[0].src = `${imgs[currSlide].url}`;
  caption.textContent = imgs[currSlide].text;
  dots[currSlide].classList.add('selected');
};


function newImg() {
  if (dashboardDel.style.display != 'none') {
    dashboardDel.style.display = 'none';
  }
  dashboardAdd.style.display = 'block';
};

function submitImg() {
  console.log('submitImg called');
  imgs.push(
    {
      url: `${fields[0].value}`,
      text: `${fields[1].value}`
    }
  );
  delImgRow.innerHTML += (
    `<div style='height:35px; width:55px; display:inline-block; margin:0 1px 0 1px; border-style:solid; border-width:1px' onClick='selectForDelete(this)'>
      <img src=${fields[0].value}/>
    </div>`
  )
  fields[0].value = '';
  fields[1].value = '';
  row.innerHTML += 
    `<div class='dot slide' onClick='goToSlide(${dots.length})'></div>`;
};

function cancel(e) {
  e.parentElement.style.display = 'none';
};

function makeVisible(e) {
  if (document.getElementsByClassName('caption-frame')[0].classList.contains('visible')) {
    document.getElementsByClassName('caption-frame')[0].classList.remove('visible');
  } else {
    document.getElementsByClassName('caption-frame')[0].classList.add('visible');
  }
};


function selectForDelete(e) {
  if (e.classList.contains('selectedForDelete')) {
    e.classList.remove('selectedForDelete');
  } else {
    e.classList.add('selectedForDelete');
  }
};


function showDelete() {
  if (dashboardAdd.style.display != 'none') {
    dashboardAdd.style.display = 'none';
  }
  document.getElementsByClassName('delete')[0].style.display = 'block';
}

function deleteImg() {
  for (var i=delImgRow.children.length-1; i>=0; i--) {
    if (delImgRow.children[i].classList.contains('selectedForDelete')) {
      imgs.splice(i, 1)
    }
  }
  currSlide >= imgs.length ? currSlide = imgs.length-1 : currSlide = currSlide;
  row.innerHTML = '';
  delImgRow.innerHTML = '';
  start();
};
