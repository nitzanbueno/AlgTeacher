import React, {FC, useState, useEffect} from "react";
import {Component} from "react";
import {Text, View, StyleSheet, Button} from "react-native";
import {GetTimeText} from "../Utils";
import {Case} from "../Models";
import TimeAttackStorage, {HighScoreType} from "../TimeAttackStorage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
        // justifyContent: "center",
    },
    header: {
        fontSize: 60,
        marginBottom: 20,
        textAlign: "center",
    },
    descriptionText: {
        fontSize: 20,
    },
    highScoreView: {
        marginTop: 10,
        textAlign: "center",
        alignItems: "center",
    },
});

interface Props {
    route: {params: {cases: Case[], totalTime: number, solveCount: number}};
}

const TimeAttackEndScreen: FC<Props> = props => {
    const [highScore, setHighScore] = useState<HighScoreType | null>(null);

    const {cases} = props.route.params;
    const timeAttackScore = {totalTime: props.route.params.totalTime, solveCount: props.route.params.solveCount};

    useEffect(() => {
        async function checkHighScore() {
            const fetchedHighScore = await TimeAttackStorage.FetchHighScore(cases);

            if (
                fetchedHighScore == null ||
                fetchedHighScore.solveCount < timeAttackScore.solveCount ||
                (fetchedHighScore.solveCount == timeAttackScore.solveCount && fetchedHighScore.totalTime > timeAttackScore.totalTime)
            ) {
                console.log("EEEE", timeAttackScore.totalTime);
                await TimeAttackStorage.SaveHighScore(cases, timeAttackScore);
            } else {
                console.log("SET", timeAttackScore.totalTime);
                setHighScore(fetchedHighScore);
            }
        }

        checkHighScore();
    }, [cases, timeAttackScore]);

    function getScoreText(scoreObject: {totalTime: number, solveCount: number}) {
        return `${scoreObject.solveCount}/${cases.length} solves in ${GetTimeText(scoreObject.totalTime)}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Done!</Text>

            <Text style={styles.descriptionText}>Your total time is: </Text>
            <Text style={styles.descriptionText}>{getScoreText(timeAttackScore)}.</Text>
            <View style={styles.highScoreView}>
                {highScore ? (
                    <>
                        <Text style={styles.descriptionText}>You didn't beat your high score!</Text>
                        <Text style={styles.descriptionText}>Your high score for this category is:</Text>
                        <Text style={styles.descriptionText}>{getScoreText(highScore)}.</Text>
                    </>
                ) : (
                    <Text>You beat your high score! Congratulations!</Text>
                )}
            </View>
        </View>
    );
};

export default TimeAttackEndScreen;
