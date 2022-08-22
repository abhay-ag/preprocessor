export const initialState = {
    user: null,
    role: null,
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
        default:
            return state;
    }
}

export default reducer;