
// States-details
document.addEventListener('DOMContentLoaded', function () {
  // State/UT data loading
  const stateId = new URLSearchParams(window.location.search).get('state');

  fetch('states-data.json')
    .then(response => response.json())
    .then(data => {
      const stateData = data.states.find(state => state.id === stateId);
      if (stateData) {
        displayStateData(stateData, 'state');
      } else {
        fetch('territories-data.json')
          .then(res => res.json())
          .then(utData => {
            const territory = utData.territories.find(t => t.id === stateId);
            if (territory) displayStateData(territory, 'territory');
            else showError();
          })
          .catch(showError);
      }
    })
    .catch(showError);
});
// 
// Rest of your existing displayStateData and showError functions
// with the image error handling additions mentioned above


function displayStateData(data, type) {
  // Header
  document.getElementById('stateName').textContent = data.name;
  document.getElementById('stateTagline').textContent = data.tagline;
  if (data.headerImage.startsWith('linear-gradient')) {
    // Apply gradient directly
    document.getElementById('stateHeader').style.background = data.headerImage;
  } else {
    // Apply image with overlay
    document.getElementById('stateHeader').style.backgroundImage =
      `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${data.headerImage})`;
  }

  // Map
  document.getElementById('stateMap').innerHTML = `
    <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
    src="https://maps.google.com/maps?q=${data.mapCoordinates.lat},${data.mapCoordinates.lng}&z=7&output=embed">
    </iframe>`;

  // Facts
  const facts = [
    { icon: 'fa-calendar', title: 'Formation', value: data.facts.formationDate },
    { icon: 'fa-globe', title: 'Area', value: data.facts.area },
    { icon: 'fa-users', title: 'Population', value: data.facts.population },
    { icon: 'fa-city', title: 'Capital', value: data.facts.capital },
    { icon: 'fa-language', title: 'Languages', value: data.facts.languages.join(', ') },
    { icon: 'fa-utensils', title: 'Famous Food', value: data.facts.famousFood },
    { icon: 'fa-dog', title: 'Animal', value: data.facts.territoryAnimal || data.facts.stateAnimal },
    { icon: 'fa-dove', title: 'Bird', value: data.facts.territoryBird || data.facts.stateBird },
    { icon: 'fa-spa', title: 'Flower', value: data.facts.territoryFlower || data.facts.stateFlower },
    { icon: 'fa-tree', title: 'Tree', value: data.facts.territoryTree || data.facts.stateTree }
  ];

  document.getElementById('stateFacts').innerHTML = facts.map(fact => `
    <div class="fact-box">
        <i class="fas ${fact.icon}"></i>
        <h4>${fact.title}</h4>
        <p>${fact.value}</p>
    </div>`).join('');

  // Leadership
  const gov = data.leadership.administrator || data.leadership.governor;
  document.getElementById('governorName').textContent = gov.name;
  document.getElementById('governorPhoto').src = gov.photo;
  document.getElementById('governorTenure').textContent = `Since: ${gov.tenure}`;

  // CM (only if exists)
  if (data.leadership.chiefMinister) {
    document.getElementById('cmCard').style.display = 'flex';
    document.getElementById('cmName').textContent = data.leadership.chiefMinister.name;
    document.getElementById('cmPhoto').src = data.leadership.chiefMinister.photo;
    document.getElementById('cmTenure').textContent = `Since: ${data.leadership.chiefMinister.tenure}`;
  } else {
    document.getElementById('cmCard').style.display = 'none';
  }

  // History
  document.getElementById('stateHistory').innerHTML = data.history;

  // Tourist Places
  document.getElementById('touristPlaces').innerHTML = data.touristPlaces.map(place => `
    <div class="place-card">
        <img src="${place.image}" alt="${place.name}" class="place-image">
        <div class="place-info">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <a href="#" class="see-more">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>`).join('');
}


function showError() {
  document.getElementById('stateName').textContent = "State Not Found";
  document.getElementById('stateTagline').textContent = "The requested state information could not be loaded";
}

