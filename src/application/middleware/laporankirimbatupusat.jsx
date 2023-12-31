//API => call api in infrastructure -> service -> api
// log => for call console.log and dynamic console.log
//writeLocal for write data to local ( dynamic write depend on mode in env) if production its automatically encrypted
//getLocal for get data from local ( dynamic write depend on mode in env) if production its automatically encrypted
// toas for show toast to screen, its have 4 varians (.Success , .Failed, .Warning, .Info)
// sweetalert for show sweetalert to screen, its have 4 varians (.Success , .Failed, .Warning, .Info)
// dispatch for dispactching action, like store data to reducer, and others
// getState is FUNCTION for get current data in your state (reducer), just call getState().yourReducer.yourData

import {
  GET_ALL_LAPORAN_KIRIM_BATU_PUSAT,
  setDataLaporanKirimBatuPusatSuccess,
  setDataLaporanKirimBatuPusatFailed,
} from "../actions/laporankirimbatupusat";
import { setLoadingButton } from "../actions/ui";
import Moment from "moment";
import * as sweetalert from "../../infrastructure/shared/sweetalert";

const getAllDataLaporanKirimBatuPusat =
  ({ api, log, writeLocal, getLocal, toast }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_ALL_LAPORAN_KIRIM_BATU_PUSAT) {
      dispatch(setLoadingButton(true));
      dispatch(setDataLaporanKirimBatuPusatSuccess({ feedback: [] }));
      const data = getState().form.FormLaporanKirimBatuPusat.values;

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
        writeLocal("laporan_kirim_batu_pusat", dataOnsend);

        api.LaporanKirimBatuPusat.getAllLaporanKirimBatuPusat(dataOnsend).then(
          (res) => {
            dispatch(setLoadingButton(false));
            if (res.value !== null) {
              if (res.value.length === 0) {
                sweetalert.default.Failed("Data Laporan Kosong !");
                dispatch(setDataLaporanKirimBatuPusatSuccess({ feedback: [] }));
              } else {
                sweetalert.default.SuccessNoReload("Berhasil Mengambil Data !");
                dispatch(
                  setDataLaporanKirimBatuPusatSuccess({ feedback: res.value })
                );
              }
            } else {
              sweetalert.default.Failed(
                res.error?.data.message || "Terjadi Kesalahan !"
              );
              dispatch(setDataLaporanKirimBatuPusatSuccess({ feedback: [] }));
              dispatch(
                setDataLaporanKirimBatuPusatFailed({ error: res.error })
              );
            }
          }
        );
      }
    }
  };

const data = [getAllDataLaporanKirimBatuPusat];

export default data;
