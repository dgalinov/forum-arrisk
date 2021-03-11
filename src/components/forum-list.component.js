import React, { Component } from 'react';
import ForumDataService from '../services/forum.service';

import Forum from './forum.component';

export default class ForumList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveList = this.setActiveList.bind(this);
        this.removeAllForums = this.removeAllForums.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.state = {
            lists: [],
            currentList: null,
            currentIndex: -1
        };
    }
    componentDidMount() {
        ForumDataService.getAll().on('value', this.onDataChange);
    }
    componentDidUnmount() {
        ForumDataService.getAll().off('value', this.onDataChange);
    }
    onDataChange(items) {
        let forums = [];

        items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            forums.push({
            key: key,
            title: data.title,
            description: data.description,
            published: data.published,
            });
        });

        this.setState({
            forums: forums,
        });
    }
    refreshList() {
        this.setState({
            currentForum: null,
            currentIndex: -1,
        });
    }
    setActiveList(forum, index) {
        this.setState({
            currentForum: forum,
            currentIndex: index,
        });
    }
    removeAllForums() {
        ForumDataService.deleteAll()
        .then(() => {
            this.refreshList();
        })
        .catch((e) => {
            console.log(e);
        });
    }
    render() {
        const { forums, currentForum, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-6">
                <h4>Forums List</h4>
                <ul className="list-group">
                    {forums &&
                    forums.map((forum, index) => (
                        <li className={ "list-group-item " + (index === currentIndex ? "active" : "") } onClick={() => this.setActiveList(forum, index)} key={index}>
                            {forum.title}
                        </li>
                    ))}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllForums}>
                    Remove All
                </button>
                </div>
                <div className="col-md-6">
                {currentForum ? (
                    <Forum
                    forum={currentForum}
                    refreshList={this.refreshList}
                    />
                ) : (
                    <div>
                    <br />
                    <p>Please click on a Forum...</p>
                    </div>
                )}
                </div>
            </div>
        );
    }
}