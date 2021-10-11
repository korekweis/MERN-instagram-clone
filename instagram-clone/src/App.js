import React, { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "SundaeKids",
      avatar: "https://pbs.twimg.com/profile_images/881072525744066561/Huu_nrpb_400x400.jpg",
      imgsrc: "https://i.pinimg.com/originals/96/24/b7/9624b733da1adc91448ba4ab552c74d3.jpg", 
      caption: "My everyday mood!!"
    }, {
      username: "The Economist",
      avatar: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1e154b10868229.5631a16e7ce8f.jpg",
      imgsrc: "https://cdn.shopify.com/s/files/1/0591/1981/products/20200328_cna1280_0.jpg?v=1585335486",
      caption: "Is the government telling the truth?"
    }, {
      username: "Vogue",
      avatar: "https://prh.org/wp-content/uploads/2017/10/vogue-logos.jpg",
      imgsrc: "https://assets.vogue.com/photos/5877208c765c6c7b400ee583/master/w_1600%2Cc_limit/11-vogue-covers_113725704600.jpg",
      caption: "Nothing can beat the classic covers from the 1940s!"
    }
  ]);

  return (
    <div className="App">
      {/* header */}
      <div className="app_header">
        <img className="app_headerImg"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="" >
        </img>
      </div>
      <h1>HELLO</h1>
      {/* Bunch of posts: 
        - post 
        - post 
        - post
      */}
      <div className="post_container">
        {
          posts.map((post, index) => (
            <Post username={post.username} avatar={post.avatar} imgsrc={post.imgsrc} caption={post.caption}
            key={index} />
          ))
        }

        {/* <Post username="SundaeKids"
          avatar="https://pbs.twimg.com/profile_images/881072525744066561/Huu_nrpb_400x400.jpg"
          imgsrc="https://i.pinimg.com/originals/96/24/b7/9624b733da1adc91448ba4ab552c74d3.jpg"
          caption="My everyday mood!!"
        />
        <Post username="The Economist"
          avatar="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1e154b10868229.5631a16e7ce8f.jpg"
          imgsrc="https://cdn.shopify.com/s/files/1/0591/1981/products/20200328_cna1280_0.jpg?v=1585335486"
          caption="Is the government telling the truth?"
        />
        <Post username="Vogue"
          avatar="https://prh.org/wp-content/uploads/2017/10/vogue-logos.jpg"
          imgsrc="https://assets.vogue.com/photos/5877208c765c6c7b400ee583/master/w_1600%2Cc_limit/11-vogue-covers_113725704600.jpg"
          caption="Nothing can beat the classic covers from the 1940s!"
        /> */}
      </div>
    </div>
  );
}

export default App;
