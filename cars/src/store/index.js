import { configureStore } from "@reduxjs/toolkit";
import { carReducer, changeSearchTerm, addCar, removeCar } from "./slices/carSlice";
import { formReducer, changeName, changeCost } from "./slices/formSlice";

const store = configureStore({
    reducer: {
        car: carReducer,
        form: formReducer,
    }
});

export {store, changeName, changeCost, changeSearchTerm, addCar, removeCar };