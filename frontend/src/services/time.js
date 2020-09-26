/*
    Time
*/
export default class Time {
    dateToFormatKorean (date) {
        let dateString = date.substring(0,10)
        return dateString.substring(0,4) + '년 ' + dateString.substring(5,7) + '월 ' + dateString.substring(8) +'일'
    }
}