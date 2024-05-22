import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPosts} from "../../services/PostsService";
import i18next from "i18next";

const initialState = {
    lang: 'en',
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            console.log(action.payload)
            state.lang = action.payload;
            i18next.changeLanguage(state.lang);
        }
    }
})


export const {setLanguage} = profileSlice.actions;
export default profileSlice.reducer;