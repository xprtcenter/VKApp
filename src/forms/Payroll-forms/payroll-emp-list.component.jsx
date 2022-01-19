import React from "react";
import { Link } from "react-router-dom";
import "./list-table.style.scss";
import "./payroll-employee-registration.styles.scss";

import { firestore } from "../../firebase/firebase.utils";

class PayrollEmpList extends React.Component {
	constructor() {
		super();
		this.onDataChange = this.onDataChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.state = {
			mydata: [],
		};

		this.unsubscribe = undefined;
	}

	componentDidMount() {
		const db = firestore
			.collection("payrollData")
			.doc("payrollEmpRegistration")
			.collection("payrollEmployee");

		this.unsubscribe = db
			.orderBy("EmployeeName", "asc")
			.onSnapshot(this.onDataChange);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
	handleEdit(id) {
		console.log(id);
	}
	onDataChange(items) {
		let mydata = [];

		items.forEach((item) => {
			let id = item.id;
			let data = item.data();
			mydata.push({
				id: id,
				EmployeeCode: data.EmployeeCode,
				EmployeeName: data.EmployeeName,
				EmployeeEmail: data.EmployeeEmail,
				PayrollCompanyName: data.PayrollCompanyName,
				EmployeeAddress: data.EmployeeAddress,
				EmployeeContact: data.EmployeeContact,
				EmployeeImgUrl: data.EmployeeImgUrl,
			});
		});

		this.setState({
			mydata: mydata,
		});
	}

	render() {
		const { mydata } = this.state;
		const defaultImage =
			"https://www.pngarts.com/files/3/Avatar-PNG-Download-Image.png";
		console.log(mydata.EmployeeImgUrl);
		return (
			<>
				<h1>Employee List</h1>
				<table className="table-page">
					<thead>
						<tr className="table-header">
							<th className="th1">Employee Code</th>
							<th className="th2">Employee Image</th>
							<th className="th3">Employee Name</th>
							<th className="th4">Email</th>
							<th className="th5">Company Name</th>
							<th className="th6">Address</th>
							<th className="th7">Contact</th>
							<th className="th8">Action</th>
						</tr>
					</thead>
					<tbody>
						{mydata.map((item) => (
							<tr className="table-data-row">
								<td className="emp-code">{item.EmployeeCode}</td>
								<td className="table-image-container">
									<img
										src={
											item.EmployeeImgUrl ? item.EmployeeImgUrl : defaultImage
										}
										alt="dummyimg"
									/>
								</td>
								<td>{item.EmployeeName}</td>
								<td>{item.EmployeeEmail}</td>
								<td>{item.PayrollCompanyName}</td>
								<td>{item.EmployeeAddress}</td>
								<td>{item.EmployeeContact}</td>
								<td>
									<Link to={`/payroll/PayrollEmpRegEmployeeDetails/${item.id}`}>
										<button className="btn btn-view">View</button>
									</Link>
									<Link to={`/payroll/PayrollEmpRegMaster/${item.id}`}>
										<button className="btn btn-edit">Edit</button>
									</Link>
									<button className="btn btn-delete">Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}
}

export default PayrollEmpList;
