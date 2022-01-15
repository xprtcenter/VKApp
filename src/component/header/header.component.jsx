import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CartIcon from "../../component/card-icon/card-icon.component";
import logo from "../../assets/swami2.png";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import HeaderModules from "../header-module/header-module.component";
import avtar from "../../assets/avatar.png";
import Menubutton from "../../assets/menubutton.png";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectMenuHidden } from "../../redux/menu/menu.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { toggleMenuHidden } from "../../redux/menu/menu.action";
import HeaderDateTime from "./Timer.component";

import { auth } from "../../firebase/firebase.utils";
import "./header.styles.scss";

const Header = ({ currentUser, hidden, menuhidden, toggleMenuHidden }) => {
	//console.log("Test CurrentUser from header", currentUser.photoURL);
	return (
		<div className="main-header">
			<div className="header1">
				<p className="header1-text">VIVEKANANDA KENDRA BORL HOSPITAL</p>
				<HeaderDateTime />
			</div>
			<div className="header">
				<Link to="/" className="logo-container">
					<img src={logo} alt="swamiji" />

					<span className="text">HOME</span>
				</Link>
				<div className="nav-options-container .nav__menu">
					{menuhidden ? null : (
						<div className="header-menu">
							<HeaderModules />
						</div>
					)}
					<div className="menu-button-icon" onClick={toggleMenuHidden}>
						<img src={Menubutton} alt="menubutton" />
					</div>

					{currentUser ? (
						<div className="user-info-container menu-item-dropdown">
							{auth.currentUser.photoURL !== null ? (
								<img
									className="avatar"
									src={auth.currentUser.photoURL}
									alt="avatar"
								/>
							) : (
								<img className="avatar" src={avtar} alt="avatar" />
							)}

							<span className="text">{auth.currentUser.email}</span>

							<Submenu />
						</div>
					) : (
						<Link className="sign-in" to="/signin">
							SIGN IN
						</Link>
					)}

					<CartIcon />
				</div>
				{hidden ? null : <CartDropdown />}
			</div>
		</div>
	);
};
class Submenu extends React.Component {
	render() {
		return (
			<div className="nav__submenu">
				<Link className="nav-option drop" to="/profile">
					PROFILE
				</Link>
				<Link className="nav-option drop" to="/setting">
					SETTING
				</Link>
				<div
					className="nav-option drop"
					onClick={() => {
						const confirmBox = window.confirm(
							"Do you really want to SIGN OUT?",
						);
						if (confirmBox) {
							auth.signOut();
						}
					}}
				>
					SIGN OUT
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	toggleMenuHidden: () => dispatch(toggleMenuHidden()),
});
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
	menuhidden: selectMenuHidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
