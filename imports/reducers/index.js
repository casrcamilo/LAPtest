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
                openNewRatingCard: false
            }
        case 'OPEN_SHOP_DETAILS':
            return{
                ...state,
                openShopDetails: action.payload,
                openAddShopForm: false,
            }
        case 'OPEN_ADD_SHOP_FORM':
            return{
                ...state,
                openAddShopForm: action.payload,
                openShopDetails: false,
                shopSelected: {}
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
        case 'SET_OPEN_NEW_RATING_CARD':
            return{
                ...state,
                openNewRatingCard: action.payload
            }  
        case 'SET_COMMENT_EDITABLE':
            return{
                ...state,
                commentEditable: action.payload
            }  
        case 'SET_COMMENT_TO_EDIT':
            return{
                ...state,
                commentToEdit: action.payload
            }  
        default:
            return state;
            
    }
}
export default reducer;