import instance from "../config/axios";
let token = localStorage.getItem("token");
export const createNews = async (news) => {
  try {
    const response = await instance.post(`/create-news`, news, {
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllNews = async (params) => {
  const { page, limit } = params.queryKey[1];
  try {
    const response = await instance.get(
      `/get-all-news${page ? `?_page=${page}` : ""}${
        limit ? `&_limit=${limit}` : ``
      }`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getNewsByAcount = async () => {
  try {
    const response = await instance.get("/get-news-by-acount", {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllNewsNoPage = async () => {
  try {
    const response = await instance.get(`/get-all-news`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getNewsById = async (id) => {
  try {
    const response = await instance.get(`/newss/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeNewsById = async (id) => {
  try {
    const response = await instance.delete(`/newss/${id}`, {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const editNews = async (news) => {
  try {
    const response = await instance.patch(`/newss/${news._id}/edit`, news, {
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};