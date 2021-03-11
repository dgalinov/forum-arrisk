import firebase from '../firebase';

const db = firebase.database().ref('/forum');

class ForumDataService {
    getAll() {
        return db;
    }
    create(forum) {
        return db.push(forum);
    }
    update(key, value) {
        return db.child(key).update(value);
    }
    delete(key) {
        return db.child(key).remove();
    }
    deleteAll() {
        return db.remove();
    }
}

export default new ForumDataService();