import React from 'react';

const PostList = (props) => {
    console.log('About', props.location.aboutProps);
    return (
        <div className="container">
            <div className="col-lg-8">
                <div className="panel panel-post">
                    <h3>TITLE</h3>
                    <p>DESCRIPTION</p>
                    <img height="120px" src={ "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752" || null } alt="X-X" />
                    <img height="120px" src={ "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752" || null } alt="X-X" />
                    <img height="120px" src={ "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752" || null } alt="X-X" />
                    <img height="120px" src={ "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752" || null } alt="X-X" />
                    <img height="120px" src={ "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752" || null } alt="X-X" />
                    <img height="120px" src={ "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752" || null } alt="X-X" />
                    <img height="120px" src={ "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752" || null } alt="X-X" />
                    <p>CATEGORIAS</p>
                </div>
                <div className="panel panel-post">
                    <textarea></textarea>
                    <button>send</button>
                </div>
            </div>
        </div>
    );
};

export default PostList;