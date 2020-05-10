export const loginRequest = payload => ({
    type: 'LOGIN_REQUEST',
    payload,
});

export const logoutRequest = payload => ({
    type: 'LOGOUT_REQUEST',
    payload,
});

export const addShopSelected = payload => ({
    type: 'ADD_SHOP_SELECTED',
    payload,
})

export const openShopDetails = payload => ({
    type: 'OPEN_SHOP_DETAILS',
    payload,
})