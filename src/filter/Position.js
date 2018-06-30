export function positionFilter(date, lat, long){
    /** create value for the filter */
    const dateFilter = date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate()+''+date.getHours();
    return dateFilter + '-' + lat + '_' + long;
}