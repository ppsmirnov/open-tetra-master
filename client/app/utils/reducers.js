const identity = (state, action) => state;
export const composeReducers = (...reducers) =>
    reducers.reverse().reduce((combinedReducer, singleReducer) => 
        (state, action) => 
            singleReducer(combinedReducer(state, action), action),
        identity);