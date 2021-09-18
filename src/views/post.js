import {
  getUserData, upgradeLike,
} from '../scripts/firestore.js';
import {
  currentUser,
} from '../scripts/auth.js';
// import { itemComment } from './comments.js';

export const itemPost = (objPost) => {
  const postElement = document.createElement('div');
  const isUser = (user) => {
    if (user || user !== null) {
      const userId = user.uid;
      // likes counter
      const reactionCounter = objPost.likes.length;
      postElement.classList.add('allpost');
      postElement.innerHTML = `
    <div class="mainpost">
    <div class="user-post">
      <div class="menu-post">
        <!-- <i class="fas fa-ellipsis-v btn-menu-post"></i>-->
        <ul id="menu-post-content" class="menu-post-content">
          <li id="edit-post"><i class="fas fa-edit select"></i> Edit</li>
          <li id="delete-post-${objPost.id}"><i class="fas fa-trash-alt select"></i> Delete</li>
        </ul>
      </div>               
      <img class="avatar-post" src=""/>
      <p class="name">
        <span class = "username"></span>
        <span class = "tooltiptext">
          <img class="tooltipimg" src=""/>
          <strong class="nametooltip"></strong> <br>
        </span>
      </p>
      
     
      <p class="time-post">${objPost.date}</p>
     <!-- <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      <i class="fa fa-trash-o" ></i> -->
      
    </div>       
    <div class="content-post">
      <p class="text-post">${objPost.publication}</p>
      <div class = "edit-text-post">
        <textarea class="edit-text">${objPost.publication}</textarea>
        <div class = "edit-text-btns">
          <button type="button" class="btn-save-edit-${objPost.id}">Save</button>
          <button type="button" class="btn-cancel-edit">Cancel</button>
        </div>
      </div>
      <img id="post-img" class="post-img" src='${objPost.urlimg}'/>
      <div class="like-comment-container">
      <section id="reactions">
       
        </section>
        <button type="button" id="btn-like" class=""><i class="fa fa-thumbs-up"></i>${reactionCounter} Like </button>
       <!-- <button type="button" id="btn-comment" class="btn-comment"><i class="fa fa-comment"></i>Comment </button>-->
      </div>`;

      // show name + avatar in every postElement
      getUserData(objPost.userId)
        .then((doc) => {
          const avatarPhoto = postElement.querySelector('.avatar-post');
          const username = postElement.querySelector('.username');
          const nametooltip = postElement.querySelector('.nametooltip');
          const tooltipimg = postElement.querySelector('.tooltipimg');
          avatarPhoto.src = doc.data().photo;
          username.textContent = doc.data().username;
          tooltipimg.src = doc.data().photo;
          nametooltip.textContent = doc.data().username.toUpperCase();
        });

      // store users likes
      const likes = postElement.querySelector('#btn-like');
      likes.addEventListener('click', () => {
        const result = objPost.likes.indexOf(userId);
        if (result === -1) {
          objPost.likes.push(userId);
          upgradeLike(objPost.id, objPost.likes);
        } else {
          objPost.likes.splice(result, 1);
          upgradeLike(objPost.id, objPost.likes);
        }
      });

      if (objPost.likes.indexOf(userId) === -1) {
        likes.className = 'btn-like-plane inactive-reaction';
      } else {
        likes.className = 'btn-like-plane active-reaction';
      }
    } else {
      window.location.hash = '#/';
    }
  };

  currentUser(isUser);
  return postElement;
};
