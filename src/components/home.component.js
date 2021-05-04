import React from 'react';

const HomePage = () => {
    return (
        <div className="container">
            <div class="p-4 p-md-5 mb-4 text-white rounded bg-orange">
                <div class="col-md-6 px-0 text-carrousel">
                    <h1 class="display-2 fst-italic">Arrisk APK</h1>
                    <p class="lead my-3">Fight your way through an awesome adventure 2D platformer with hundreds of different enemies and maps.</p>
                    <p class="lead my-3">To save the world of Arrisk, you will have to travel through different levels, saving civilians and fighting with whoever stands in your way.</p>
                    <p class="lead mb-0"><button className="btn btn-warning">Download for free!</button></p>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="panel">
                    <div className="panel-content panel-bio">
                        <h1>Latest Posts</h1>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-content panel-bio">
                        <h1>Top Posts with Most Likes</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
