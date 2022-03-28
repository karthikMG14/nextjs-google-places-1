import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getMapLocation = createAsyncThunk('map/getMapLocation', 
	async (payload, {getState}) => {
        return axios.get(`http://localhost:3000/api/mapdata?placeId=${payload.place.place_id}`)
        .then(res => {
            try{
                return {data:res.data.result.result.geometry.location}
            }catch(e){ 
                return {data:{}}
            }
        })
        .catch(err => alert("Something went wrong try again later"))
	}
)

export const mapsSlice = createSlice({
	name: 'maps',
	initialState: {
        loading: true,
        error: false,
        data: {lat:17.4770936,lng:78.3920437},
    },
	extraReducers: {
		[getMapLocation.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getMapLocation.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getMapLocation.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default mapsSlice.reducer;