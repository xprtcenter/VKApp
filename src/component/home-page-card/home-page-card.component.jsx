import React from "react";
import "./home-page-card.styles.scss";

const CustomHomeCard = ({ data }) => (
	<div className="card-box">
		<div className="cards">
			{data.map((item, index) => (
				<div className="card" key={index}>
					<div className="card-content">
						<p>{item.value}</p>
					</div>
					<div className="cardfooter">{item.label}</div>
				</div>
			))}
		</div>
	</div>
);

export default CustomHomeCard;
