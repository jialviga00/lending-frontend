import CONFIG from '../Config/Config';
import en_US from './en_US';

class LanguageManager {

	static language = undefined;
	static languageList = {
		'default': en_US,
		'en_US': en_US,
	};

	static translate(label) {
		let languageApp = LanguageManager.getLanguageApp();
		return languageApp[label] ? languageApp[label] : label;
	}

	static getLanguageApp() {
		let currentLanguage = LanguageManager.getCurrentLanguage();
		return LanguageManager.languageList[currentLanguage] ? LanguageManager.languageList[currentLanguage] : {};
	}

    static setCurrentLanguage(language) {
        LanguageManager.language = language;
    }

	static getCurrentLanguage() {
		if (LanguageManager.language !== undefined) {
			return LanguageManager.language;
		} else {
			return LanguageManager.language = CONFIG['DEFAULT_LANGUAGE'];
		}
	}
}

export default LanguageManager;