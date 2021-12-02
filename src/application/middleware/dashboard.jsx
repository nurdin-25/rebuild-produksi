//API => call api in infrastructure -> service -> api
// log => for call console.log and dynamic console.log
//writeLocal for write data to local ( dynamic write depend on mode in env) if production its automatically encrypted
//getLocal for get data from local ( dynamic write depend on mode in env) if production its automatically encrypted
// toas for show toast to screen, its have 4 varians (.Success , .Failed, .Warning, .Info)
// sweetalert for show sweetalert to screen, its have 4 varians (.Success , .Failed, .Warning, .Info)
// dispatch for dispactching action, like store data to reducer, and others
// getState is FUNCTION for get current data in your state (reducer), just call getState().yourReducer.yourData

import {
  GET_ALL_DASHBOARD,
  setDataDashboardSuccess,
  setDataDashboardFailed,
  GET_ABU_CASTING_OUTSTAND,
  setDataAbuCastingSuccess,
  setDataAbuCastingFailed,
  GET_ABU_POTONG_OUTSTAND,
  setDataAbuPotongSuccess,
  setDataAbuPotongFailed,
  GET_ABU_TUKANG_OUTSTAND,
  setDataAbuTukangSuccess,
  setDataAbuTukangFailed,
  GET_CASTING_OUTSTAND,
  setDataCastingSuccess,
  setDataCastingFailed,
  GET_BAHAN_OUTSTAND,
  setDataBahanSuccess,
  setDataBahanFailed
} from "../actions/dashboard";
const dashboard =
  ({ api, log, writeLocal, getLocal, toast, sweetalert }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_ALL_DASHBOARD) {
      const response = await api.dashboard.getAllDashboard();
      console.log(response);
      if (response.value?.status === "berhasil") {
        dispatch(setDataDashboardSuccess({feedback : response.value.data}));
      } else {
        dispatch(setDataDashboardFailed({error : response.error}));
      }
    }
  };

const abucastingoutstand =
  ({ api, log, writeLocal, getLocal, toast, sweetalert }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_ABU_CASTING_OUTSTAND) {
      const response = await api.dashboard.getAllAbuCastingOutstand();
      console.log(response);
      if (response.value?.status === "berhasil") {
        dispatch(setDataAbuCastingSuccess({feedback : response.value.data}));
      } else {
        dispatch(setDataAbuCastingFailed({error : response.error}));
      }
    }
  };

const abupotong =
  ({ api, log, writeLocal, getLocal, toast, sweetalert }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_ABU_POTONG_OUTSTAND) {
      const response = await api.dashboard.getAllAbuPotong();
      console.log(response);
      if (response.value?.status === "berhasil") {
        dispatch(setDataAbuPotongSuccess({feedback : response.value.data}));
      } else {
        dispatch(setDataAbuPotongFailed({error : response.error}));
      }
    }
  };

const abutukang =
  ({ api, log, writeLocal, getLocal, toast, sweetalert }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_ABU_TUKANG_OUTSTAND) {
      const response = await api.dashboard.getAllAbuTukang();
      console.log(response);
      if (response.value?.status === "berhasil") {
        dispatch(setDataAbuTukangSuccess({feedback : response.value.data}));
      } else {
        dispatch(setDataAbuTukangFailed({error : response.error}));
      }
    }
  };

const castingoutstand =
  ({ api, log, writeLocal, getLocal, toast, sweetalert }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_CASTING_OUTSTAND) {
      const response = await api.dashboard.getAllOutstandCasting();
      console.log(response);
      if (response.value?.status === "berhasil") {
        dispatch(setDataCastingSuccess({feedback : response.value.data}));
      } else {
        dispatch(setDataCastingFailed({error : response.error}));
      }
    }
  };

const bahanoutstand =
  ({ api, log, writeLocal, getLocal, toast, sweetalert }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_BAHAN_OUTSTAND) {
      const response = await api.dashboard.getAllOutstandBahan();
      console.log(response);
      if (response.value?.status === "berhasil") {
        dispatch(setDataBahanSuccess({feedback : response.value.data}));
      } else {
        dispatch(setDataBahanFailed({error : response.error}));
      }
    }
  };

const data = [dashboard, abucastingoutstand, abupotong, abutukang, castingoutstand, bahanoutstand];

export default data;