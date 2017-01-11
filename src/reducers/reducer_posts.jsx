import  { FETCH_POSTS, FETCH_POST } from '../actions/index';

const INITIAL_STATE =  {all: [], post: null}; //initial state as an object
//all is as all posts array
//post is for displaying one active post

export default function(state = INITIAL_STATE, action){
  switch(action.type) {

    case FETCH_POST:
      return { ...state, post: action.payload.data };

    case FETCH_POSTS:
    // console.log(action.payload);
    //Go over and take whatever state is and return all posts
    return { ...state, all:action.payload.data };

    default:
      return state;
  }
}
