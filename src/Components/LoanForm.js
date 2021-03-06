import { Button, Alert, FormGroup, Container, Spinner } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import LanguageManager from '../Language/LanguageManager';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Services from '../Services/Services';
import theme from '../Themes/default';
import React from 'react';

let componentes = {
	'Declined': <Alert color="danger">{LanguageManager.translate('LBL_DECLINED')}</Alert>,
	'Approved': <Alert color="success">{LanguageManager.translate('LBL_APPROVED')}</Alert>,
	'Undecided': <Alert color="warning">{LanguageManager.translate('LBL_UNDECIDED')}</Alert>,
};

class LoanForm extends React.Component {

	constructor(props) {
		super(props);
		this.handleValidSubmit = this.handleValidSubmit.bind(this);
		this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
		this.displayStatusRequestedAmount = this.displayStatusRequestedAmount.bind(this);
		this.state = { "taxId": false, "businessName": false, "requestedAmount": false, "statusRequestedAmount": false, "processing": false, "errorMessage": false, };
	}


	handleValidSubmit = async (event, values) => {
		this.setState({ 
			"taxId": values.taxId,
			"businessName": values.businessName,
			"requestedAmount": values.requestedAmount,
			"processing": true,
			"errorMessage": false,
			"statusRequestedAmount": false,
		});

		let data = { "taxId": values.taxId, "businessName": values.businessName, "requestedAmount": values.requestedAmount };
		let result = await Services.validateAmount(data);
		console.log(result.success);
		if (result.success === true){
			this.setState({ 
				"statusRequestedAmount": result.status, 
				"processing": false
			});
		} else {
			this.setState({
				"errorMessage": result.error || '',
				"processing": false
			});
		}
	}


	handleInvalidSubmit = (event, errors, values) => {
		this.setState({ taxId: values.taxId, businessName: values.businessName, requestedAmount: values.requestedAmount , error: true });
	}


	displayStatusRequestedAmount = () => {
		if (this.state.statusRequestedAmount === false) return null;
		if (this.state.errorMessage !== false) return <Alert color="dark">{this.state.errorMessage}</Alert>;
		return componentes[this.state.statusRequestedAmount] ? componentes[this.state.statusRequestedAmount] : null;
	}


	render() {
		const processing = this.state.processing;
		let buttonComponent;
		if (!processing) {
			buttonComponent = <Button color="primary">{LanguageManager.translate('LBL_BUTTON_APPLY')}</Button>;
		} else {
			buttonComponent = <Spinner color="primary" children={""} />;
		}

	  	return (
			<div>
				<AppBar position="sticky" style={theme.AppBar}>
					<Toolbar variant="dense">
						<Typography variant="h6" color="inherit">
							<span style={theme.LendingApp}>
								<span style={theme.titleLending}>{LanguageManager.translate('LBL_LENDING')}</span>
							</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<Container style={theme.container}>
					{this.displayStatusRequestedAmount()}
					<AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
						<FormGroup style={theme.formGroup}>
								<AvField 
									type="text" 
									name="taxId"
									label={LanguageManager.translate('LBL_TAX_ID')}
									placeholder={LanguageManager.translate('LBL_TAX_ID')}
									validate={{
										required: { value: true, errorMessage: LanguageManager.translate('LBL_TAX_ID_ERROR') },
									}} 
								/>
						</FormGroup>
						<FormGroup style={theme.formGroup}>
								<AvField
									type="text"
									name="businessName"
									label={LanguageManager.translate('LBL_BUSINESS_NAME')}
									placeholder={LanguageManager.translate('LBL_BUSINESS_NAME')}
									validate={{
										required: { value: true, errorMessage: LanguageManager.translate('LBL_BUSINESS_NAME_ERROR') },
									}}
								/>
						</FormGroup>
						<FormGroup style={theme.formGroup}>
								<AvField
									min={0}
									type="number"
									name="requestedAmount"
									label={LanguageManager.translate('LBL_REQUESTED_AMOUNT')}
									placeholder={LanguageManager.translate('LBL_REQUESTED_AMOUNT')}
									validate={{
										required: { value: true, errorMessage: LanguageManager.translate('LBL_REQUESTED_AMOUNT_ERROR') },
									}}
								/>
						</FormGroup>
						<FormGroup style={theme.buttonFormGroup}>
							{buttonComponent}
						</FormGroup>
					</AvForm>
				</Container>
			</div>
		);
	}
}

export default LoanForm;