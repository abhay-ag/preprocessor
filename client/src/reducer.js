export const initialState = {
    user: null,
    role: null,
    bids: [],  
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "SET_ROLE":
            return {
                ...state,
                role: action.role,
            };
        case "SET_BIDS":
            return {
                ...state,
                bids: [...state.bids, action.bids],
            };
        default:
            return state;
    }
}

export default reducer;