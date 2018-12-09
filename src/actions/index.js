import Url from 'url-parse';

const REQUEST_DATA = 'REQUEST_DATA',
    RECEIVED_DATA = 'RECEIVED_DATA',

    censusDataEndpoints = {
        CAR_OWNERSHIP: 'http://localhost:8080/export.png'//'http://airomaps.nuim.ie/publicarcgis/rest/services/Census2016_SAPs/SAPS16_CarOwnership/MapServer/export?dpi=96&transparent=false&format=png8&bbox=-14.365224034923347%2C51.21856311794861%2C-2.2940246602476693%2C55.647914501398155&bboxSR=4326&imageSR=4326&size=1240%2C455&f=image'
    };

export const requestCensusData = id => ({
    type: REQUEST_DATA,
    id
});

export const receiveCensusData = (id, data) => ({
    type: RECEIVED_DATA,
    id,
    data
});

export const fetchCensusData = id => {
    return dispatch => {
        dispatch(requestCensusData(id));
        const image = new Image();
        image.src = censusDataEndpoints[id];
        image.onload = () => {
            dispatch(receiveCensusData(id, image));
        };
    };
};

export const CensusData = {
    REQUEST_DATA, RECEIVED_DATA
};