export const getHourFromUTC = (utc) => {
    return Math.floor(utc / (60 * 60 * 1000));
};

export const getMinutesFormUTC = (utc) => {
    return Math.floor((utc - getHourFromUTC(utc)) / (60 * 1000));
};

export const getSecondsFromUTC = (utc) => {
    return  Math.floor(utc / 1000 ) % 60;
};
