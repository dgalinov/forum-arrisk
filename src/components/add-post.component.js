import React, { useState, useRef } from 'react';
import firebase from '../firebase';
import CreatableSelect from 'react-select/creatable';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom';

const AddPost = (props) => {
    const {
        user,
        username
    } = props;
    const [title, setTitle] = useState('');
    const editorRef = useRef(null);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [displayError, setDisplayError] = useState('');
    const [category, setCategory] = useState('');
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
    const onImageChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
            
        }
        console.log(images.length);
    };
    const uploadImages = () => {
        const promises = [];
        images.map((image) => {
            const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                    console.log(error);
                },
                async () => {
                    await firebase.storage()
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setImageUrls(prevState => [...prevState, url]);
                    });
                }
            );
        });
        Promise.all(promises)
        .then(() => {
        })
        .catch((err) => console.log(err));
    }
    const onSubmit = () => {
        if (title !== null && title !== '') {
            if (editorRef.current.getContent() !== null && editorRef.current.getContent() !== '') {
                if (category !== null && category !== '') {
                    const newCategory = category.map(({
                        __isNew__: isNew,
                        ...rest
                    }) => ({
                        isNew,
                        ...rest
                    }));
                    firebase.firestore().collection("posts").add({
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
                        history.push('/post-list');
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
                        <h1 className="h1">New Post</h1>
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
                        <div className="row">
                            <div className="col form-group">
                                <label>Add Image</label>
                                <input type="file" multiple onChange={onImageChange} />
                            </div>
                            <br />
                            {imageUrls.map((imageUrl, i) => (
                                <div key={i}>
                                <a href={imageUrl} target="_blank">
                                    {imageUrl}
                                </a>
                                </div>
                            ))}
                            <br />
                            {imageUrls.map((imageUrl, i) => (
                                <img
                                key={i}
                                style={{ width: "500px" }}
                                src={imageUrl || "http://via.placeholder.com/300"}
                                alt="firebase-image"
                                />
                            ))}
                        </div>
                        <button className="btn btn-outline-warning" onClick={uploadImages}>upload images</button>
                        <div className="btnContainer">
                            <button className="btn btn-warning" onClick={onSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default AddPost;