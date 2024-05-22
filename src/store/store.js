import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './slices/PostsSlice'
import postDetails from './slices/PostDetailsSlice'
import authReducer from './slices/AuthSlice'
import profileReducer from './slices/ProfileSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'profile'], // Only persist the auth slice
};

const rootReducer = combineReducers({
    posts: postsReducer,
    postData: postDetails,
    auth: authReducer,
    profile: profileReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistorRedux = persistStore(store);


export {store, persistorRedux};