import moment from "moment";

export function calculateAge(birthday: Date) { // birthday is a date
    return moment(Date.now()).diff(birthday, "years")
    // var ageDifMs = Date.now() - birthday.getUTCMilliseconds()
    // var ageDate = new Date(ageDifMs); // miliseconds from epoch
    // return Math.abs(ageDate.getUTCFullYear() - 1970);
}