import {createElement} from "../utils.js";

const createFilmDetailsCommentsTemplate = (comments) => {
  return comments
    .map((comment) => {
      const {commentText, commentEmoji, commentAuthor, commentDay} = comment;

      return `<li class="film-details__comment">
                  <span class="film-details__comment-emoji">
                    <img src="./images/emoji/${commentEmoji}.png" width="55" height="55" alt="emoji-smile">
                  </span>
                  <div>
                    <p class="film-details__comment-text">${commentText}</p>
                    <p class="film-details__comment-info">
                      <span class="film-details__comment-author">${commentAuthor}</span>
                      <span class="film-details__comment-day">${commentDay}</span>
                      <button class="film-details__comment-delete">Delete</button>
                    </p>
                  </div>
                </li>
              `;
    })
    .join(``);
};


const createFilmCommentsTemplate = (comments) => {
  const commentsList = createFilmDetailsCommentsTemplate(comments);

  return `<ul class="film-details__comments-list">
      ${commentsList}
    </ul>`;
};

export default class FilmDetailsComments {
  constructor(comments) {
    this._comments = comments;
    this._element = null;
    // this._commentIds = commentIds;
  }

  getTemplate() {
    return createFilmCommentsTemplate(this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
