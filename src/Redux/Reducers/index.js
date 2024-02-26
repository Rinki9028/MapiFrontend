import Constants from '../Constants';

const init = {
  userInfo: {},
};

const rootReducer = (state = init, action) => {
  switch (action.type) {
    case Constants.USER_INFO: return {
        ...state,
        userInfo: action.data
    }
    default:
      return state;
  }
};

export default rootReducer;