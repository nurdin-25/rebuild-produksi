import get from "../../../axios/get";
import post from "../../../axios/post";
import deleteAxios from "../../../axios/delete";
import put from "../../../axios/put";
import word from "../../../shared/static";

const MasterTukang = {
  getAllMasterTukang: async () => {
	const response = await get({url : word.URL_GET_ALL_MASTER_TUKANG});
	return response;
  },
  addMasterTukang: async (data) => {
	const response = await post.AxiosPost(word.URL_ADD_MASTER_TUKANG, data);
	return response;
  },
  deleteMasterTukang: async (data) => {
	const response = await deleteAxios(
	  word.URL_DELETE_MASTER_TUKANG + data
	);
	return response;
  },
  editMasterTukang: async (url, data) => {
	const response = await put(word.URL_UPDATE_MASTER_TUKANG + url, data);
	return response;
  },
};

export default MasterTukang;