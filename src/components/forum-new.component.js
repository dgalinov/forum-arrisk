import React, { useState } from 'react';
import firebase from '../firebase';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Editor } from '@tinymce/tinymce-react';

const Post = (props) => {
    const {
        email
    } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [document, setDocument] = useState('');
    const [image, setImage] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [doc_url, setDocUrl] = useState('');
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
    let counter = 0;
    const handlePost = () => {
        firebase.firestore().collection("posts").add({
            UID: email,
            title: title,
            description: description,
            likes: 0,
            category: category,
            image_url: image_url,
            doc_url: doc_url,
            created_at: dateTime,
            updated_at: dateTime,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel">
                    <div className="panel-content panel-bio">
                        <h1>New Post</h1>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" id="title" className="form-control" placeholder="Title" autoFocus required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <Editor 
                                init={{
                                    height: 250,
                                    menubar: false
                                }}
                            />
                            {/* <textarea type="text" id="description" className="form-control" placeholder="Description" autoFocus required value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                        </div>
                        <div class="mb-3">
                            <CreatableSelect
                            isMulti
                            placeholder="Select category"
                            options={options}
                            // value={this.state.selectedOption}
                            // onChange={this.handleChange}
                            closeMenuOnSelect={false}
                            />
                        </div>
                        <div className="mb-3">
                            <img src={'http://via.placeholder.com/315x315'} alt="Uploaded images 315x315" height="120" />
                            <input type="file" />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Add Image</label>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                        </div>
                        <div className="btnContainer">
                            <button className="btn btn-warning" >Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default Post;