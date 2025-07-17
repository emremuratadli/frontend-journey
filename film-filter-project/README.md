# 🎬 FilmFilter - Movie Discovery Application

A comprehensive web application for discovering and filtering movies, built as part of a JavaScript array methods learning project.

## 📋 Project Overview

FilmFilter is an interactive movie discovery platform that demonstrates practical implementation of JavaScript ES6+ array methods. The application features a modern, responsive design with dark/light theme support and advanced filtering capabilities.

## ✨ Features

### 🎯 Core Functionality
- **Movie Database**: 1000+ movies with comprehensive metadata
- **Advanced Filtering**: Filter by rating, runtime, and search terms
- **Smart Search**: Real-time search with instant results
- **Sort Options**: Sort movies by year (newest first)
- **Watch Later**: Save movies to a personal watch list with localStorage persistence

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark/Light Theme**: Toggle between themes with preference saving
- **Custom Scroll Bar**: Styled scroll bar with purple gradient
- **Smooth Animations**: IntersectionObserver-powered scroll animations
- **Interactive Elements**: Hover effects and smooth transitions

### 💻 Technical Features
- **Array Methods Showcase**: Practical demonstration of 10+ array methods
- **Local Storage**: Persistent data for theme and watch later preferences
- **Modern JavaScript**: ES6+ features including async/await, destructuring
- **CSS Grid & Flexbox**: Modern layout techniques
- **Semantic HTML**: Accessible and SEO-friendly structure

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript ES6+**: Modern JavaScript features and array methods
- **JSON**: Movie database with structured data
- **Web APIs**: IntersectionObserver, localStorage

## 📚 Array Methods Demonstrated

This project serves as a practical learning tool for JavaScript array methods:

| Method | Usage | Example in Project |
|--------|-------|-------------------|
| `forEach()` | Iteration | Movie display rendering |
| `map()` | Transformation | Creating movie title arrays |
| `filter()` | Filtering | Search and rating filters |
| `find()` | Finding elements | Locating specific movies |
| `some()` | Condition checking | Checking for old movies |
| `every()` | All elements check | Validating movie years |
| `reduce()` | Accumulation | Average rating calculation |
| `includes()` | Value checking | Search functionality |
| `sort()` | Sorting | Year-based movie sorting |
| `flat()` | Array flattening | Genre processing |

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for better performance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/emremuratadli/frontend-journey.git
   cd frontend-journey/film-filter-project
   ```

2. **Open the application**
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (with live-server)
   npx live-server
   ```

3. **Access the application**
   - Direct: `file:///path/to/index.html`
   - Local server: `http://localhost:8000`

## 📁 Project Structure

```
film-filter-project/
├── index.html          # Main HTML structure
├── style.css           # Comprehensive styling
├── script.js           # JavaScript functionality
├── data.json           # Movie database (1000+ movies)
├── intern-notes-4.md   # Array methods research notes
└── README.md           # Project documentation
```

## 🎮 How to Use

### Basic Navigation
1. **Browse Movies**: Scroll through the movie grid
2. **Search**: Use the search bar to find specific titles
3. **Filter by Rating**: Set minimum rating using the number input
4. **Filter by Runtime**: Use the slider to set maximum movie duration
5. **Sort**: Click "Sort by Year" to order movies chronologically

### Advanced Features
1. **Watch Later**: Click the clock icon (🕒) on any movie to add to watch list
2. **View Watch Later**: Click the "Watch Later" button to see saved movies
3. **Dark Mode**: Toggle between light and dark themes
4. **Array Methods Demo**: Check browser console for array method demonstrations

### Filter Controls
- **Rating Filter**: Enter minimum rating (0-10 scale)
- **Search Box**: Real-time search across movie titles
- **Runtime Slider**: Set maximum movie duration (60-240 minutes)
- **Comedy Filter**: Show only comedy movies
- **Year Check**: Verify if all movies are after 2000
- **Average Calculator**: Calculate average rating of displayed movies

## 🧮 Array Methods in Action

### Filtering Examples
```javascript
// Filter by rating
const highRatedMovies = movies.filter(movie => movie.Rating >= 80);

// Search by title
const searchResults = movies.filter(movie => 
  movie.Title.toLowerCase().includes(searchTerm)
);
```

### Calculation Examples
```javascript
// Calculate average rating
const averageRating = movies.reduce((sum, movie) => 
  sum + (movie.Rating / 10), 0) / movies.length;

// Find highest rated movie
const bestMovie = movies.find(movie => movie.Rating > 90);
```

## 🎨 Design Features

### Color Scheme
- **Light Theme**: Clean whites and light grays
- **Dark Theme**: Deep backgrounds with accent colors
- **Accent Color**: Purple gradient (#6a11cb to #2575fc)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Responsive Sizing**: Fluid typography with clamp()
- **Hierarchy**: Clear heading and body text distinction

### Layout
- **Grid System**: CSS Grid for main layout
- **Flexbox**: Movie cards and component layouts
- **Responsive**: Mobile-first with tablet and desktop breakpoints

## 🔧 Development Notes

### Version History
- **4.1**: Array methods research and documentation (intern-notes-4.md)
- **4.2**: HTML structure implementation
- **4.3**: CSS styling with custom scroll bar
- **4.4**: JavaScript functionality and array methods
- **4.5**: Movie database integration

### Performance Optimizations
- **Lazy Loading**: IntersectionObserver for animations
- **Local Storage**: Efficient data persistence
- **CSS Optimization**: Minimal reflows and repaints
- **JavaScript Efficiency**: Optimized array operations

## 🎯 Learning Objectives

This project was created to demonstrate:
1. **Practical Array Method Usage**: Real-world applications of JavaScript array methods
2. **Modern Web Development**: ES6+ features and best practices
3. **Responsive Design**: Mobile-first CSS and fluid layouts
4. **User Experience**: Smooth animations and intuitive interactions
5. **Data Manipulation**: JSON processing and dynamic content rendering

## 🔮 Future Enhancements

Potential improvements and features:
- [ ] Movie detail modal windows
- [ ] Genre-based filtering
- [ ] Favorite movies system
- [ ] Movie rating functionality
- [ ] Advanced search with multiple filters
- [ ] Movie recommendations
- [ ] Export watch later list
- [ ] Movie trailer integration

## 📞 Contact & Feedback

For questions, suggestions, or feedback about this project:
- **Repository**: [frontend-journey](https://github.com/emremuratadli/frontend-journey)
- **Project Path**: `/film-filter-project`

## 📄 License

This project is part of a learning journey and is available for educational purposes.

