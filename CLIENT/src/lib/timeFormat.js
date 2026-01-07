const timeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const minuteRemainder = minutes % 60;
    return `${hours}h ${minuteRemainder}min`
}
export default timeFormat;