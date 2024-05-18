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