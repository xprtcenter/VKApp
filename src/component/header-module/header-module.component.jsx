import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import HeaderMenuItem from "./header-menu-item.component";
import headerdata from "../header/headerdata";

class HeaderModules extends React.Component {
	constructor(currentUser) {
		super();

		this.state = {
			currentUser: currentUser,
			headerdata,
		};
	}

	render() {
		return (
			<React.Fragment>
				{this.state.headerdata.sections.map(({ id, ...otherSectionProps }) => (
					<HeaderMenuItem key={id} {...otherSectionProps} />
				))}
			</React.Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HeaderModules);
