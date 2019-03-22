import { combineReducers } from 'redux';
import MapCoords from './reducer_map_coords'

const rootReducer = combineReducers({
    mapCoords: MapCoords,
    
});

export default rootReducer;
