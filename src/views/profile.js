/* eslint-disable no-console */
import { getPost, coveragePhoto } from '../scripts/firestore.js';
import { currentUser, signOut } from '../scripts/auth.js';
import { imgStorage } from '../scripts/storage.js';
import { itemPost } from './post.js';

export default (dataCurrentUser) => {
  const viewProfile = document.createElement('div');

  const isUser = (user) => {
    if (user || user !== null) {
      viewProfile.classList.add('profile-container');
      viewProfile.innerHTML = `
  <section class="main-header">
  <nav>
  <ul class="menu-header">
    <div id="left-menu-header" class= "box">
      <li class="home-header"><a href="#/community"><i class="fas fa-home"></i></a></li>
      <li class="profile-header"><a href="#/profile"><i class="fas fa-user-circle"></i></a></li>
    </div>
      <li class="title-header box"><a href="#/home">Skyy</a></li>
      <li id="log-out-header" class="box"><span id ="btn-singOut"><i class="fas fa-sign-out-alt"></i></span></li>
  </ul>
  </nav>
  <i id="hamburger-menu" class="fas fa-bars hide"></i>
  </section>
  
  <div class="profile-content">
  <div class="profile-background">
    <div class="profile-information shadow">
    <div class="cover-page">
    <img class="cover-photo" src="${dataCurrentUser.photoCover}">
  </div>
  <label id="select-cover" for="select-cover-page">
    <input type="file" id="select-cover-page" class="hide" accept="image/jpeg, image/png">
    <span class="edit-cover"><i class="fas fa-camera edit-photo-btn"></i></span>
  </label>
   
      <div class="profile-photo">
        <img class="photo" src="${dataCurrentUser.photo}">
      </div>
      
      <div class="user-information">
        <h2 class="user-name">${dataCurrentUser.username}</p>
        
      </div>
    </div>
  </div>
</div>
<section class ="container-user-post">
  <p> Aún no tienes publicaciónes! </p>
</section>


`;

      const btnSignOut = viewProfile.querySelector('#btn-singOut');
      btnSignOut.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
        signOut();
      });
      const hamburgerBotton = viewProfile.querySelector('#hamburger-menu');
      const homeNav = viewProfile.querySelector('#left-menu-header');
      const singOut = viewProfile.querySelector('#log-out-header');
      hamburgerBotton.addEventListener('click', () => {
        homeNav.classList.toggle('active');
        singOut.classList.toggle('active');
      });

      const selectCoverPage = viewProfile.querySelector('#select-cover-page');
      selectCoverPage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const uploadTask = imgStorage(file, 'Skyy-imgCover');
        uploadTask.on('state_changed', (snapshot) => {
          // Handle progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        }, () => {
          // fallo de carga
        }, () => {
          // carga exitosa
          uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              coveragePhoto(user.uid, downloadURL)
                .then(() => window.location.reload());
            });
        });
      });

      // adding posts
      const containerUserPost = viewProfile.querySelector('.container-user-post');
      getPost((post) => {
        containerUserPost.innerHTML = '';
        post.forEach((objPost) => {
          if (user.uid === objPost.userId) {
            containerUserPost.appendChild(itemPost(objPost));
          }
        });
      });
    } else {
      window.location.hash = '#/';
    }
  };
  currentUser(isUser);
  return viewProfile;
};
