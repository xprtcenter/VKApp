import React, { useState, useEffect } from "react";
import "./payroll-deduction-entry.styles.scss";
import Select from "react-select";
import FormInput from "../../component/form-input/form-input.component";
import { firestore } from "../../firebase/firebase.utils";
import CustomButton from "../../component/custom-button/custom-button.component";
import avatar from "../../assets/avatar.png";

const PayrollDeductionEntry = () => {
	var months = [
		{ value: "January", label: "January" },
		{ value: "February", label: "February" },
		{ value: "March", label: "March" },
		{ value: "April", label: "April" },
		{ value: "May", label: "May" },
		{ value: "June", label: "June" },
		{ value: "July", label: "July" },
		{ value: "August", label: "August" },
		{ value: "September", label: "September" },
		{ value: "October", label: "October" },
		{ value: "November", label: "November" },
		{ value: "December", label: "December" },
	];
	var months1 = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	var years = [
		{ value: 2021, label: 2021 },
		{ value: 2022, label: 2022 },
		{ value: 2023, label: 2023 },
		{ value: 2024, label: 2024 },
		{ value: 2025, label: 2025 },
	];

	var dt = new Date();
	var monthName = months1[dt.getMonth()]; // "July" (or current month)
	var yearName = dt.getFullYear(); // "2022" (or current year)

	const initialstate = {
		EmployeeName: "",
		EmployeeId: "",
		EmployeeCode: "",
		EmployeeEmail: "",
		PayrollCompanyName: "",
		EmployeeAddress: "",
		EmployeeContact: "",
		EmployeeImgUrl: avatar,
		month: monthName,
		year: yearName,
		EmployeeDepartment: "",
		fixBasic: "",
		days: "",
		weeklyoff: "",
		coff: "",
		unpaidLeave: "",
		paidLeave: "",
		nonWorkingdays: "",
		totalLeave: "",
		workingDays: "",
		leaveDeduction: "",
		esicEmployee: "",
		esicEmployer: "",
		pfEmployee: "",
		pfEmployer: "",
		professionalTax: "",
		advanceLoan: "",
		vehicleAllownces: "",
		houseAllownces: "",
		totalDeduction: "",
		calculativeBasic: "",
		allowncesOther: "",
		inHandSalary: "",
		ctc: "",
		TabtoggleState: 1,
		Editid: "",
	};

	const [dedData, setDedData] = useState(initialstate);
	const [newOptions, setNewOptions] = useState({
		EmployeeName: [],
	});

	useEffect(() => {
		const dbDrop = firestore
			.collection("payrollData")
			.doc("payrollEmpRegistration")
			.collection("payrollEmployee")
			.onSnapshot((items) => {
				let employeeList = [];

				items.forEach((item) => {
					let id = item.id;
					let data = item.data();
					employeeList.push({
						value: id,
						label: data.EmployeeName,
						EmployeeCode: data.EmployeeCode,
						EmployeeEmail: data.EmployeeEmail,
						PayrollCompanyName: data.PayrollCompanyName,
						EmployeeAddress: data.EmployeeAddress,
						EmployeeContact: data.EmployeeContact,
						EmployeeImgUrl: data.EmployeeImgUrl,
						EmployeeDepartment: data.EmployeeDepartment,
					});
				});
				setNewOptions({ EmployeeName: employeeList });
				setDedData({ ...dedData, month: monthName });
			});
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const db = firestore
			.collection("payrollData")
			.doc("payrollDeduction")
			.collection("payrollDeductionEntry");

		let sData = {
			month: dedData.month,
			EmployeeId: dedData.EmployeeId,
			EmployeeName: dedData.EmployeeName,
			EmployeeCode: dedData.EmployeeCode,
			PayrollCompanyName: dedData.PayrollCompanyName,
			year: dedData.year,
			EmployeeDepartment: dedData.EmployeeDepartment,
			fixBasic: dedData.fixBasic,
			days: dedData.days,
			weeklyoff: dedData.weeklyoff,
			coff: dedData.coff,
			unpaidLeave: dedData.unpaidLeave,
			paidLeave: dedData.paidLeave,
			nonWorkingdays: dedData.nonWorkingdays,
			totalLeave: dedData.totalLeave,
			workingDays: dedData.workingDays,
			leaveDeduction: dedData.leaveDeduction,
			esicEmployee: dedData.esicEmployee,
			esicEmployer: dedData.esicEmployer,
			pfEmployee: dedData.pfEmployee,
			pfEmployer: dedData.pfEmployer,
			professionalTax: dedData.professionalTax,
			advanceLoan: dedData.advanceLoan,
			vehicleAllownces: dedData.vehicleAllownces,
			houseAllownces: dedData.houseAllownces,
			totalDeduction: dedData.totalDeduction,
			calculativeBasic: dedData.calculativeBasic,
			allowncesOther: dedData.allowncesOther,
			inHandSalary: dedData.inHandSalary,
			ctc: dedData.ctc,
		};

		if (!dedData.Editid) {
			await db
				.add(sData)
				.then(() => {
					setDedData(initialstate);
					alert("Data Insert successfully!");
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			db.doc(dedData.Editid)
				.update(sData)
				.then(() => {
					setDedData(initialstate);
					alert("Data Update successfully!");
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setDedData({ ...dedData, [name]: value });
	};
	const {
		EmployeeId,
		EmployeeName,
		EmployeeEmail,
		EmployeeCode,
		EmployeeContact,
		EmployeeImgUrl,
		month,
		year,
		EmployeeDepartment,
		fixBasic,
		days,
		weeklyoff,
		coff,
		unpaidLeave,
		paidLeave,
		nonWorkingdays,
		totalLeave,
		workingDays,
		leaveDeduction,
		esicEmployee,
		esicEmployer,
		pfEmployee,
		pfEmployer,
		professionalTax,
		advanceLoan,
		vehicleAllownces,
		houseAllownces,
		totalDeduction,
		calculativeBasic,
		allowncesOther,
		inHandSalary,
		ctc,
		TabtoggleState,
	} = dedData;
	return (
		<div className="form-main-container">
			<h2 className="title">Deduction Entry form</h2>
			<span>Enter your deduction details.</span>

			<form className="form-container" onSubmit={handleSubmit}>
				<div className="selection-container">
					<div className="selection-menu">
						<Select
							className="dropdown-menu"
							placeholder="Month for Deduction"
							value={months.find((obj) => obj.value === month) || ""} // set selected value
							options={months} // set list of the data
							onChange={(e) => {
								setDedData({ ...dedData, month: e.value });
							}} // assign onChange function
						/>
						<Select
							className="dropdown-menu"
							placeholder="Year for Deduction"
							value={years.find((obj) => obj.value === year) || ""} // set selected value
							options={years} // set list of the data
							onChange={(e) => {
								setDedData({ ...dedData, year: e.value });
							}} // assign onChange function
						/>
						<Select
							className="dropdown-menu"
							placeholder="Select Employee"
							value={
								newOptions.EmployeeName.find(
									(obj) => obj.label === EmployeeName,
								) || ""
							} // set selected value
							options={newOptions.EmployeeName} // set list of the data
							onChange={(e) => {
								setDedData({
									...dedData,
									EmployeeName: e.label,
									EmployeeId: e.value,
									EmployeeCode: e.EmployeeCode,
									EmployeeEmail: e.EmployeeEmail,
									PayrollCompanyName: e.PayrollCompanyName,
									EmployeeAddress: e.EmployeeAddress,
									EmployeeContact: e.EmployeeContact,
									EmployeeImgUrl: e.EmployeeImgUrl,
									EmployeeDepartment: e.EmployeeDepartment,
								});
							}} // assign onChange function
						/>
					</div>

					{EmployeeId !== "" ? (
						<div className="card-for-image-text">
							<div
								className="header-image"
								style={{
									backgroundImage: `url(${EmployeeImgUrl})`,
									backgroundPosition: "center",
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
								}}
							></div>

							<div className="card-for-header">
								<div className="header-text">
									Employee Id: <strong>{EmployeeCode}</strong>
								</div>
								<div className="header-text">
									Employee Name: <strong>{EmployeeName}</strong>
								</div>
								<div className="header-text">
									Employee Department: <strong>{EmployeeDepartment}</strong>
								</div>
								<div className="header-text">
									Email: <strong>{EmployeeEmail}</strong>
								</div>
								<div className="header-text">
									Contact:<strong> {EmployeeContact}</strong>
								</div>
							</div>
						</div>
					) : null}
				</div>
				<div className="container">
					<div className="bloc-tabs">
						<div
							className={TabtoggleState === 1 ? "tabs active-tabs" : "tabs"}
							onClick={() => setDedData({ ...dedData, TabtoggleState: 1 })}
						>
							First Tab
						</div>
						<div
							className={TabtoggleState === 2 ? "tabs active-tabs" : "tabs"}
							onClick={() => setDedData({ ...dedData, TabtoggleState: 2 })}
						>
							Second Tab
						</div>
						<div
							className={TabtoggleState === 3 ? "tabs active-tabs" : "tabs"}
							onClick={() => setDedData({ ...dedData, TabtoggleState: 3 })}
						>
							Third Tab
						</div>
					</div>
					<div className="content-tabs">
						<div
							className={
								TabtoggleState === 1 ? "content  active-content" : "content"
							}
						>
							<div className="form-container">
								<FormInput
									type="text"
									name="fixBasic"
									value={fixBasic}
									onChange={handleChange}
									label="FIXBASIC"
									required
								/>
								<FormInput
									type="text"
									name="days"
									value={days}
									onChange={handleChange}
									label="DAYS"
									required
								/>
								<FormInput
									type="text"
									name="weeklyoff"
									value={weeklyoff}
									onChange={handleChange}
									label="WEEKLY OFF"
									required
								/>
								<FormInput
									type="text"
									name="coff"
									value={coff}
									onChange={handleChange}
									label="C OFF"
									required
								/>
							</div>
						</div>
						<div
							className={
								TabtoggleState === 2 ? "content  active-content" : "content"
							}
						>
							<div className="form-container">
								<FormInput
									type="text"
									name="unpaidLeave"
									value={unpaidLeave}
									onChange={handleChange}
									label="UN PAID LEAVE"
									required
								/>
								<FormInput
									type="text"
									name="paidLeave"
									value={paidLeave}
									onChange={handleChange}
									label="PAID LEAVE"
									required
								/>
								<FormInput
									type="text"
									name="nonWorkingdays"
									value={nonWorkingdays}
									onChange={handleChange}
									label="NON WORKING DAYS"
									required
								/>
								<FormInput
									type="text"
									name="totalLeave"
									value={totalLeave}
									onChange={handleChange}
									label="TOTAL LEAVE"
									required
								/>
								<FormInput
									type="text"
									name="workingDays"
									value={workingDays}
									onChange={handleChange}
									label="WORKING DAYS"
									required
								/>
								<FormInput
									type="text"
									name="leaveDeduction"
									value={leaveDeduction}
									onChange={handleChange}
									label="LEAVE DEDUCTION"
									required
								/>
								<FormInput
									type="text"
									name="esicEmployee"
									value={esicEmployee}
									onChange={handleChange}
									label="ESIC EMPLOYEE"
									required
								/>
								<FormInput
									type="text"
									name="esicEmployer"
									value={esicEmployer}
									onChange={handleChange}
									label="ESIC EMPLOYER"
									required
								/>
								<FormInput
									type="text"
									name="pfEmployee"
									value={pfEmployee}
									onChange={handleChange}
									label="PF EMPLOYEE"
									required
								/>
								<FormInput
									type="text"
									name="pfEmployer"
									value={pfEmployer}
									onChange={handleChange}
									label="PF EMPLOYER"
									required
								/>
								<FormInput
									type="text"
									name="professionalTax"
									value={professionalTax}
									onChange={handleChange}
									label="PROFESSIONAL TAX"
									required
								/>
							</div>
						</div>
						<div
							className={
								TabtoggleState === 3 ? "content  active-content" : "content"
							}
						>
							<div className="form-container">
								<FormInput
									type="text"
									name="advanceLoan"
									value={advanceLoan}
									onChange={handleChange}
									label="ADVANCE LOAN"
									required
								/>
								<FormInput
									type="text"
									name="vehicleAllownces"
									value={vehicleAllownces}
									onChange={handleChange}
									label="VEHICLE ALLOWNCES"
									required
								/>
								<FormInput
									type="text"
									name="houseAllownces"
									value={houseAllownces}
									onChange={handleChange}
									label="HOUSE ALLOWNCES"
									required
								/>
								<FormInput
									type="text"
									name="totalDeduction"
									value={totalDeduction}
									onChange={handleChange}
									label="TOTAL DEDUCTION"
									required
								/>
								<FormInput
									type="text"
									name="calculativeBasic"
									value={calculativeBasic}
									onChange={handleChange}
									label="CALCULATIVE BASIC"
									required
								/>
								<FormInput
									type="text"
									name="allowncesOther"
									value={allowncesOther}
									onChange={handleChange}
									label="ALLOWNCES OTHER"
									required
								/>
								<FormInput
									type="text"
									name="inHandSalary"
									value={inHandSalary}
									onChange={handleChange}
									label="FINAL SALARY"
									required
								/>
								<FormInput
									type="text"
									name="ctc"
									value={ctc}
									onChange={handleChange}
									label="CTC"
									required
								/>
							</div>
						</div>
					</div>
				</div>
				<CustomButton type="submit">SUBMIT</CustomButton>
			</form>
		</div>
	);
};
export default PayrollDeductionEntry;
