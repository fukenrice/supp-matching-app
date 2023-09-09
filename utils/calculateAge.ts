import moment from "moment";

export function calculateAge(birthday: Date) { // birthday is a date
    return moment(Date.now()).diff(birthday, "years")
}