import MenuActionTypes from "./menu.types";

const INITIAL_STATE = {
	menuhidden: false,
	sidehide: true,
};

const menuReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MenuActionTypes.TOGGLE_MENU_HIDDEN:
			return {
				...state,
				menuhidden: !state.menuhidden,
			};
		case MenuActionTypes.SIDE_MENU_HIDE:
			return {
				...state,
				sidehide: !state.sidehide,
			};

		default:
			return state;
	}
};
export default menuReducer;
