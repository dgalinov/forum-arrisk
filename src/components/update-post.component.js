import React, { useState, useRef, useEffect } from 'react';
import firebase from '../firebase';
import CreatableSelect from 'react-select/creatable';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom';

const UpdatePost = (props) => {
    const {
        user,
        username
    } = props;
    console.log(props.location.state.post.post.title);
    const [title, setTitle] = useState(props.location.state.post.post.title);
    const editorRef = useRef(props.location.state.post.post.description);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [displayError, setDisplayError] = useState('');
    const [category, setCategory] = useState(props.location.state.post.post.category);
    const today = new Date();
    const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const history = useHistory();
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
    }
    const onSubmit = () => {
        if (title !== null && title !== '') {
            if (editorRef.current.getContent() !== null && editorRef.current.getContent() !== '') {
                if (category !== null && category !== '') {
                    firebase.firestore().collection("posts").doc(props.location.state.posts.id_post).update({
                        UID: user.email,
                        username: username,
                        title: title,
                        description: editorRef.current.getContent(),
                        likes: 0,
                        category: category,
                        image_urls: imageUrls,
                        created_at: dateTime,
                        updated_at: dateTime,
                    })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        // history.push('/post');
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                } else {
                    setDisplayError('No category assigned');
                }
            } else {
                setDisplayError('Description is empty');
            }
        } else {
            setDisplayError('Title is empty');
        }
    };
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel">
                    <div className="panel-content panel-bio">
                        <h1 className="h1">Update Post</h1>
                        <p className="display-error">{displayError}</p>
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
                        <div className="btnContainer">
                            <button className="btn btn-warning" onClick={onSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default UpdatePost;