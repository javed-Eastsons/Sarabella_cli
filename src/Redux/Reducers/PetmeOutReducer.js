import {
  LOGIN_DATA,
  PET_LIST,
  COUNTRY_LIST,
  STATE_LIST,
  CITY_LIST,
  CATEGORY_LIST,
  BREED_LIST,
  ALL_POSTS,
  ALLPETS_CATEGORY
} from '../Actions/types';

const initialstate = {
  LOGIN_DATA: {},
  PET_LIST:{},
  COUNTRY_LIST:{},
  STATE_LIST:[],
  CITY_LIST:[],
  CATEGORY_LIST:[],
  BREED_LIST:[],
  ALL_POSTS:[],
  ALLPETS_CATEGORY:[]
 
};

const PetmeOutReducer = (state = initialstate, action) => {
 
  switch (action.type) {
    case LOGIN_DATA:
      return { ...state, LOGIN_DATA: action.payload };
      case PET_LIST:
       
        return { ...state, PET_LIST: action.payload };
        case COUNTRY_LIST:
       
        return { ...state, COUNTRY_LIST: action.payload };
        case STATE_LIST:
       
        return { ...state, STATE_LIST: action.payload };
        case CITY_LIST:
       
        return { ...state, CITY_LIST: action.payload };
        case CATEGORY_LIST:
       
        return { ...state, CATEGORY_LIST: action.payload };
        case BREED_LIST:
       
        return { ...state, BREED_LIST: action.payload };
        case ALL_POSTS:
       
        return { ...state, ALL_POSTS: action.payload };
        case ALLPETS_CATEGORY:
       
        return { ...state, ALLPETS_CATEGORY: action.payload };
        
  }

  return state;
};

export default PetmeOutReducer;
