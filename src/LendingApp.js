import AccountForm from './Components/AccountForm';
import theme from './Themes/default';
import React from 'react';

class LendingApp extends React.Component {

	render() {
		return (
			<div style={theme.container}>
				<AccountForm />
			</div>
		);
	}

}

export default LendingApp;