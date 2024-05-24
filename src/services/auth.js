import instance from "../config/axios";

export const signup = async (user) => {
  try {
    const response = await instance.post("/auth/signup", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const signin = async (user) => {
  try {
    const response = await instance.post("/auth/signin", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
