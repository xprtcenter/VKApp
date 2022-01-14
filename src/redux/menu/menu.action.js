import MenuActionTypes from "./menu.types";

export const toggleMenuHidden = () => ({
	type: MenuActionTypes.TOGGLE_MENU_HIDDEN,
});

export const sideMenuHide = () => ({
	type: MenuActionTypes.SIDE_MENU_HIDE,
});
