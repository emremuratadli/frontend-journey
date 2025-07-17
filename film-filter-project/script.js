// Global variables
let allMovies = [];
let filteredMovies = [];
let watchLaterMovies = [];

// DOM elements
const moviesContainer = document.getElementById('moviesContainer');
const resultsInfo = document.getElementById('results-info');
const ratingFilter = document.getElementById('ratingFilter');
const searchInput = document.getElementById('searchInput');
const filterBtn = document.getElementById('filterBtn');
const sortBtn = document.getElementById('sortBtn');
const showComedyBtn = document.getElementById('showComedyBtn');
const watchLaterBtn = document.getElementById('watchLaterBtn');
const checkYear2000Btn = document.getElementById('checkYear2000Btn');
const calculateAvgBtn = document.getElementById('calculateAvgBtn');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const runtimeSlider = document.getElementById('runtimeSlider');
const runtimeValue = document.getElementById('runtimeValue');

// Load movies data
async function loadMovies() {
    try {
        const response = await fetch('data.json');
        allMovies = await response.json();
        filteredMovies = [...allMovies];
        
        // Load saved watch later list
        loadWatchLaterFromStorage();
        
        displayMovies(filteredMovies);
        updateResultsInfo();
    } catch (error) {
        console.error('Error loading movies:', error);
        moviesContainer.innerHTML = '<div class="no-results">Error loading movies. Please try again.</div>';
    }
}

// Display movies in the grid
function displayMovies(movies) {
    if (movies.length === 0) {
        moviesContainer.innerHTML = '<div class="no-results">No movies found matching your criteria.</div>';
        return;
    }

    moviesContainer.innerHTML = movies.map(movie => {
        const isInWatchLater = watchLaterMovies.some(wlMovie => wlMovie.Title === movie.Title);
        const watchLaterClass = isInWatchLater ? 'in-watch-later' : '';
        const watchLaterIcon = isInWatchLater ? '✓' : '🕒';
        const watchLaterTitle = isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later';
        
        return `
            <div class="movie-card">
                <div class="watch-later-btn ${watchLaterClass}" 
                     onclick="toggleWatchLater('${movie.Title.replace(/'/g, "\\'")}')" 
                     title="${watchLaterTitle}">
                    ${watchLaterIcon}
                </div>
                <h3 class="movie-title">${movie.Title}</h3>
                <div class="movie-info">
                    <span class="movie-year">${movie.Year}</span>
                    <span class="movie-rating">⭐ ${movie.Rating ? (movie.Rating/10).toFixed(1) : 'N/A'}</span>
                    <span class="movie-runtime">${movie.RuntimeMinutes} min</span>
                </div>
                <p class="movie-description">${movie.Description || 'No description available.'}</p>
            </div>
        `;
    }).join('');
    
    // Reset scroll position to trigger animations for new content
    setTimeout(() => {
        setupScrollAnimations();
    }, 100);
}

// Update results information
function updateResultsInfo() {
    resultsInfo.textContent = `Showing ${filteredMovies.length} of ${allMovies.length} movies`;
}

// Runtime slider update
function updateRuntimeValue() {
    const value = runtimeSlider.value;
    runtimeValue.textContent = `${value} min`;
    filterByRuntime();
}

// Filter movies by runtime (using filter method)
function filterByRuntime() {
    const maxRuntime = parseInt(runtimeSlider.value);
    
    // Apply runtime filter to currently filtered movies
    const runtimeFilteredMovies = filteredMovies.filter(movie => 
        movie.RuntimeMinutes <= maxRuntime
    );
    
    displayMovies(runtimeFilteredMovies);
    resultsInfo.textContent = `Showing ${runtimeFilteredMovies.length} of ${allMovies.length} movies (max ${maxRuntime} min)`;
    
    console.log(`Runtime filter applied: Movies <= ${maxRuntime} minutes`);
}

// Filter movies by minimum rating (using filter method)
function filterByRating() {
    const minRating = parseFloat(ratingFilter.value);
    
    if (isNaN(minRating)) {
        // If no rating specified, keep current filtered movies
        displayMovies(filteredMovies);
    } else {
        // Convert 0-10 input to 0-100 scale for comparison
        const minRatingScaled = minRating * 10;
        // Apply rating filter to currently filtered movies
        const ratingFilteredMovies = filteredMovies.filter(movie => movie.Rating >= minRatingScaled);
        displayMovies(ratingFilteredMovies);
        
        // Update info but don't change filteredMovies permanently
        resultsInfo.textContent = `Showing ${ratingFilteredMovies.length} of ${allMovies.length} movies (filtered)`;
    }
    
    console.log(`Filter applied: Movies with rating >= ${minRating}`);
}

