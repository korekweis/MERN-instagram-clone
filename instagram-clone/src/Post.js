import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';
import { db, auth, storage } from './firebase';
import { collection, getDocs, doc, addDoc, serverTimestamp, orderBy, query} from "firebase/firestore";

function Post({ postId, username, avatar, imgsrc, caption, currUser }) {

    const[comments, setComments] = useState([]);
    const[comment, setComment] = useState("");

    const addComment = async(postId, comment, currUser) => { 
        console.log(`currUser1: ${currUser}`);
        await addDoc(collection(db, "posts", postId, "comments"), {
            text: comment, 
            username: currUser.displayName,
            timestamp: serverTimestamp(),
        });
        console.log(`currUse2: ${currUser}`);
    }

    // posting of comments
    const postComment = (event) => { 
        event.preventDefault();
        addComment(postId, comment, currUser);
        // clear the box again
        setComment("");
    }

    //3:17
    const fetchComments = async() => { 
        console.log(`postId: ${postId}`);
        const comment_list = collection(db, "posts", postId, "comments");
        const q = query(comment_list, orderBy("timestamp"));
        const snapshot = await getDocs(q);

        setComments(snapshot.docs.map((doc) => ( 
            doc.data()
        )));
    }

    useEffect(() => {
        if (postId) { 
           fetchComments();
        }
        // return () => {
        //     // TODO: CHECK
        //     // unsubscribe();
        // }
    }, [postId]);

    return (
        <div className="post">
            {/* 
                Header: Avatar + username 
            */}
            <div className="post_header">
                <Avatar
                className="post_avatar"
                alt={ username }
                src= { avatar } />
                <h3>{ username }</h3>
            </div>

            {/* Image */}
            <img className="post_image" src={ imgsrc } alt="">
            </img>
            {/* Username and caption */}
            <h4 className="post_text"><strong>{ username }</strong> { caption }</h4>

            <div className="post_comments">
                {
                    comments.map((comment) => (
                    <p>
                        <strong>{ comment.username } </strong> { comment.text }
                    </p>
                ))}
            </div>

            { currUser && (
                <form className="post_commentBox"> 
                    <input className="post_input"
                        type="text"
                        placeholder="Add a comment..."
                        value={ comment }
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post_button"
                        // it is disabled if there is no comment
                        disabled={ !comment }
                        type="submit"
                        onClick={ postComment }
                        >
                        Post
                    </button>
                </form>
            )}
        </div>
    )
}

export default Post
