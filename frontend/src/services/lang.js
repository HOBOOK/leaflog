import Config from './config'

const dictionary = {
    ko: {
        alert_error_title:'제목을 입력해주세요.',
        alert_error_content:'내용을 입력해주세요.',
        alert_error_comment_empty:'댓글 내용을 입력해주세요.',
        alert_error_expired_page:'만료된 페이지입니다.'
    },
    en: {
        alert_error_title:'제목을 입력해주세요.',
        alert_error_content:'내용을 입력해주세요.',
        alert_error_comment_empty:'댓글 내용을 입력해주세요.',
        alert_error_expired_page:'만료된 페이지입니다.'
    }
}
export default class Lang {
    getString(key) {
        return dictionary[Config.LANGUAGE][key]
    }

}