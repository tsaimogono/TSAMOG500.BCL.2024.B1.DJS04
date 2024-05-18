import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { htmlElements } from './elements.js';

/**
 * Creates a book element.
 * @param {Object} book - The book data.
 * @param {string} book.author - The author of the book.
 * @param {string} book.id - The book ID.
 * @param {string} book.image - The URL of the book image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLElement} The book element.
 */
export const createBookElement = (book) => {
    const { author, id, image, title } = book;
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);
    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
            
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
    return element;
}

/**
 * Renders book previews.
 * @param {DocumentFragment} documentFragment - The document fragment to append book elements to.
 * @param {Object[]} bookList - The list of books to render.
 */
export const renderBookPreviews = (documentFragment, bookList) => {
    for ( const book of bookList) {
        documentFragment.appendChild(createBookElement(book));
    };
    htmlElements.list.dataListItem.appendChild(documentFragment);
};

/**
 * Sets up genre options in the search form.
 */
export const setupGenreOptions = () => {
    const genreHtml = document.createDocumentFragment()
    genreHtml.appendChild(createOptionElement('any', 'All Genres'))

    for (const [id, name] of Object.entries(genres)) {
        genreHtml.appendChild(createOptionElement(id, name));
    }

htmlElements.search.dataSearchGenre.appendChild(genreHtml)
}

/**
 * Sets up author options in the search form.
 */
export const setupAuthorOptions = () => {
    const authorsHtml = document.createDocumentFragment();
    authorsHtml.appendChild(createOptionElement('any', 'All Authors'));

    for (const [id, name] of Object.entries(authors)) {
        authorsHtml.appendChild(createOptionElement(id, name))
    }

    htmlElements.search.dataSearchAuthor.appendChild(authorsHtml)
};
