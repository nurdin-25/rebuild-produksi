import get from "../../../axios/get";
import word from "../../../shared/static";

const LaporanLebur = {
  getAllKirimLebur: async (params) => {
    const response = await get({
      url:
        word.URL_GET_LAPORAN_KIRIM_LEBUR +
        params.tgl_awal +
        "&" +
        params.tgl_akhir,
    });
    return response;
  },
  getAllTerimaLebur: async (params) => {
    const response = await get({
      url:
        word.URL_GET_LAPORAN_TERIMA_LEBUR +
        params.tgl_awal +
        "&" +
        params.tgl_akhir,
    });
    return response;
  },
};

export default LaporanLebur;
