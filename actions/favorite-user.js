import { API_URL } from "@env";

export const favoriteUser = async (user, { token, userId }) => {
  const res = await fetch(`${API_URL}/${userId}/favorites.json?auth=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const resData = await res.json();
};

export const fetchFavoriteUsersList = async ({ token, userId }) => {
  const res = await fetch(`${API_URL}/${userId}/favorites.json?auth=${token}`);
  const resData = await res.json();
  return resData;
};
