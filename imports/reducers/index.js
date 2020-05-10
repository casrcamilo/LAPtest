const reducer = (state, action) => {
    switch(action.type){
        case 'LOGIN_REQUEST':
            return{
                ...state,
                user: action.payload,
            }
        case 'LOGOUT_REQUEST':
            return{
                ...state,
                user: action.payload,
            }
        case 'ADD_SHOP_SELECTED':
            return{
                ...state,
                shopSelected: action.payload,
            }
        case 'OPEN_SHOP_DETAILS':
            return{
                ...state,
                openShopDetails: action.payload,
            }
        default:
            return state;

    }
}
export default reducer;