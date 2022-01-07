import post from "../../../axios/post";
import word from "../../../shared/static";

const CloseJO = {
  getDetailCloseJO: async (dataKirim) => {
    const response = await post.AxiosPost({
      url: word.URL_GET_DETAIL_JO_CLOSE,
      data: dataKirim,
    });
    return response;
  },
  addCloseJOCheckout: async (dataKirim) => {
    const response = await post.AxiosPost({
      url: word.URL_ADD_CLOSE_JO,
      data: dataKirim,
    });
    return response;
  },
};

export default CloseJO;