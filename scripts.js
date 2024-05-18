// Import data, utility functions, and HTML elements
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { renderBookPreviews, setupGenreOptions, setupAuthorOptions, setThemeProperties, applyPreferredTheme, showMoreButton, handleListItemOnClick } from './utility.js';
import { htmlElements } from './elements.js';

let page = 1;
let matches = books;

// Add event listeners for search cancel, settings cancel, search, and settings buttons
htmlElements.search.dataSearchCancel.addEventListener('click', () => {
    htmlElements.search.dataSearchOverlay.open = false;
});

htmlElements.setting.dataSettingCancel.addEventListener('click', () => {
    htmlElements.setting.dataSettingOverlay.open = false;
});

htmlElements.header.dataHeaderSearch.addEventListener('click', () => {
    htmlElements.search.dataSearchOverlay.open = true ;
    htmlElements.search.dataSearchTitle.focus();
});

htmlElements.header.dataHeaderSetting.addEventListener('click', () => {
    htmlElements.setting.dataSettingOverlay.open = true ;
});

// Add event listener for closing the list overlay
htmlElements.list.dataListClose.addEventListener('click', () => {
    htmlElements.list.dataListActive.open = false;
});

// Handle form submission for setting theme properties
htmlElements.setting.dataSettingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    setThemeProperties(theme);
    
    htmlElements.setting.dataSettingOverlay.open = false;
});


// Handle form submission for search, filtering results by title, author, and genre
htmlElements.search.dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
// Filter books based on the search criteria
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }
    
    page = 1;// Reset the page to 1
    matches = result;// Update matches to the filtered results

    // Show or hide the no results message
    if (result.length < 1) {
        htmlElements.list.dataListMessage.classList.add('list__message_show')
    } else {
        htmlElements.list.dataListMessage.classList.remove('list__message_show')
    }

    htmlElements.list.dataListItem.innerHTML = ''
    const newItems = document.createDocumentFragment();
    renderBookPreviews(newItems, result.slice(0, BOOKS_PER_PAGE));
    
    showMoreButton(page, matches);

    window.scrollTo({top: 0, behavior: 'smooth'});
    htmlElements.search.dataSearchOverlay.open = false;
});

// Event listener for the show more button
htmlElements.list.dataListButton.addEventListener('click', () => {
    page += 1;
    const fragment = document.createDocumentFragment();
    const newBooks = matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE);
    renderBookPreviews(fragment, newBooks);
    showMoreButton(page, matches);
});

// Event listener for book list item clicks
htmlElements.list.dataListItem.addEventListener('click', (event) => {
    handleListItemOnClick(event);
});

// Initialization function to set up the application
function initialization() {
    const starting = document.createDocumentFragment();
    renderBookPreviews(starting, matches.slice(0, BOOKS_PER_PAGE));

    setupAuthorOptions(); // Set up author options in the search form
    setupGenreOptions();// Set up genre options in the search form
    showMoreButton(page, matches); // Update the show more button
};



// Call the initialization function and apply the preferred theme
initialization();
applyPreferredTheme();