// Sample Gallery Data
const galleryData = [
  // Landscapes
  { id: 1, category: "landscape", image: "img/Tourists/himalyan_peaks.jpeg", title: "Himalayan Peaks" },
  { id: 2, category: "landscape", image: "img/Tourists/kerala_back_waters.jpg", title: "Kerala Backwaters" },
  { id: 3, category: "landscape", image: "img/Tourists/Goa_beaches.jpg", title: "Goa Beaches" },
  { id: 4, category: "landscape", image: "img/Tourists/ladakh_mountains.jpg", title: "Ladakh Mountains" },
  { id: 5, category: "landscape", image: "img/Tourists/tea_gardens.jpeg", title: "Munnar Tea Gardens" },

  // Heritage
  { id: 6, category: "heritage", image: "img/Tourists/Taj-Mahal.webp", title: "Taj Mahal" },
  { id: 7, category: "heritage", image: "img/Tourists/hawa-mahal.webp", title: "Hawa Mahal" },
  { id: 8, category: "heritage", image: "img/Tourists/Red_Forts.jpg", title: "Red Fort" },
  { id: 9, category: "heritage", image: "img/Tourists/qutab-minar.jpg", title: "Qutub Minar" },
  { id: 10, category: "heritage", image: "img/Tourists/khajur_temple.jpg", title: "Khajuraho Temples" },

  // Culture
  { id: 11, category: "culture", image: "img/Tourists/classical_dance.jpg", title: "Classical Dance" },
  { id: 12, category: "culture", image: "img/Tourists/diwali.jpg", title: "Diwali Festival" },
  { id: 13, category: "culture", image: "img/Tourists/Holi.jpg", title: "Holi Celebration" },
  { id: 15, category: "culture", image: "img/Tourists/street_foodes.jpeg", title: "Street Food" },

  // Wildlife
  { id: 16, category: "wildlife", image: "img/Tourists/bengal_tiger.jpeg", title: "Bengal Tiger" },
  { id: 17, category: "wildlife", image: "img/Tourists/lion.jpeg", title: "Asiatic Lion" },
  { id: 18, category: "wildlife", image: "img/Tourists/elephant.jpg", title: "Indian Elephant" },
  { id: 19, category: "wildlife", image: "img/Tourists/Peacock.jpg", title: "Peacock" },
  { id: 20, category: "wildlife", image: "img/Tourists/ranthambore.jpg", title: "Ranthambore Safari" },

  // Cities
  { id: 21, category: "cities", image: "img/Tourists/mumbai_sky_line.jpeg", title: "Mumbai Skyline" },
  { id: 22, category: "cities", image: "img/Tourists/delhi_metro.webp", title: "Delhi Metro" },
  { id: 23, category: "cities", image: "img/Tourists/banglore_tech_park.webp", title: "Bangalore Tech Parks" },
  { id: 24, category: "cities", image: "img/Tourists/marina_beach.jpg", title: "Chennai Marina" },
  { id: 25, category: "cities", image: "img/Tourists/howrah_bridge.jpeg", title: "Kolkata Howrah Bridge" }
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load Gallery Items
function loadGalleryItems(items) {
  galleryGrid.innerHTML = '';
  items.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.category = item.category;
    galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="gallery-img">
                    <div class="gallery-caption">${item.title}</div>
                `;
    galleryGrid.appendChild(galleryItem);
  });
}

// Filter Gallery
function filterGallery() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const filter = this.dataset.filter;
      const galleryItems = document.querySelectorAll('.gallery-item');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Initialize Gallery
document.addEventListener('DOMContentLoaded', () => {
  loadGalleryItems(galleryData);
  filterGallery();
});

// About Page
// Navigation active link highlighting
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
  });

  // Set 'About' link as active
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  document.querySelector('[href="about.html"]').classList.add('active');


  // Scroll effect for navbar
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animate sections when they come into view
  const aboutSections = document.querySelectorAll('.about-section');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  aboutSections.forEach(section => observer.observe(section));
  timelineItems.forEach(item => observer.observe(item));

  // Animate stats counting
  const animateStats = () => {
    const statElements = {
      landArea: { target: 3.28, suffix: 'M', duration: 2000 },
      population: { target: 1.4, suffix: 'B', duration: 2000 },
      languages: { target: 22, suffix: '', duration: 1500 },
      states: { target: 28, suffix: '', duration: 1500 }
    };

    Object.keys(statElements).forEach(id => {
      const element = document.getElementById(id);
      const { target, suffix, duration } = statElements[id];

      const startTime = Date.now();
      const endTime = startTime + duration;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min(1, (now - startTime) / duration);

        let value;
        if (id === 'landArea' || id === 'population') {
          value = (target * progress).toFixed(2);
          if (value.endsWith('.00')) value = value.split('.')[0];
        } else {
          value = Math.floor(target * progress);
        }

        element.textContent = value + suffix;

        if (now < endTime) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    });
  };

  // Trigger stats animation when the stats section is in view
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateStats();
      statsObserver.unobserve(entries[0].target);
    }
  });

  const statsSection = document.querySelector('.about-section');
  statsObserver.observe(statsSection);
});



