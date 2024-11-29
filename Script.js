const API_KEY = 'HC6ovrj8AtVN9pMYBDaFWUjejSaK3Il6sDXUaRD-v3A';
const BASE_URL = 'https://api.unsplash.com/search/photos';

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value.trim();
    if (query) {
        searchImages(query);
    } else {
        alert('Please enter a search term!');
    }
});

async function searchImages(query) {
    const url = `${BASE_URL}?query=${encodeURIComponent(query)}&client_id=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch images. Please try again later.');
    }
}

function displayImages(images) {
    const imageGallery = document.getElementById('imageGallery');
    imageGallery.innerHTML = ''; // Clear existing images
    images.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.className = 'image-item';
        imgElement.innerHTML = `<img src="${image.urls.small}" alt="${image.alt_description}" />`;
        imageGallery.appendChild(imgElement);
    });
}
