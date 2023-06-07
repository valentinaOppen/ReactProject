import moment from 'moment';

export const formatDatePlusOneYear = (date: any) => {
    const newDate = new Date(date);
    const newDateUpdated = new Date(newDate.setFullYear(newDate.getFullYear() + 1)).setDate(newDate.getDate() + 1);
    const newDateFormated = moment(newDateUpdated).format('YYYY-MM-DD');
    return newDateFormated;
}

export const formatDateForInput = (date: any) => {
    const newDate = new Date(date);
    const newDateUpdated = new Date(newDate).setDate(newDate.getDate() + 1);
    const newDateFormated = moment(newDateUpdated).format('YYYY-MM-DD');
    return newDateFormated;
}

