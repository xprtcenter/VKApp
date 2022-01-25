import { Route, Switch } from "react-router-dom";

import PayrollEmpRegMaster from "../../forms/Payroll-forms/payroll-employee-registration.component";
import PayrollMaster from "../../forms/Payroll-forms/payroll-master.component";
import PayrollEmpList from "../../forms/Payroll-forms/payroll-emp-list.component";
import PayrollDashboardPage from "../../forms/Payroll-forms/payroll-dashboard";
import PayrollDeductionEntry from "../../forms/Payroll-forms/payroll-deduction-entry.component";
import PayrollSalaryCaculationMaster from "../../forms/Payroll-forms/payroll-salary-calculation-master";

import SMEDashboardPage from "../../forms/sme-forms/sme-dashboard";
import ContractorMaster from "../../forms/sme-forms/contractor-master.component";
import ContractorEmployeeEntry from "../../forms/sme-forms/contractor-employee-entry.component";
import ContractorMasterList from "../../forms/sme-forms/contractor-master-list.component";

const RightFormPageContainer = () => {
	return (
		<>
			<Switch>
				<Route
					exact
					path="/payroll/paymaster"
					render={() => <PayrollMaster />}
				/>
				<Route
					exact
					path="/payroll/paymaster/:id"
					render={() => <PayrollMaster />}
				/>
				<Route
					exact
					path="/payroll/PayrollEmpRegMaster"
					render={() => <PayrollEmpRegMaster />}
				/>
				<Route
					exact
					path="/payroll/PayrollEmpRegMaster/:id"
					render={() => <PayrollEmpRegMaster />}
				/>
				<Route
					exact
					path="/payroll/PayrollEmpList"
					component={PayrollEmpList}
				/>
				<Route
					exact
					path="/payroll/salentry"
					component={PayrollDeductionEntry}
				/>
				<Route
					exact
					path="/payroll/salcalcmaster"
					component={PayrollSalaryCaculationMaster}
				/>
				<Route exact path="/sme/smeconmaster" component={ContractorMaster} />
				<Route
					exact
					path="/sme/smeconempentry"
					component={ContractorEmployeeEntry}
				/>
				<Route exact path="/sme/smecontlist" component={ContractorMasterList} />
				<Route exact path="/payroll" component={PayrollDashboardPage} />
				<Route exact path="/sme" component={SMEDashboardPage} />
			</Switch>
		</>
	);
};

export default RightFormPageContainer;
