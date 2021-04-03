fb = {

    update__Doc__To__Library: function(key, data, callback) {
        const db = firebase.firestore();
        var lib = db.collection("library");

        // save the book!
        lib.doc(key).set({
            key: key,
            data: data,
        }).then(function() {
            // now index that book!
            var lib_index = db.collection("library_index");
            lib_index.doc(key).set({
                key: key,
                ref_doc: db.collection("library").doc(key)
            }).then(function() {
                if (callback) {
                    callback();
                }
            })
        })

    },


    getAll__Docs__From__Library_Index: async function() {
        const db = firebase.firestore();
        var lib = db.collection("library_index");

        const snapshot = await lib.get()
        return snapshot.docs.map(doc => doc.data()).map(doc => doc.key);
    },

    get__Doc__From__Library: async function(key) {
        const db = firebase.firestore();
        var lib = await db.collection("library").doc(key).get();
        return lib.data().data;
    },


    set__Infos_Basic__ToDb: function(data) {

        const db = firebase.firestore();
        var infors = db.collection("infors");

        infors.doc("basic").set(data)
    },

    get__Infos_Basic__FromDb: function(callback) {
        const db = firebase.firestore();
        var docRef = db.collection("infors").doc("basic");

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                if (callback) {
                    callback(doc.data())
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    },

    update__Infos_Basic__ToDb: function(data, callback) {
        const db = firebase.firestore();
        var infors = db.collection("infors");

        infors.doc("basic").update(data).then(function(doc){
            
            if (callback) {
                callback()
            }
        })
    },

    set__Words__ToDb: function(word, data) {

        const db = firebase.firestore();
        var words = db.collection("words");

        words.doc(word).set(data)
    },

    getSingle_Words_FromDb: function(word, callback) {
        const db = firebase.firestore();
        var docRef = db.collection("words").doc(word);

        docRef.get().then(function(doc) {
            var data = ''
            if (doc.exists) {
                console.log("Document data:", doc.data());
                data = doc.data()
            } else {
                console.log("No such document!");
            }

            if (callback) {
                callback(data)
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    },

    getAll__Words__FromDb: function(callback) {
        const db = firebase.firestore();
        var wordCollect = db.collection("words");

        wordCollect.get().then(function(collect) {
            if (collect.exists) {
                console.log("Return data:", collect.data());
                if (callback) {
                    callback(collect.data())
                }
            } else {
                console.log("No such data!");
            }
        }).catch(function(error) {
            console.log("Error getting data:", error);
        });
    },
}