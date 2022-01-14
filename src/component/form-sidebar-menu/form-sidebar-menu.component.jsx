import React from "react";
import "./form-sidebar-menu.styles.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { BsRecord2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { selectSideHide } from "../../redux/menu/menu.selectors";
const FormSidebarMenu = ({
	match,
	menuName,
	menuUrl,
	iconname = BsRecord2,
	sidehide,
}) => {
	return (
		<div className="sidebar-menu">
			<Link className="form-side-list" to={`${match.url}/${menuUrl}`}>
				<span className="icon-container">
					{React.createElement(iconname, null)}
				</span>
				<span
					className={sidehide ? "side-menu-text open" : "side-menu-text close"}
				>
					{menuName}
				</span>
			</Link>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	sidehide: selectSideHide,
});

export default withRouter(connect(mapStateToProps)(FormSidebarMenu));
