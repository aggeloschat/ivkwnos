// Mobile Menu Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('active');
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Gallery Data (Replace with your images)
const galleryData = [
  { src: '../images/home/701_3681.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6051.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  { src: '../images/home/IMG_6495.jpg', title: 'IMAGE' },
  // Add more photos here
];

// Load Gallery
const galleryGrid = document.querySelector('.gallery-grid');

galleryData.forEach(photo => {
  const galleryItem = document.createElement('div');
  galleryItem.className = 'gallery-item';
  galleryItem.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}">
        <p class="photo-title">${photo.title}</p>
    `;
  galleryGrid.appendChild(galleryItem);
});

// Masonry Gallery Layout
function resizeGridItem(item) {
  const grid = document.querySelector('.gallery-grid');
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  const rowSpan = Math.ceil((item.querySelector('img').height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
  const allItems = document.querySelectorAll('.gallery-item');
  allItems.forEach(resizeGridItem);
}

window.addEventListener('load', resizeAllGridItems);
window.addEventListener('resize', resizeAllGridItems);

// Animate on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('[data-aos]');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      el.classList.add('aos-animate');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// Dark Mode Toggle
const toggle = document.getElementById('dark-mode-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = toggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Form Validation
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name && email && message) {
    alert('Το μήνυμά σας στάλθηκε με επιτυχία!');
    this.reset();
  } else {
    alert('Συμπλήρωσε όλα τα πεδία!');
  }
});


const gallery = document.getElementById('gallery');

let isDown = false;
let startX;
let scrollLeft;

gallery.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
  gallery.style.cursor = 'grabbing'; // change cursor while dragging
});

gallery.addEventListener('mouseleave', () => {
  isDown = false;
  gallery.style.cursor = 'grab';
});

gallery.addEventListener('mouseup', () => {
  isDown = false;
  gallery.style.cursor = 'grab';
});

gallery.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 1.5; // speed
  gallery.scrollLeft = scrollLeft - walk;
});

// 🛑 Prevent dragging images
gallery.querySelectorAll('img').forEach(img => {
  img.addEventListener('dragstart', (e) => e.preventDefault());
});
