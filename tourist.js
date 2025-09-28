// Get place ID from URL
const urlParams = new URLSearchParams(window.location.search);
const placeId = urlParams.get("place");

// Load tourist data
fetch("tourist-data.json")
  .then(res => res.json())
  .then(data => {
    const place = data.places.find(item => item.id === placeId);
    if (!place) {
      document.body.innerHTML = "<h2>Tourist place not found.</h2>";
      return;
    }

    // Hero section
    document.getElementById("placeName").textContent = place.name;
    document.getElementById("placeTagline").textContent = place.tagline;

    const touristVideo = document.getElementById("touristVideo");
    if (place.heroVideo) {
      touristVideo.innerHTML = `<source src="${place.heroVideo}" type="video/mp4">`;
      touristVideo.load();
    }

    // About
    document.getElementById("placeDescription").textContent = place.description;

    // History
    document.getElementById("placeHistory").textContent = place.history;

    // Travel Cost
    const costContainer = document.getElementById("placeCost");
    costContainer.innerHTML = place.cost.map(c => `
      <div class="cost-card">
        <h3><i class="${c.icon}"></i> ${c.type}</h3>
        <p class="price">${c.price}</p>
        <p>${c.details}</p>
      </div>
    `).join("");

    // Video Tour
    document.getElementById("placeVideoTour").innerHTML = `
      <iframe src="${place.videoTour}" frameborder="0" allowfullscreen></iframe>
    `;

    // Gallery
    const galleryContainer = document.getElementById("placeGallery");
    galleryContainer.innerHTML = place.gallery.map(img => `
      <div class="gallery-item">
        <img src="${img}" alt="${place.name}">
      </div>
    `).join("");

    // Map
    document.getElementById("placeMap").innerHTML = `
      <iframe src="${place.map}" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy"></iframe>
    `;
  })
  .catch(err => {
    console.error("Error loading tourist data:", err);
  });
