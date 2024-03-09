// import FilmCardComponent from "../components/film-card";
// import FilmDetailsComponent from "../components/film-details";
// import {isEscPressed} from "./common";

import {RenderPosition} from "../const";


const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.parentNode.insertBefore(component.getElement(), container.nextSibling);
      break;
  }
};


const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

// const renderFilms = (filmList, section) => {
//   for (const film of filmList) {
//     const filmCard = new FilmCardComponent(film);
//     const filmDetails = new FilmDetailsComponent(film);
//
//     filmCard.setClickHandler((evt) => {
//       if (evt.target.matches(`.film-card__title`) ||
//         evt.target.matches(`.film-card__poster`) ||
//         evt.target.matches(`.film-card__comments`)) {
//         render(section.closest(`.main`), filmDetails);
//
//         const onEscPress = (keyEvt) => {
//           if (isEscPressed(keyEvt)) {
//             remove(filmDetails);
//             document.removeEventListener(`keydown`, onEscPress);
//           }
//         };
//
//         filmDetails.setCloseButtonHandler(() => {
//           remove(filmDetails);
//         });
//
//         document.addEventListener(`keydown`, onEscPress);
//       }
//     });
//
//     render(section.querySelector(`.films-list__container`), filmCard);
//   }
// };


export {createElement, render, remove};
