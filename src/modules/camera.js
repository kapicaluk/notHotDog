/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const NEW_PICTURE = 'NEW_PICTURE';
export const SHOW_GALLERY = 'SHOW_GALLERY';
export const TOGGLE_FACING = 'TOGGLE_FACING';
export const TOGGLE_FLASH = 'TOGGLE_FLASH';
export const TOGGLE_WB = 'TOGGLE_WB';
export const TOGGLE_AUTOFOCUS = 'TOGGLE_AUTOFOCUS';
export const SET_FOCUS = 'SET_FOCUS';

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const newPicture = (picture) => (dispatch) => {
  dispatch({type: NEW_PICTURE, payload: picture})
}

export const showGallery = () => (dispatch) => {
  dispatch({type: SHOW_GALLERY})
}

export const toggleFacing = (currentType) => (dispatch) => {
  let newType;
  if (currentType === 'back') {
    newType = 'front'
  } else {
    newType = 'back'
  }
  dispatch({type: TOGGLE_FACING, payload: newType})
}

export const toggleFlash = (currentFlash) => (dispatch) => {
  const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
  };
  dispatch({type: TOGGLE_FLASH, payload: flashModeOrder[currentFlash]})
}

export const toggleWB = (currentWB) => (dispatch) => {
  const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
  };
  dispatch({type: TOGGLE_WB, payload: wbOrder[currentWB]})
}

export const toggleAutoFocus = (currentAF) => (dispatch) => {
  let newAutoFocus;
  if (currentAF === 'on') {
    newAutoFocus = 'off';
  } else {
    newAutoFocus = 'on';
  }
  dispatch({type: TOGGLE_AUTOFOCUS, payload: newAutoFocus})
}

export const setFocus = (newFocus) => (dispatch) => {
  dispatch({type: SET_FOCUS, payload: newFocus })
}

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  cameraType: 'back',
  showGallery: false,
  currentPicture: '',
  flash: 'off',
  wb: 'auto',
  autoFocus: 'on',
  depth: 0
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_PICTURE:
      return { ...state, currentPicture: action.payload };
    case SHOW_GALLERY:
      return { ...state, showGallery: !state.showGallery };
    case TOGGLE_FACING:
      return { ...state, cameraType: action.payload };
    case TOGGLE_FLASH:
      return { ...state, flash: action.payload };
    case TOGGLE_WB:
      return { ...state, wb: action.payload };
    case TOGGLE_AUTOFOCUS:
      return { ...state, autoFocus: action.payload };
    case SET_FOCUS:
      return { ...state, depth: action.payload };
    default:
      return state;
  }
};

export default reducer;
