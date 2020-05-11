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
        case 'OPEN_ADD_SHOP_FORM':
            return{
                ...state,
                openAddShopForm: action.payload,
            }
        case 'SET_DEFAULT_CENTER':
            return{
                ...state,
                defaultCenter: action.payload,
            }    
        case 'SET_NEW_SHOP_COORDINATES':
            var data = { ...action.payload }
            return{
                ...state,
                newShop: {
                    ...state.newShop, 
                    ...data
                }
            } 
        case 'SET_NEW_SHOP_DATA':
            var data = { ...action.payload }
            return{
                ...state,
                newShop: {
                    ...state.newShop, 
                    ...data
                }
            }     
        case 'CLEAR_SHOP_DATA':
            return{
                ...state,
                newShop: {...state.defaultCenter, ...action.payload}
            }     
        default:
            return state;

    }
}
export default reducer;