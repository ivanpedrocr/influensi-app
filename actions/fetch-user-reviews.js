import firebase from "firebase";

export const fetchUserReviews = async (userId, onError = (error) => {}) => {
  const db = firebase.database();
  try {
    const userReviewsListSnapshot = await db
      .ref(`users/${userId}/reviews`)
      .get();
    const userReviewsList = await userReviewsListSnapshot.val();
    if (userReviewsList) {
      const reviews = await Promise.all(
        Object.keys(userReviewsList).map(async (reviewId) => {
          const reviewSnapshot = await db.ref(`reviews/${reviewId}`).get();
          return await reviewSnapshot.val();
        })
      );
      return reviews;
    } else {
      return [];
    }
  } catch (e) {
    onError(e);
  }
};
