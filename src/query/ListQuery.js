import firebase from 'react-native-firebase';

/** Useless because factorisation doesn't work on rendering my list */
const positionRef = firebase.firestore().collection('positions');

/**
 * Not useful  anymoe since we store the filters in locale storage
 * @param userStorage
 * @param numberOfCurrentUserPosition
 * @returns {Promise<any> | Promise}
 */
export function getFilters(userStorage, numberOfCurrentUserPosition) {
    return new Promise(function (resolve, reject) {
        const uid = userStorage.uid;
        /** list of the last filter field of the current user */
        const filterList = [];
        positionRef
            .where("userId", "==", uid)
            .orderBy("dateOnPosition", "desc")
            .limit(numberOfCurrentUserPosition)
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(function (doc) {
                    let currentUserFilter = doc.data().filter;
                    /** We remove double filters */
                    filterList.indexOf(currentUserFilter) === -1 ? filterList.push(currentUserFilter) : console.log("This item already exists");
                });
                resolve(filterList);
            });
    });
}

/**
 * Get the user cross by current user
 * @param filterList
 * @param userStorage
 * @param numberOfCurrentUserPosition
 * @returns {Promise<any> | Promise}
 */
export function getCrossUser(filterList, userStorage, numberOfCurrentUserPosition) {
    return new Promise(function (resolve, reject) {
        /** All user that the current user have cross */
        const crossUserList = [];
        const uid = userStorage.uid;
        const interestedBy = userStorage.interestedBy;
        filterList.forEach(function (filter) {
            positionRef
                .where("gender", "==", interestedBy)
                .where("filter", "==", filter)
                .where("userId", "!=", uid)
                .onSnapshot(querySnapshot => {
                    let i = 1;
                    querySnapshot.forEach(function(doc) {
                        (i > numberOfCurrentUserPosition) ? resolve(crossUserList) : i++;
                        let crossUser = doc.data();
                        let crossUserUid = doc.data().userId;
                        if (typeof crossUserList[crossUserUid] === 'undefined') {
                            crossUserList.push({
                                name: crossUser.name,
                                _key: crossUserUid
                            });
                            // crossUserList[crossUserUid] = crossUser;
                        }
                    });
                    resolve(crossUserList);
                })
        });
    });
}