import get from "../../../axios/get";
import post from "../../../axios/post";
import word from "../../../shared/static";

const KirimLebur = {
  getAllHistoryKirimLebur: async () => {
    const response = await get({ url: word.URL_GET_HISTORY_KIRIM_LEBUR });
    return response;
  },
  getAllSaldoBahanOpen: async ({ dataKirim }) => {
    const response = await get({
      url: word.URL_GET_ALL_SALDO_BAHAN_OPEN + `${dataKirim.asal_bahan}`,
    });
    return response;
  },
  getAllSaldoBahan: async ({ dataKirim }) => {
    const response = await get({
      url:
        word.URL_GET_ALL_SALDO_BAHAN +
        `${dataKirim.asal_bahan}/${dataKirim.no_abu}/${dataKirim.keterangan}`,
    });
    return response;
  },
  addDataKirimLebur: async ({ dataKirim }) => {
    const response = await post.AxiosPost({
      url: word.URL_ADD_KIRIM_LEBUR,
      data: dataKirim,
    });
    return response;
  },
};

export default KirimLebur;