// Search movies by title (using find method for exact match or filter with find for partial)
function searchMovies() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredMovies = [...allMovies];
    } else {
        // Using filter() with find() method - shows movies where we can find the search term
        filteredMovies = allMovies.filter(movie => {
            // Split title into words and use find to see if any word starts with search term
            const titleWords = movie.Title.toLowerCase().split(' ');
            const foundWord = titleWords.find(word => word.startsWith(searchTerm));
            
            // If no word starts with search term, check if title contains it
            return foundWord !== undefined || movie.Title.toLowerCase().includes(searchTerm);
        });
    }
    
    displayMovies(filteredMovies);
    updateResultsInfo();
    console.log(`Search applied with find(): "${searchTerm}"`);
}

// Sort movies by year (using sort method)
function sortMoviesByYear() {
    // Using sort() method - sorts movies by year (newest first)
    filteredMovies.sort((a, b) => b.Year - a.Year);
    
    displayMovies(filteredMovies);
    console.log('Movies sorted by year (newest first)');
}

// Show only comedy movies (using map and filter)
function showComedyMovies() {
    // Use the same algorithm as category filter
    filterByCategory('comedy');
    
    // Update active category button
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    const comedyBtn = document.querySelector('[data-category="comedy"]');
    if (comedyBtn) comedyBtn.classList.add('active');
    
    console.log('Showing comedy movies (same as category filter)');
}

// Check if all movies are after year 2000 (using every method)
function checkMoviesAfter2000() {
    // Using every() method - checks if ALL movies are after 2000
    const allAfter2000 = filteredMovies.every(movie => movie.Year > 2000);
    
    alert(allAfter2000 ? 
        'All displayed movies are after year 2000!' : 
        'Not all displayed movies are after year 2000.'
    );
    
    console.log(`All movies after 2000: ${allAfter2000}`);
}

// Calculate average rating (using reduce method)
function calculateAverageRating() {
    if (filteredMovies.length === 0) {
        alert('No movies to calculate average rating.');
        return;
    }
    
    // Using reduce() method - calculates total rating and then average
    const totalRating = filteredMovies.reduce((sum, movie) => {
        return sum + ((movie.Rating || 0) / 10);
    }, 0);
    
    const averageRating = totalRating / filteredMovies.length;
    
    alert(`Average rating of displayed movies: ${averageRating.toFixed(2)}/10`);
    console.log(`Average rating calculated: ${averageRating.toFixed(2)}`);
}

// Clear all filters and show all movies
function clearAllFilters() {
    filteredMovies = [...allMovies];
    ratingFilter.value = '';
    searchInput.value = '';
    runtimeSlider.value = '180';
    runtimeValue.textContent = '180 min';
    
    displayMovies(filteredMovies);
    updateResultsInfo();
    console.log('All filters cleared - showing all movies');
}

// Show only comedy movies (using filter method)
function showComedyMovies() {
    // Note: Since Genres is null in the data, we'll simulate comedy detection
    // by looking for comedy-related keywords in the description
    const comedyKeywords = ['comedy', 'funny', 'humor', 'hilarious', 'laugh', 'comic'];
    
    // Using filter() method - shows movies with comedy-related descriptions
    filteredMovies = allMovies.filter(movie => {
        if (!movie.Description) return false;
        const description = movie.Description.toLowerCase();
        return comedyKeywords.some(keyword => description.includes(keyword));
    });
    
    displayMovies(filteredMovies);
    updateResultsInfo();
    console.log('Showing comedy movies');
}

// Dark mode toggle
function toggleDarkMode() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    
    // Update button text and emoji
    const emoji = newTheme === 'dark' ? '☀️' : '🌙';
    const text = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    
    darkModeToggle.textContent = text;
    darkModeToggle.setAttribute('data-emoji', emoji);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    console.log(`Theme changed to: ${newTheme}`);
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    const emoji = savedTheme === 'dark' ? '☀️' : '🌙';
    const text = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    
    darkModeToggle.textContent = text;
    darkModeToggle.setAttribute('data-emoji', emoji);
}

// Watch Later functionality
function loadWatchLaterFromStorage() {
    const saved = localStorage.getItem('watchLaterMovies');
    watchLaterMovies = saved ? JSON.parse(saved) : [];
    updateWatchLaterButton();
}

function saveWatchLaterToStorage() {
    localStorage.setItem('watchLaterMovies', JSON.stringify(watchLaterMovies));
}

function toggleWatchLater(movieTitle) {
    const movie = allMovies.find(m => m.Title === movieTitle);
    if (!movie) return;
    
    const existingIndex = watchLaterMovies.findIndex(wlMovie => wlMovie.Title === movieTitle);
    
    if (existingIndex > -1) {
        // Remove from watch later
        watchLaterMovies.splice(existingIndex, 1);
        console.log(`Removed "${movieTitle}" from Watch Later`);
    } else {
        // Add to watch later
        watchLaterMovies.push(movie);
        console.log(`Added "${movieTitle}" to Watch Later`);
    }
    
    saveWatchLaterToStorage();
    updateWatchLaterButton();
    
    // Refresh display to update icons
    displayMovies(filteredMovies);
}

