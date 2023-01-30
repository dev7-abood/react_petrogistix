let initialState = {
    is_updated: false
}

const updateLayoutReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE' :
            // const payload = action.payload.is_updated
            initialState = {
                is_updated: !initialState.is_updated
            }
            return initialState
        default :
            return initialState
    }
}

export default updateLayoutReducers
