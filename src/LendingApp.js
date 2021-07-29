import LoanForm from './Components/LoanForm';
import theme from './Themes/default';
import React from 'react';

class LendingApp extends React.Component {

	render() {
		return (
			<div style={theme.container}>
				<LoanForm />
			</div>
		);
	}

}

export default LendingApp;