import React, { Component } from "react";
import ForumDataService from "../services/forum.service";

export default class Forum extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateForum = this.updateForum.bind(this);
        this.deleteForum = this.deleteForum.bind(this);
        this.state = {
        currentForum: {
            key: null,
            title: "",
            description: "",
            published: false,
        },
        message: "",
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { forum } = nextProps;
        if (prevState.currentForum.key !== forum.key) {
        return {
            currentForum: forum,
            message: ""
        };
        }
        return prevState.currentForum;
    }
    componentDidMount() {
        this.setState({
        currentForum: this.props.forum,
        });
    }
    onChangeTitle(e) {
        const title = e.target.value;
        this.setState(function (prevState) {
            return {
                currentForum: {
                ...prevState.currentForum,
                title: title,
                },
            };
        });
    }
    onChangeDescription(e) {
        const description = e.target.value;
        this.setState((prevState) => ({
        currentForum: {
            ...prevState.currentForum,
            description: description,
        },
        }));
    }
    updatePublished(status) {
        ForumDataService.update(this.state.currentForum.key, {
        published: status,
        })
        .then(() => {
            this.setState((prevState) => ({
            currentForum: {
                ...prevState.currentForum,
                published: status,
            },
            message: "The status was updated successfully!",
            }));
        })
        .catch((e) => {
            console.log(e);
        });
    }
    updateForum() {
        const data = {
        title: this.state.currentForum.title,
        description: this.state.currentForum.description,
        };
        ForumDataService.update(this.state.currentForum.key, data)
        .then(() => {
            this.setState({
            message: "The forum was updated successfully!",
            });
        })
        .catch((e) => {
            console.log(e);
        });
    }
    deleteForum() {
        ForumDataService.delete(this.state.currentForum.key)
        .then(() => {
            this.props.refreshList();
        })
        .catch((e) => {
            console.log(e);
        });
    }
    render() {
        const { currentForum } = this.state;
        return (
            <div>
                <h4>Forum</h4>
                {currentForum ? (
                <div className="edit-form">
                    <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={currentForum.title}
                        onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={currentForum.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>
                        <strong>Status:</strong>
                        </label>
                        {currentForum.published ? "Published" : "Pending"}
                    </div>
                    </form>
                    {currentForum.published ? (
                    <button
                        className="badge badge-primary mr-2"
                        onClick={() => this.updatePublished(false)}
                    >
                        UnPublish
                    </button>
                    ) : (
                    <button
                        className="badge badge-primary mr-2"
                        onClick={() => this.updatePublished(true)}
                    >
                        Publish
                    </button>
                    )}
                    <button
                    className="badge badge-danger mr-2"
                    onClick={this.deleteForum}
                    >
                    Delete
                    </button>
                    <button
                    type="submit"
                    className="badge badge-success"
                    onClick={this.updateForum}
                    >
                    Update
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Forum...</p>
                </div>
                )}
            </div>
        );
    }
}