import { API_URL } from "@env";

export const favoriteUser = async (user) => {
  const res = await fetch(`${API_URL}/user/favorites.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const resData = await res.json();
};

export const fetchFavoriteUsersList = async () => {
  const res = await fetch(`${API_URL}/user/favorites.json`);
  const resData = await res.json();
  return resData;
};
