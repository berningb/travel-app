angular.module('app').factory('fbRef', function(rootRef, auth) {
    return {
        getPreferencesRef: function() {
            return rootRef.child('preferences').child(auth.$getAuth().uid);
        },
        getTripsRef: function() {
            return rootRef.child('trips').child(auth.$getAuth().uid);
        },
        getTripRef: function(id) {
            return rootRef.child('trips').child(auth.$getAuth().uid).child(id);
        },
        removeRef: function(id) {
            return rootRef.child('trips').child(auth.$getAuth().uid).child(id).remove();
        },
        updateRef: function(id, updatedObject) {
            return rootRef.child('trips').child(auth.$getAuth().uid).child(id).update(updatedObject);
        }
    }
})