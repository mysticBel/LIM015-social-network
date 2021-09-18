import { currentUser, signOut } from '../scripts/auth.js';
import { postAdd, getPost } from '../scripts/firestore.js';
import { imgStorage } from '../scripts/storage.js';
import { itemPost } from './post.js';

export default (userX) => {
  const viewCommunity = document.createElement('section');
  const isUser = (user) => {
    if (user || user !== null) {
      viewCommunity.classList.add('container-community');
      viewCommunity.innerHTML = `
     

      <section class="main-header">
      <nav>
          <ul class="menu-header">
              <div id="left-menu-header" class="box">
                  <li class="home-header"><a href="#/community"><i class="fas fa-home"></i></a></li>
                  <li class="profile-header"><a href="#/profile"><i class="fas fa-user-circle"></i></a></li>
              </div>
              <li class="title-header box"><a href="#/community">Skyy </a></li>
              <li id="log-out-header" class="box"><span id="btn-singOut"><i class="fas fa-sign-out-alt"></i></span></li>
          </ul>
      </nav>
      <i id="hamburger-menu" class="fas fa-bars hide"></i>
       </section>

<section id="main-content">
          <section class="container-user-details-left">
            <p> Welcome back... 😉</p>
            <h2 id="name"> ${userX.username}</h2>
            <img class="avatar" src="${userX.photo}"/>
          </section>

 
          <main class="home-section">
          <!-- Post -->
          <div class="create-post">
            <div class="user">
              <img class="avatar-post" src="${userX.photo}"/>
              <p class="name">${userX.username}</p>

              
            </div>
            <div class="content-newpost">
              <form id = "form-post">
                <textarea class="text-newpost" placeholder="¿What do you want to share today?" spellcheck="false" required></textarea>
                <i id = "remove-img" style="display: none" class="fas fa-times-circle"></i>
                <img id="post-img" class="post-img" src=""/> <label class= "btn-uploadImg" for="upload-img"> Upload an image
                    <input type="file" accept="image/jpeg, image/png, image/gif" id="upload-img" class="upload-img">
                    <i class="far fa-file-image"></i>
                   
                  </label> 
                <div class="buttons-bar">
                 
                  <button type="submit" id="btn-post" class="btn-post" ><i class="fa fa-share-square-o"></i> Share</button>
                </div>
              </form>
            </div>
          </div>

          <section id="container-post"></section>
         
         </main>

        </section>




          `;
      const hamburgerBotton = viewCommunity.querySelector('#hamburger-menu');
      const homeNav = viewCommunity.querySelector('#left-menu-header');
      const singOut = viewCommunity.querySelector('#log-out-header');
      hamburgerBotton.addEventListener('click', () => {
        homeNav.classList.toggle('active');
        singOut.classList.toggle('active');
      });

      // ===== SIGN OUT =========
      const btnSignOut = viewCommunity.querySelector('#btn-singOut');
      btnSignOut.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
        signOut();
      });
      const imagePost = viewCommunity.querySelector('#post-img');
      const imageDelete = viewCommunity.querySelector('#remove-img');
      const uploadImg = viewCommunity.querySelector('#upload-img');

      //  ===== UPLOADS AN IMAGE =========
      uploadImg.addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          imagePost.src = reader.result;
        };
        imageDelete.removeAttribute('style');
      });
      //  ===== DELETES IMAGE FROM POST =========
      imageDelete.addEventListener('click', () => {
        imagePost.src = '';
        uploadImg.value = '';
        imageDelete.style.display = 'none';
      });

      //  ===== ADDS POST IN FIREBASE =========
      const savePost = viewCommunity.querySelector('#form-post');
      savePost.addEventListener('submit', (e) => {
        e.preventDefault();
        imagePost.src = '';
        imageDelete.style.display = 'none';
        const fileImage = e.target.closest('#form-post').querySelector('input')
          .files[0];
        // const load = viewCommunity.querySelector('#uploader');
        const postText = viewCommunity.querySelector('.text-newpost');
        // const enterModal = viewCommunity.querySelector('.modal-progress');
        // const textModal = viewCommunity.querySelector('#messageAlert');

        if (fileImage) {
          const uploadPost = imgStorage(fileImage, 'Skyy-imgPost');
          uploadPost.on(
            'state_changed',
            // (snapshot) => {
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // enterModal.classList.add('showModal');
            // viewCommunity.querySelector('#closeModal').style.display = 'none';
            // viewCommunity.querySelector('#uploader').style.display = 'block';
            // textModal.textContent = 'Success! Your publication is ready :D ';
            // load.value = progress;
            // },
            () => {},
            () => {
              uploadPost.snapshot.ref.getDownloadURL().then((downloadURL) => {
                postAdd(user.uid, postText.value, downloadURL).then(() => {
                  // enterModal.classList.remove('showModal');
                  savePost.reset();
                });
              });
            },
          );
        } else {
          postAdd(user.uid, postText.value, '').then(() => {
            // enterModal.classList.remove('showModal');
            savePost.reset();
          });
        }
      });
      const boxPost = viewCommunity.querySelector('#container-post');
      getPost((post) => {
        boxPost.innerHTML = '';
        post.forEach((objPost) => {
          boxPost.appendChild(itemPost(objPost));
        });
      });
    } else {
      window.location.hash = '#/';
    }
  };
  currentUser(isUser);
  return viewCommunity;
};

// var user = firebase.auth().currentUser;

// if (user) {
// User is signed in.
// } else {
// No user is signed in.
// }
