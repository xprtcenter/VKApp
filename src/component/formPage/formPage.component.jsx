import React from "react";
import "./formPage.styles.scss";
import FormSidebarMenu from "../form-sidebar-menu/form-sidebar-menu.component";
import { connect } from "react-redux";
import { ReactComponent as SidebarClosebutton } from "../../assets/arrow-right.svg";
import { sideMenuHide } from "../../redux/menu/menu.action";
import RightFormPageContainer from "../../component/formPage/right-form-page.component";

const FormPage = ({ data, match, sideMenuHide }) => {
	return (
		<div className="form-page">
			<div className="leftside-menu-block open">
				{data.map(({ id, ...otherProps }) => (
					<FormSidebarMenu key={id} {...otherProps} />
				))}
				<div className="sidebar-close-button" onClick={sideMenuHide}>
					<SidebarClosebutton className="right-button" />
				</div>
			</div>
			<div className="rightside-main-section">
				<RightFormPageContainer match={match} />
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	sideMenuHide: () => dispatch(sideMenuHide()),
});
export default connect(null, mapDispatchToProps)(FormPage);
