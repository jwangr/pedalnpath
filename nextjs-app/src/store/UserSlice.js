import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userId: null,
    email: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login, // getSession???? idk
        logout,
        register
    }
})

export const {login, logout, register} = userSlice.actions;
export default userSlice.reducer;