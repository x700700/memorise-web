import React, {useEffect} from "react";
import consts from "../common/consts";

const Training = ({ training }) => {

    return (
        <div className="training-container">
            {training.name}
        </div>
    );
};
export default Training;
