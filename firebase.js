fb = {
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
}