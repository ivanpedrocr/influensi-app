import firebase from "firebase";

export const writeReview = async (
  review,
  rating,
  reviewedUser,
  reviewer,
  onError
) => {
  const db = firebase.database();
  const reviewKey = db.ref(`reviews`).push().key;
  try {
    await db.ref().update({
      [`users/${reviewer}/writtenReviews/${reviewKey}`]: true,
      [`users/${reviewedUser}/reviews/${reviewKey}`]: true,
      [`reviews/${reviewKey}`]: { review, rating, reviewedUser, reviewer },
    });
  } catch (e) {
    onError(e);
  }
};

export default writeReview;
