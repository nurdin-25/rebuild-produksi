// Type your data here, it can be string, or any type of data, just write your variable
import {
  SET_DATA_TERIMA_MASAK_SUCCESS,
  SET_DATA_TERIMA_MASAK_FAILED,
  SET_SUSUT_SUCCESS,
  SET_BERAT_TERIMA,
} from "../actions/terimamasak";

const initialState = {
  feedback: [],
  error: null,
  isEdit: false,
  susut: 0,
  beratTerima: 0,
};

const terimamasak = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_TERIMA_MASAK_SUCCESS:
      return {
        ...state,
        feedback: action.payload.data,
        susut: action.payload.data[0]?.tot_berat_murni,
      };
    case SET_DATA_TERIMA_MASAK_FAILED:
      return {
        ...state,
        error: action.payload.data,
      };
    case SET_SUSUT_SUCCESS:
      return {
        ...state,
        susut: action.payload.data,
      };
    case SET_BERAT_TERIMA:
      return {
        ...state,
        beratTerima: action.payload.data,
      };
    default:
      return state;
  }
};

export default terimamasak;
