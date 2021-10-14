import React, { useState, Firebase } from 'react'
import { Button } from '@mui/material';
import { storage, db } from './firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import 'firebase/storage';  
import { collection, addDoc, serverTimestamp } from "firebase/firestore";  


function ImageUpload(username) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        // get the first file that was selected since sometimes multiple files get selected
        if (e.target.files[0]) { 
            //then setImage to that state
            setImage(e.target.files[0]);
        }
    };

    const addImage = async(caption, url, username) => {
        await addDoc(collection(db, "posts"), {
            timestamp: serverTimestamp(),
            caption: caption, 
            imageUrl: url, 
            username: username
        });
    }

    const handleUpload = (e) => { 
        e.preventDefault();
        /**
         * in the storage get reference. Create a folder called images
         * image.name -> is the filename that was selected
         * put(image) -> put the image in that variable
         */
        const storageRef = ref(storage, `images/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef);
        // const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            // on state changed, give me a snapshot
            "state_changed", 
            (snapshot) => { 
                // progress function... 
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            }, (error) => { 
                // if there is an error while uploading
                console.log(error);
                alert(error.message);
            }, () => { 
                // if the upload is complete
                // storage
                //     .ref(storage, "images")
                //     .child(image.name)
                //     .getDownloadUrl()
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => { 
                        // post image inside the database
                        // db.collection("posts").add({ 
                        //     timestamp: Firebase.ServerValue.TIMESTAMP,
                        //     caption: caption, 
                        //     imageUrl: url, 
                        //     username: username
                        // });
                        addImage(caption, url, username);
                        

                        // set progress back to 0 once it's done! and reset everything else 
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        );
    };

    return (
        /* for uploading image: 
        - caption input 
        - file picker 
        - post button
        */
        <div>
            <progress className="imageUpload_progress" value={progress} max="100"/>
            <input type="text" 
            placeholder="Enter a caption..." 
            // event -> every action like key change and etc
            onChange={event => setCaption(event.target.value)}
            value={ caption } 
            />
           <input type="file" onChange={ handleChange }/>
           <Button onClick={ handleUpload }> Upload </Button>
        </div>
    )
}

export default ImageUpload
