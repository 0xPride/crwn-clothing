import {
  firestore,
  convertCollectionsSnapshotToMap,
} from './../../firebase/firebase.utils';

import shopActionTypes from './shop.types';

export const fetchCollectionsStart = () => {
  return {
    type: shopActionTypes.UPDATE_COLLECTIONS,
  };
};

export const fetchCollectionsSuccess = collections => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collections,
});

export const fetchCollectionFailure = errorMessage => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => dispatch => {
  const collectionRef = firestore.collection('collections');
  dispatch(fetchCollectionsStart());

  collectionRef
    .get()
    .then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    })
    .catch(err => {
      dispatch(fetchCollectionFailure(err.message));
    });
};
