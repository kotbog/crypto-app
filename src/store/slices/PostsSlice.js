import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPosts} from "../../services/PostsService";

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    return await getPosts(3);
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})



export default postsSlice.reducer;