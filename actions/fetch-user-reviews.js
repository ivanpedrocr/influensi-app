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
          const reviewData = await reviewSnapshot.val();
          const reviewerRef = db.ref(`users/${reviewData.reviewer}`);
          const first_name = await reviewerRef
            .child("first_name")
            .get()
            .then((s) => s.val());
          const last_name = await reviewerRef
            .child("last_name")
            .get()
            .then((s) => s.val());
          const business_name = await reviewerRef
            .child("business_name")
            .get()
            .then((s) => s.val());
          const avatar = await reviewerRef
            .child("avatar")
            .get()
            .then((s) => s.val());
          const name = business_name || `${first_name} ${last_name}`;
          return { ...reviewData, reviewer: { name, avatar } };
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
