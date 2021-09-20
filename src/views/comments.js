import { getUserData } from '../scripts/firestore.js';
import {
  currentUser,
} from '../scripts/auth.js';

export const itemComment = (objComment) => {
  const coments = document.createElement('section');
  coments.classList.add('all-comments');
  const isUser = (user) => {
    if (user || user !== null) {
      coments.innerHTML = `
        <section>
        
        <section class = "photo-comment-container">
        <img class="avatar-comment" src=""/>
      <section class = "comment-container">
        <p class="name-comment"></p>
        <p class = "comment-text">${objComment.comment}</p>
        <p class="time-comment">${objComment.date}</p>
      </section>
      </section>
        </section>
        `;
      getUserData(objComment.userId)
        .then((doc) => {
          const comentPhoto = coments.querySelector('.avatar-comment');
          const comentName = coments.querySelector('.name-comment');
          comentPhoto.src = doc.data().photo;
          comentName.textContent = doc.data().username;
        });
    } else {
      window.location.hash = '#/';
    }
  };

  currentUser(isUser);
  return coments;
};
