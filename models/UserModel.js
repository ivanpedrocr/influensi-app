class UserModel {
  constructor(
    username,
    firstName,
    lastName,
    age,
    description,
    accountType,
    rating,
    averageReturn,
    followers,
    avatar
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.description = description;
    this.accountType = accountType;
    this.rating = rating;
    this.averageReturn = averageReturn;
    this.followers = followers;
    this.avatar = avatar;
  }
}

export default UserModel;
