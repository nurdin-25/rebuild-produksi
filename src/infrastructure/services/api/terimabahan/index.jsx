import get from "../../../axios/get";
import post from "../../../axios/post";
import word from "../../../shared/static";

const TerimaBahan = {
  getBahan: async (data) => {
    if (data.divisi?.toUpperCase() === "ADMIN BAHAN") {
      if (data.divisi_tujuan?.toUpperCase() === "ADMIN PUSAT") {
        const response = await get({
          url:
            word.URL_GET_BAHAN_TUKANG +
            `divisi_asal=${data.divisi}&divisi_tujuan=ADMIN PUSAT&tukang_asal=${data.tukang_asal}`,
        });
        return response;
      } else {
        const response = await get({
          url:
            word.URL_GET_BAHAN_PUSAT +
            `divisi=ADMIN BAHAN&tukang=${data.tukang_asal}`,
        });
        return response;
      }
    } else {
      const response = await get({
        url:
          word.URL_GET_BAHAN_TUKANG +
          `divisi_asal=${data.divisi}&divisi_tujuan=${data.divisi_tujuan}&tukang_asal=${data.tukang_asal}`,
      });
      return response;
    }
  },
  getBahanNew: async (data) => {
    const response = await get({
      url:
        word.URL_GET_BAHAN_KIRIM_NEW +
        `divisi_asal=${data.divisi}&divisi_tujuan=${data.divisi_tujuan}&tukang_asal=${data.tukang_asal}&tukang_tujuan=${data.tukang_tujuan}&nama_bahan=${data.nama_bahan}`,
    });
    return response;
  },
  getTukangTerimaDivisi: async (divisi) => {
    const response = await get({ url: word.URL_GET_TUKANG_DIVISI + divisi });
    return response;
  },
  getTukangAsalTerimaDivisi: async (divisi) => {
    const response = await get({ url: word.URL_GET_TUKANG_DIVISI + divisi });
    return response;
  },
  getTerimaTambahanByTukang: async ({ dataKirim }) => {
    const response = await get({
      url: word.URL_GET_BAHAN_TERIMA_TAMBAHAN + dataKirim.staff,
    });
    return response;
  },
  getSaldoBahanOpen: async ({ dataKirim }) => {
    const response = await post.AxiosPost({
      url: word.URL_GET_SALDO_KIRIM_BAHAN_OPEN,
      data: dataKirim,
    });
    return response;
  },
  addTerimaBahan: async (dataKirim) => {
    const response = await post.AxiosPost({
      url: word.URL_ADD_TERIMA_BAHAN,
      data: dataKirim,
    });
    return response;
  },
  getDetailBahan: async (data) => {
    const response = await get({
      url:
        word.URL_GET_DETAIL_BAHAN_TUKANG +
        `divisi_asal=${data.divisi_asal}&divisi_tujuan=${data.divisi}&tukang_asal=${data.tukang}&nama_bahan=${data.nama_bahan}`,
    });
    return response;
  },
  getDivisiAll: async () => {
    const response = await get({
      url: word.URL_GET_ALL_DIVISI,
    });
    return response;
  },
};

export default TerimaBahan;
