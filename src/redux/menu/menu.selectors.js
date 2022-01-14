import { createSelector } from "reselect";

const selectMenu = (state) => state.menu;

export const selectMenuHidden = createSelector(
	[selectMenu],
	(menu) => menu.menuhidden,
);

export const selectSideHide = createSelector(
	[selectMenu],
	(menu) => menu.sidehide,
);
