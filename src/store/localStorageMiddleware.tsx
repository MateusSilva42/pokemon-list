import { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = ({ getState }) => next => action => {
  let result = next(action);
  setTimeout(() => {
    localStorage.setItem('favorites', JSON.stringify(getState().favorite.favorites));
  }, 0);
  return result;
};