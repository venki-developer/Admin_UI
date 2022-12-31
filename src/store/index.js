import { createStore } from "redux";

const initialState = []

const reducerFn = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return action.payload;
        case 'DELETE_USERS':
            return state.filter((user) => user.id !== action.payload && user)
        case 'UPDATE_USERS':
            return state.map((user, key) => {
                if (user.id !== action.payload.id) {
                  return user;
                } else {
                  return {
                    ...user,
                    ...action.payload,
                    key: key
                  }
                }
              });

        case 'DELETE_MANY_USERS':
          
        const newUsers = [...state];
        for (let i = 0; i < newUsers.length; i++) {
            if (action.payload.includes(newUsers[i].id)) {
                newUsers.splice(i, 1);
                i--;
            }
        }
    return newUsers;
        default:
            return state;
    }
}

const store = createStore(reducerFn);
// exporting the redux store
export default store;