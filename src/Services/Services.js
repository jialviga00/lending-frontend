import LanguageManager from './../Language/LanguageManager';
import CONFIG from './../Config/Config';

let ENDPOINT_VALIDATE_AMOUNT = '/validate_amount/';

export default class Services {

	static async validateAmount(data={}) {
		return await Services.executeServicePOST(
			ENDPOINT_VALIDATE_AMOUNT,
			data,
			'POST'
		);
	};

	static async executeServicePOST(endpoint, data, type) {
		
        let url = `${CONFIG['HOST']}${endpoint}`;
		const result = await fetch(url, { method: 'HEAD' });

        if (result.ok !== true) return { "success": false, "error": LanguageManager.translate('LBL_IS_NOT_CONNECTED') };

		return new Promise((resolve, reject) => {
			console.log(type, " :: ", url, " :: ", data);
			fetch(url, {
				method: 'POST',
				credentials: "same-origin",
				headers: {
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest",
					// "X-CSRFToken": cookie.load('csrftoken'),
				},
				body: JSON.stringify(data)
			}).then((response) => response.json()).then((jsonresponse) => {
				return resolve(jsonresponse);
			}).catch(function (error) {
                console.log("pasa ==> ");
				return resolve({"success": false, "error": error });
			});
		});
	}
};