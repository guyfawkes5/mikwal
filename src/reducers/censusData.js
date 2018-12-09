import { CensusData } from '../actions';

const censusData = (state = [], action) => {
    switch (action.type) {
        case CensusData.REQUEST_DATA:
            return [...state, {
                id: action.id,
                inProgress: true
            }];
        case CensusData.RECEIVED_DATA:
            return state.map(censusData => censusData.id === action.id ? {
                ...censusData, inProgress: false, data: action.data
            } : data);
        default:
            return state;
    }
};

export default censusData;