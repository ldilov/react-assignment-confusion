import { DISHES } from '../data/mock/dishes';
import { COMMENTS } from '../data/mock/comments';
import { PROMOTIONS } from '../data/mock/promotions';
import { LEADERS } from '../data/mock/leaders';

export const initialState = {
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
  return state;
};
