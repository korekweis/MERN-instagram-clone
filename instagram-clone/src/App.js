import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { collection, getDocs } from "firebase/firestore";
import { db, auth, storage } from './firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth";
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ImageUpload from './ImageUpload';
import { doc, onSnapshot, orderBy, query } from "firebase/firestore";


function getModalStyle() { 
  const top = 50;
  const left = 50;

  return { 
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: { 
    position: "absolute",
    width: 400, 
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5], 
    padding: theme.spacing(2, 4, 3),
  }, 
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle); 
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false); // checking if the modal is open or not 
  const [openSignIn, setOpenSignIn] = useState(false); //to check if the user is signed in
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // for user authentication



  // fetching and displaying all of the posts
  const fetchPost = async() => {
    // TODO: tO DELETE
    const posts = collection(db, 'posts');
    const  q = query(posts, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    //TODO: delete 
    // const snapshot = await getDocs(posts);
    
    /** 
     * snapshot - eveytime the collection is deleted updated uploaded its gonna take a snapshot and its 
     * going to refire the code inside
    */
  //  TODO: DO THIS PART 
    setPosts(snapshot.docs.map((doc) => ({
      id: doc.id, 
      post: doc.data()
    })));
  }

  useEffect(() => { 
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) { 
        // if logged in 
        console.log(authUser);
        setUser(authUser); //this keeps you logged in 
      } else { 
        // if logged out
        setUser(null)
      }
    })

    return () => { 
      // perform clean up actions before you fire useEffect
      /** so if the username changes, we have to detach the listener so that 
       * there won't have duplicates and then we will refire it. 
       */
      unsubscribe();
    }

    // should place user and username since it should update everytime it changes
  }, [user, username]);


  //useEffect - runs a piece of code based on a specific condition
  useEffect(() => { 
    //this is where the code runs
    fetchPost();
    return () => {
      fetchPost();
    }
  }, []);
  // empty [] means to run the code once. If [posts] it means to run the code everytime posts change

  //function made for signing up
  const signUp = (event) => { 
    // so that the form won't refresh when we submit
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => { 
        return updateProfile(auth.currentUser, { 
          displayName: username
        });
        
        console.log(authUser);
        console.log(auth.user);
        // TODO: DELETE THIS
        // return updateProfile(auth.currentUser, { 
        //   displayName: username
        // });
      })
      .catch((error) => alert(error.message));
  }

  const signIn = (event) => { 
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => { 
        return updateProfile(auth.currentUser, {
          displayName: username
      });
    })
    .catch((error) => alert(error.message));
    
    setOpenSignIn(false); //we want modal to close
  }

  return (
    <div className="App">
      {/* Modal for sign up */}
      <Modal
        // copied from material UI 
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}> 
          <form>
            <center className="app_signUp">
              <img
                className="app_modalHeaderImg"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
              <Input 
                placeholder="username"
                type="text"
                value={ username }
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input 
                placeholder="email"
                type="text"
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                placeholder="password"
                type="password"
                value={ password }
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={ signUp }>Sign Up</Button>
            </center>
          </form>
        </div>
      </Modal>

      {/* Modal for sign in */}
      <Modal
        // copied from material UI 
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}> 
          <form>
            <center className="app_signUp">
              <img
                className="app_modalHeaderImg"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
              <Input 
                placeholder="email"
                type="text"
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                placeholder="password"
                type="password"
                value={ password }
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={ signIn }>Sign In</Button>
            </center>
          </form>
        </div>
      </Modal>

      {/* header */}
      <div className="app_header">
        <img className="app_headerImg"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="" >
        </img>

        {/* If user is logged in button should be Logged out */}
        {user ? (
          <Button onClick={() => signOut(auth)}>Logout</Button>
        ) : (
          <div className="app_loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <h1>HELLO</h1>
      {/* Bunch of posts: 
        - post 
        - post 
        - post
      */}
      <div className="post_container">

        <div className="app_posts">
          {
            posts.map(({id, post}) => (
              <Post postId={id} username={post.username} avatar={post.avatar} 
                imgsrc={post.imgsrc} caption={post.caption} key={id} />
            ))
          }
        </div>
        {/* check first if the user is signed in */}
        { user?.displayName ? (
          <div className="app_upload">
            <ImageUpload username = { user.displayName }/>
          </div>
        ):(
          <center> 
          <h3>Sorry you need to login to upload</h3>
          </center>
        )}
      </div>
    </div>
  );
}

export default App;
