import React from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';

function Post({ username, avatar, imgsrc, caption }) {
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
        </div>
    )
}

export default Post
