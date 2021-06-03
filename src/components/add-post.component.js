import React, { useState, useRef } from 'react';
import firebase from '../firebase';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Editor } from '@tinymce/tinymce-react';

const AddPost = (props) => {
    const {
        user,
        username
    } = props;
    console.log(user.email);
    const [title, setTitle] = useState('');
    const editorRef = useRef(null);
    const [image, setImage] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const today = new Date();
    const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const options = [
        { value: "juegos", label: "juegos" },
        { value: "coches", label: "coches" },
        { value: "peliculas", label: "peliculas" },
        { value: "series", label: "series" },
        { value: "musica", label: "musica" },
        { value: "tecnologia", label: "tecnologia" }
    ];
    const handleChange = category => {
        setCategory(category);
        console.log(category);
    }
    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            setImage(image);
            console.log(image);
        }
    }
    const handlePost = () => {
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, 
        (error) => {
            console.log(error);
        }, 
        () => {
            
        });
        firebase.storage().ref('images').child(image.name).getDownloadURL().then(image_url => {
            setImageUrl(image_url);
            firebase.firestore().collection("posts").add({
                UID: user.email,
                username: username,
                title: title,
                description: editorRef.current.getContent(),
                likes: 0,
                category: category,
                image_url: image_url,
                // doc_url: doc_url,
                created_at: dateTime,
                updated_at: dateTime,
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        });
    }
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel">
                    <div className="panel-content panel-bio">
                        <h1 className="h1">New Post</h1>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" id="title" className="form-control" placeholder="Title" autoFocus required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                init={{
                                    height: 250,
                                    menubar: false
                                }}
                            />
                        </div>
                        <div className="mb-3 droplist">
                            <CreatableSelect
                            isMulti
                            placeholder="Select category"
                            options={options}
                            value={category}
                            onChange={handleChange}
                            closeMenuOnSelect={false}
                            />
                        </div>
                        <div class="row">
                            <div class="col form-group">
                                <label>Add Image</label>
                                <input type="file" className="form-control-file" id="post_image" onClick={handleImageChange} />
                            </div>
                            {/* <div class="col form-group">
                                <label>Add Doc</label>
                                <input type="file" class="form-control-file" />
                            </div> */}
                        </div>
                        <div className="btnContainer">
                            <button className="btn btn-warning" onClick={handlePost}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default AddPost;