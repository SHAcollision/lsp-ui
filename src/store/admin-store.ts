import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './';
import { btAdmin, IAdminOrderResponse } from '@synonymdev/blocktank-client';

type RequestState = 'idle' | 'loading' | 'error' | 'geoblocked';

export type State = {
	orders: {
		state: RequestState;
		value: IAdminOrderResponse[];
	};
};

export const initialState: State = {
	orders: {
		state: 'idle',
		value: []
	}
};

export const refreshOrders = createAsyncThunk('btAdmin/refreshOrders', async() => {
	const response = await btAdmin.getOrders();
	return response;
});

export const adminStore = createSlice({
	name: 'btAdmin',
	initialState,
	reducers: {
		// TODO search filter here
		// filterOrders: (state, action: PayloadAction<string>) => {
		// 	state.info.value.capacity.local_balance += action.payload;
		// }
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder.addCase(refreshOrders.fulfilled, (state, action) => {
			state.orders.state = 'idle';
			state.orders.value = action.payload;
		});
	}
});

// export const { filterOrders } = adminStore.actions;

export const selectOrders = (state: RootState): IAdminOrderResponse[] =>
	state.btAdmin.orders.value;
export const selectOrdersState = (state: RootState): RequestState =>
	state.btAdmin.orders.state;

export default adminStore.reducer;
