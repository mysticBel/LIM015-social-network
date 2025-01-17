/* eslint-disable max-len */
/* eslint-disable no-console */

// email login
export const signIn = (email, password) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};

// create new user in Firebase
export const signUp = (email, password) => {
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
};

// Google login
export const loginGoogle = () => {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

// logout

export const signOut = () => firebase.auth().signOut();
// export const signOut = () => {
//   const auth = firebase.auth();
//   auth.signOut().then(() => {
//     // console.log('signed-out');
//     window.location.reload();
//   }).catch((err) => {
//     console.log(err);
//   });
// };

// send email verification email to new user
export const emailVerification = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification();
};
// onAuthStateChanged (admin. users in firebase)
export const currentUser = (callback) => firebase.auth().onAuthStateChanged((user) => callback(user));
