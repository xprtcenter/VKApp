import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../component/table/list-table.style.scss";
import "../../component/spinners/loder.css";
import { EmployeeData } from "./Functions/getemployeedetails";

const PayrollEmpList = () => {
	const [mydata, setMyData] = useState([]);
	const [loder, setLoder] = useState(true);

	const print = () => {
		/* var backup = document.body.innerHTML;
		var divcontent = document.getElementsByClassName("print-div").innerHTML;
		document.body.innerHTML = divcontent; */
		window.print();
		/* document.body.innerHTML = backup; */
	};
	useEffect(() => {
		const getData = async () => {
			const data = await EmployeeData.get();
			let employee = [];
			data.docs.forEach((doc) => {
				employee.push({ ...doc.data(), id: doc.id });
			});
			setMyData(employee);
			setLoder(false);
		};

		getData();
	}, []);

	const defaultImage =
		"https://www.pngarts.com/files/3/Avatar-PNG-Download-Image.png";
	console.log(mydata.EmployeeImgUrl);
	return (
		<React.Fragment>
			{loder ? (
				<div id="cover-spin"></div>
			) : (
				<React.Fragment>
					<h1>Employee List</h1>
					<button onClick={print}>Print button</button>
					<table className="table-page print-div">
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
										<Link
											to={`/payroll/PayrollEmpRegEmployeeDetails/${item.id}`}
										>
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
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default PayrollEmpList;
