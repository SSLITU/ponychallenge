// calculate position on the x-axis Domokun
export const RelativePositionDomuX = (props) => {
    let relativePonyX = props.pony % props.width;
    let relativeDomuX = props.domokun % props.width;

    if ((relativeDomuX - relativePonyX) < 0) {
        return "West";
    } else if ((relativeDomuX - relativePonyX) > 0) {
        return "East";
    } else {
        return "";
    }
}

// calculate position on the y-axis domukun
export const RelativePositionDomuY = (props) => {
    // pushing both points to the first column
    let relativePonyY = props.pony - (props.pony % props.width);
    let relativeDomuY = props.domokun - (props.domokun % props.width);
    if (relativeDomuY < relativePonyY) {
        return "North";
    } else if (relativeDomuY > relativePonyY) {
        return "South";
    } else {
        return "";
    }
}

// calculate Exit point on the x-axis
export const RelativePositionExitX = (props) => {
    let relativePonyX = props.pony % props.width;
    let relativeExitX = props.exit % props.width;

    if ((relativeExitX - relativePonyX) < 0) {
        return "West";
    } else if ((relativeExitX - relativePonyX) > 0) {
        return "East";
    } else {
        return "";
    }
}

// calculate Exit point on the y-axis Exit point
export const RelativePositionExitY = (props) => {
    // pushing both points to the first column
    let relativePonyY = props.pony - (props.pony % props.width);
    let relativeExitY = props.exit - (props.domokun % props.width);
    if (relativeExitY < relativePonyY) {
        return "North";
    } else if (relativeExitY > relativePonyY) {
        return "South";
    } else {
        return "";
    }
}
