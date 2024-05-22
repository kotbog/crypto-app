import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsReducer from './slices/PostsSlice'
import postDetails from './slices/PostDetailsSlice'


const rootReducer = combineReducers({
    posts: postsReducer,
    postData: postDetails
});


const store = configureStore({
    reducer: rootReducer
})

export default store;