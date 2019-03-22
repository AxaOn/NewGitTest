export default function(state = {lng: '', lat: ''}, action){
    switch(action.type){
        case 'MAP_COORDS':
            var data = action.payload;
            var temp_state = Object.assign({}, state);
            temp_state["lng"] = data["lng"];
            temp_state["lat"] = data["lat"];
            return temp_state;
        default:
            return state;  
    }
}