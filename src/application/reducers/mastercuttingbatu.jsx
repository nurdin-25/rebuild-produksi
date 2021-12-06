// Type your data here, it can be string, or any type of data, just write your variable
import {
  SET_DATA_MASTER_CUTTING_BATU_SUCCESS,
  SET_DATA_MASTER_CUTTING_BATU_FAILED,
  SET_EDIT_FORM_ON,
  SET_EDIT_FORM_OFF,
  SET_DATA_MASTER_CUTTING_BATU_EDIT,
} from "../actions/mastercuttingbatu";

const initialState = {
  feedback: [],
  error: null,
  isEdit: false,
  isVisible: false,
  dataEdit: [],
};

const mastercuttingbatu = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_MASTER_CUTTING_BATU_SUCCESS:
      return {
        ...state,
        feedback: action.payload.data,
      };
    case SET_DATA_MASTER_CUTTING_BATU_FAILED:
      return {
        ...state,
        error: action.payload.data,
      };
    case SET_EDIT_FORM_ON:
    case SET_EDIT_FORM_OFF:
      return {
        ...state,
        dataEdit: [],
        isEdit: action.payload,
        isVisible: action.payload,
      };
    case SET_DATA_MASTER_CUTTING_BATU_EDIT:
      return {
        ...state,
        dataEdit: action.payload.data,
      };
    default:
      return state;
  }
};

export default mastercuttingbatu;
