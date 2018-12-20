export default function formateDate(date){
    if(typeof date !== 'object'){
        date = new Date(date);
    }
    let month = (date.getMonth() + 1).toString();
    if (+month < 10) { month = '0' + month; }

    let day = date.getDate().toString();
    if (+day < 10) { day = '0' + day; }

    return `${date.getFullYear()}-${month}-${day}`;
}

