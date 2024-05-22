import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPostDetails} from "../../services/PostsService";

const initialState = {
    data: {},
    status: 'idle',
    error: null,
}

export const fetchPostDetails = createAsyncThunk('posts/fetchPostDetails', async (postId) => {
    return await getPostDetails(postId);
});

const postDetailsSlice = createSlice({
    name: 'postDetails',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPostDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPostDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})



export default postDetailsSlice.reducer;