//API => call api in infrastructure -> service -> api
// log => for call console.log and dynamic console.log
//writeLocal for write data to local ( dynamic write depend on mode in env) if production its automatically encrypted
//getLocal for get data from local ( dynamic write depend on mode in env) if production its automatically encrypted
// toas for show toast to screen, its have 4 varians (.Success , .Failed, .Warning, .Info)
// sweetalert for show sweetalert to screen, its have 4 varians (.Success , .Failed, .Warning, .Info)
// dispatch for dispactching action, like store data to reducer, and others
// getState is FUNCTION for get current data in your state (reducer), just call getState().yourReducer.yourData

import {
  GET_ALL_LAPORAN_KIRIM_TAMBAHAN,
  setDataLaporanKirimTambahanSuccess,
  setDataLaporanKirimTambahanFailed,
} from "../actions/laporankirimtambahan";
import { setLoadingButton } from "../actions/ui";
import Moment from "moment";
import * as sweetalert from "../../infrastructure/shared/sweetalert";

const getAllDataLaporanKirimTambahan =
  ({ api, log, writeLocal, getLocal, toast }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_ALL_LAPORAN_KIRIM_TAMBAHAN) {
      dispatch(setLoadingButton(true));
      dispatch(setDataLaporanKirimTambahanSuccess({ feedback: [] }));
      const data = getState().form.FormLaporanKirimTambahan.values;

      if (data.date === null) {
        dispatch(setLoadingButton(false));
        sweetalert.default.Failed("Lengkapi Form Terlebih Dahulu !");
      } else {
        const tgl_dari = new Date(data.date[0]);
        const tgl_dari_string = Moment(tgl_dari, "Asia/Jakarta").format(
          "YYYY-MM-DD"
        );
        const tgl_sampai = new Date(data.date[1]);
        const tgl_sampai_string = Moment(tgl_sampai, "Asia/Jakarta").format(
          "YYYY-MM-DD"
        );
        const dataOnsend = {
          tgl_awal: tgl_dari_string,
          tgl_akhir: tgl_sampai_string,
        };
        writeLocal("laporan_kirim_tambahan", dataOnsend);

        const response =
          await api.LaporanKirimTambahan.getAllLaporanKirimTambahan(dataOnsend);
        if (response?.value !== null) {
          dispatch(setLoadingButton(false));
          if (response?.value.status === "berhasil") {
            if (response?.value.data.length === 0) {
              sweetalert.default.Failed(response?.value.pesan);
              dispatch(setDataLaporanKirimTambahanSuccess({ feedback: [] }));
            } else {
              sweetalert.default.SuccessNoReload(response?.value.pesan);
              dispatch(
                setDataLaporanKirimTambahanSuccess({
                  feedback: response?.value.data,
                })
              );
            }
          } else {
            sweetalert.default.Failed(response?.value.pesan);
            dispatch(setDataLaporanKirimTambahanSuccess({ feedback: [] }));
            dispatch(
              setDataLaporanKirimTambahanFailed({
                error: response.value.pesan,
              })
            );
          }
        } else {
          dispatch(setLoadingButton(false));
          sweetalert.default.Failed(response.error.data.pesan);
          dispatch(
            setDataLaporanKirimTambahanFailed({ error: response.error })
          );
        }
      }
    }
  };

const data = [getAllDataLaporanKirimTambahan];

export default data;