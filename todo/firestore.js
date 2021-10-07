'use strict';

// [START bookshelf_firestore_client]
const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();
const collection = 'Tasks';
// [END bookshelf_firestore_client]

// Creates a new book or updates an existing book with new data.
async function update(userId, id, data) {
    let ref;
    console.log("ref: " + id);
    console.log(data);
    if (id === null) {
        ref = db.collection(collection).doc(1).collection(collection).doc();
    } else {
        ref = db.collection(collection).doc(userId).collection(collection).doc(id);
    }
    data.id = ref.id;

    data = {...data };
    await ref.set(data);
    return data;
}

async function create(userId, data) {
    return await update(userId, null, data);
}

async function getDataFor(user, id) {
    const userTasksRef = db.collection(collection).doc(user).collection(collection);
    const queryRef = userTasksRef
        .where('id', '==', id);
    const snapshot = await queryRef
        .get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        //return;
    }
    var tasks = null;
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        tasks = doc;
    });
    if (tasks !== null) {
        return tasks.data();
    } else {
        return ''
    }
}
module.exports = {
    create,
    update,
    getDataFor,
};