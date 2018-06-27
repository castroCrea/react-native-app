export function positionFilter(date, lat, long){
    /** create value for the filter */
    const dateFilter = date.getUTCFullYear()+date.getUTCMonth()+date.getUTCDay()+date.getUTCHours();
    return lat + '_' + long + '_' + dateFilter;
}