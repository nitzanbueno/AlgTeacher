import React, { FC, useState, useEffect } from "react";
import { Text } from "react-native";
import { GetTimeText } from "../Utils";

const TIMEOUT = 11;

const Timer: FC<{ startTimestamp: number; style: any; extraTime?: number }> = props => {
    const [timeText, setTimeText] = useState(GetTimeText(props.extraTime || 0));

    function updateTime() {
        const currentTime = new Date();
        const timeAmount = currentTime.getTime() - props.startTimestamp + (props.extraTime || 0);

        setTimeText(GetTimeText(timeAmount));
    }

    useEffect(() => {
        const intervalHandle = setInterval(updateTime, TIMEOUT);

        return () => clearInterval(intervalHandle);
    }, [props.startTimestamp, props.extraTime]);

    return <Text style={props.style}>{timeText}</Text>;
};

export default Timer;
