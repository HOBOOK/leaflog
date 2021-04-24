import Config from './config'

const dictionary = {
    ko: {
        alert_error_title:'제목을 입력해주세요.',
        alert_error_content:'내용을 입력해주세요.',
    },
    en: {
        alert_error_title:'제목을 입력해주세요.',
        alert_error_content:'내용을 입력해주세요.',
    }
}
export default class Lang {
    getString(key) {
        return dictionary[Config.LANGUAGE][key]
    }

}