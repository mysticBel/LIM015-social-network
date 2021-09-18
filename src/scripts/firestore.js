// (1) User data !
export const userData = (user) => {
  const db = firebase.firestore();
  let Photo;
  let Name;
  if (user.photoURL != null && user.displayName != null) {
    Photo = user.photoURL;
    Name = user.displayName;
  } else {
    Photo = './images/default-avatar.jpg';
    Name = user.name;
  }
  return db.collection('Skyy_Users').doc(user.uid).set({
    username: Name,
    email: user.email,
    photo: Photo,
    photoCover: Photo,
    aboutme: 'add about me',
  });
};

// (2) get user data
export const getUserData = (userId) => firebase.firestore().collection('Skyy_Users').doc(userId).get();

// to add  to firestore

export const postAdd = (UserId, Publication, URLimg) => {
  const db = firebase.firestore();
  return db.collection('Skyy').add({
    userId: UserId,
    date: new Date().toLocaleString(),
    publication: Publication,
    urlimg: URLimg,
    likes: [],
  });
};

export const getPost = (callback) => {
  const db = firebase.firestore();
  db.collection('Skyy').orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      const post = [];
      querySnapshot.forEach((doc) => {
        post.push({ id: doc.id, ...doc.data() });
      });
      callback(post);
    });
};

export const removePost = (idPost) => firebase.firestore().collection('Skyy').doc(idPost).delete();

export const upgradePost = (idPost, updatePublication) => {
  const db = firebase.firestore();
  return db.collection('Skyy').doc(idPost).update({
    publication: updatePublication,
  });
};

export const upgradeLike = (id, likes) => firebase.firestore().collection('Skyy').doc(id).update({ likes });
