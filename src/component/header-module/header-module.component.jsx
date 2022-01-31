import React from "react";

import HeaderMenuItem from "./header-menu-item.component";
import headerdata from "../header/headerdata";

class HeaderModules extends React.Component {
	constructor(currentUser) {
		super();

		this.state = {
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

export default HeaderModules;