function showWatchLaterMovies() {
    if (watchLaterMovies.length === 0) {
        moviesContainer.innerHTML = '<div class="no-results">No movies in your Watch Later list. Add some movies by clicking the 🕒 icon!</div>';
        resultsInfo.textContent = 'Watch Later: 0 movies';
        return;
    }
    
    displayMovies(watchLaterMovies);
    resultsInfo.textContent = `Watch Later: ${watchLaterMovies.length} movies`;
    console.log(`Showing ${watchLaterMovies.length} movies from Watch Later`);
}

function updateWatchLaterButton() {
    const count = watchLaterMovies.length;
    watchLaterBtn.textContent = count > 0 ? `Watch Later (${count})` : 'Watch Later';
}

// Event listeners
filterBtn.addEventListener('click', filterByRating);
searchInput.addEventListener('input', searchMovies);
sortBtn.addEventListener('click', sortMoviesByYear);
showComedyBtn.addEventListener('click', showComedyMovies);
watchLaterBtn.addEventListener('click', showWatchLaterMovies);
checkYear2000Btn.addEventListener('click', checkMoviesAfter2000);
calculateAvgBtn.addEventListener('click', calculateAverageRating);
clearFiltersBtn.addEventListener('click', clearAllFilters);
darkModeToggle.addEventListener('click', toggleDarkMode);
runtimeSlider.addEventListener('input', updateRuntimeValue);

// Additional array method demonstrations
function demonstrateArrayMethods() {
    console.log('=== Array Methods Demonstration ===');
    
    // Using find() - finds first movie with specific criteria
    const highRatedMovie = allMovies.find(movie => movie.Rating > 90);
    console.log('First movie with rating > 90:', highRatedMovie?.Title);
    
    // Using some() - checks if any movie meets criteria
    const hasOldMovies = allMovies.some(movie => movie.Year < 1990);
    console.log('Has movies before 1990:', hasOldMovies);
    
    // Using map() - creates array of just movie titles
    const movieTitles = allMovies.map(movie => movie.Title);
    console.log('First 5 movie titles:', movieTitles.slice(0, 5));
    
    // Using includes() - check if specific title exists in titles array
    const hasInception = movieTitles.includes('Inception');
    console.log('Has "Inception" movie:', hasInception);
    
    // Using find() for search - find movie by partial title match
    const searchResult = allMovies.find(movie => 
        movie.Title.toLowerCase().includes('dark')
    );
    console.log('First movie with "dark" in title:', searchResult?.Title);
    
    // Using flat() - demonstration with nested arrays (example data)
    const exampleGenres = [['Comedy', 'Drama'], ['Action'], ['Thriller', 'Mystery']];
    const flatGenres = exampleGenres.flat();
    console.log('Flattened example genres:', flatGenres);
}

// Scroll animations for movie cards
let scrollObserver = null;

function setupScrollAnimations() {
    // Clear existing observer
    if (scrollObserver) {
        scrollObserver.disconnect();
    }
    
    const movieCards = document.querySelectorAll('.movie-card');
    console.log(`Found ${movieCards.length} movie cards to animate`);
    
    // Reset all cards to initial state
    movieCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.classList.remove('visible');
        console.log(`Reset card ${index}:`, card.querySelector('.movie-title')?.textContent);
    });
    
    scrollObserver = new IntersectionObserver((entries) => {
        console.log(`Intersection observer triggered with ${entries.length} entries`);
        
        entries.forEach((entry) => {
            console.log(`Card intersecting:`, entry.isIntersecting, entry.target.querySelector('.movie-title')?.textContent);
            
            if (entry.isIntersecting) {
                const allCards = Array.from(document.querySelectorAll('.movie-card'));
                const cardIndex = allCards.indexOf(entry.target);
                
                console.log(`Animating card ${cardIndex} IN`);
                
                // Animate immediately for better response
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('visible');
                    console.log(`Animated card ${cardIndex} IN`);
                }, cardIndex * 30); // 30ms delay between each card
                
                // Don't unobserve - we want to keep watching for exit
            } else {
                // Card is leaving viewport - animate out
                console.log(`Animating card OUT:`, entry.target.querySelector('.movie-title')?.textContent);
                
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px) scale(0.95)';
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '100px 0px -30px 0px'
    });
    
    // Start observing with a delay to ensure DOM is ready
    setTimeout(() => {
        movieCards.forEach((card, index) => {
            scrollObserver.observe(card);
            console.log(`Observing card ${index} for bi-directional animation`);
        });
        
        console.log(`Started observing ${movieCards.length} movie cards for bi-directional scroll animations`);
    }, 50);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme(); // Load theme first
    loadMovies();
    demonstrateArrayMethods();
});
