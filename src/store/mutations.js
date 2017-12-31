export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_BTK_MENU (state, btkmenu) {
    state.btk_menu = btkmenu
  },
  GET_TOKEN (token, state) {
    token = state.token
  }
}
