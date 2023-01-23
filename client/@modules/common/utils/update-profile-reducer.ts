import { profileState, profileUpdateActionType } from "../types/types-interfaces"

const profileReducer = (state:profileState, action:profileUpdateActionType) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        [action.key]: action.value
      }
    default:
      return state
  }
}


export default profileReducer
