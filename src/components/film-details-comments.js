export const createFilmDetailsCommentsTemplate = (filmCardDetails) => {
  const {
    commentEmoji,
    commentText,
    commentAuthor,
    commentDay,
  } = filmCardDetails;

  return `
                  <li class="film-details__comment">
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
                  </li>`;
};
