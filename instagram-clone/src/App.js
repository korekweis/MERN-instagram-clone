import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { doc, collection, onSnapshot, getDocs } from "firebase/firestore";
import { db, auth, storage } from './firebase';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';



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
  //checking if the modal is open or not 
  const [open, setOpen] = useState(false);

  const fetchPost = async() => {
    const posts = collection(db, 'posts');
    const snapshot = await getDocs(posts);
    /** 
     * snapshot - eveytime the collection is deleted updated uploaded its gonna take a snapshot and its 
     * going to refire the code inside
    */
    setPosts(snapshot.docs.map((doc) => ({
      id: doc.id, 
      post: doc.data()
    })));
  }

  //useEffect - runs a piece of code based on a specific condition
  useEffect(() => { 
    //this is where the code runs
    fetchPost();
  }, []);
  // empty [] means to run the code once. If [posts] it means to run the code everytime posts change

  return (
    <div className="App">

      <Modal
        // copied from material UI 
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}> 
          <h2>I AM A MODAL</h2>
        </div>
      </Modal>

      {/* header */}
      <div className="app_header">
        <img className="app_headerImg"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="" >
        </img>
      </div>

      <Button></Button>

      <h1>HELLO</h1>
      {/* Bunch of posts: 
        - post 
        - post 
        - post
      */}
      <div className="post_container">
        {
          posts.map(({id, post}) => (
            <Post username={post.username} avatar={post.avatar} imgsrc={post.imgsrc} caption={post.caption}
            key={id} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
