import React, { Component } from "react";

export default class HeaderDateTime extends Component {
	componentDidMount() {
		setInterval(
			() =>
				this.setState({
					curTime: new Date().toLocaleString("en-GB", { timeZone: "IST" }),
				}),
			1000,
		);
	}

	state = { curTime: new Date().toLocaleString("en-GB", { timeZone: "IST" }) };

	render() {
		return <p className="header1-text">{this.state.curTime}</p>;
	}
}
