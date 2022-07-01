import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: "kim",
  reducers: {
    changeName(state) {
      return "jun" + state;
    }
  }
});

export let { changeName } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12]
});

let newData = createSlice({
  name: "newData",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 }
  ],
  reducers: {
    increase(state, action) {
      state.find((x) => x.id == action.payload).count += 1;
      // state[action.payload].count += 1;
    },
    addCart(state, action) {
      // state.push({id: 4, name: "123", count: 5})
      console.log(action.payload);
      state.push(action.payload);
    }
  }
});

export let { increase, addCart } = newData.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    newData: newData.reducer
  }
});
