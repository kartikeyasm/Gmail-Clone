import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        open: false,
        user: null,
        emails: [],
        openedMail: null,
        searchText: '',
    },
    reducers:{
        setOpen: (state, action)=>{
            state.open = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setEmails: (state, action) => {
            state.emails = action.payload;
        },
        setOpenedMail: (state, action) => {
            state.openedMail = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
    }

});

export const {setOpen, setUser, setEmails, setOpenedMail, setSearchText} = appSlice.actions;
export default appSlice.reducer;