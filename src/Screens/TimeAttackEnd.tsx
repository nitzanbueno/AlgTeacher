import React, { FC, useState, useEffect } from "react";
import { Text, View, StyleSheet, StyleProp, TextStyle } from "react-native";
import { GetTimeText } from "../Utils";
import TimeAttackStorage, { HighScoreType } from "../TimeAttackStorage";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParamList";
import { Button, ActivityIndicator } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        // justifyContent: "center",
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    done: {
        fontSize: 50,
    },
    beatHighScore: {
        fontSize: 40,
    },
    descriptionText: {
        fontSize: 30,
        textAlign: "center",
    },
    highScoreView: {
        marginTop: 30,
        textAlign: "center",
        alignItems: "center",
        width: "90%",
    },
    highScoreText: {
        color: "#2343C1",
    },
    scoreLabel: {
        width: 180,
        textAlign: "left",
    },
    scoreField: {
        textAlign: "left",
    },
    scoreTable: {
        width: 250,
        marginTop: 10,
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    retryButton: {
        marginTop: 20,
    },
});

interface Props {
    route: RouteProp<RootStackParamList, "TimeAttackEnd">;
    navigation: StackNavigationProp<RootStackParamList, "TimeAttackEnd">;
}

const TimeAttackEndScreen: FC<Props> = props => {
    const [previousHighScore, setPreviousHighScore] = useState<HighScoreType | null | undefined>(undefined);
    const [didBeatHighScore, setDidBeatHighScore] = useState(false);

    const { highScoreKey, totalCount } = props.route.params;
    const timeAttackScore = { totalTime: props.route.params.totalTime, solveCount: props.route.params.solveCount };

    useEffect(() => {
        async function checkHighScore() {
            const fetchedHighScore = await TimeAttackStorage.FetchHighScore(highScoreKey);

            if (
                fetchedHighScore === null ||
                fetchedHighScore.solveCount < timeAttackScore.solveCount ||
                (fetchedHighScore.solveCount == timeAttackScore.solveCount && fetchedHighScore.totalTime > timeAttackScore.totalTime)
            ) {
                setDidBeatHighScore(true);
                await TimeAttackStorage.SaveHighScore(highScoreKey, timeAttackScore);
            } else {
                setDidBeatHighScore(false);
            }

            setPreviousHighScore(fetchedHighScore);
        }

        checkHighScore();
    }, [highScoreKey, timeAttackScore.totalTime, timeAttackScore.solveCount]);

    function ScoreText(props: { scoreObject: { totalTime: number; solveCount: number }; title?: string; style?: StyleProp<TextStyle> }) {
        const { scoreObject, style, title } = props;
        return (
            <>
                {title && <Text style={[styles.descriptionText, style]} children={title} />}
                <View style={styles.scoreTable}>
                    <View style={styles.row}>
                        <Text style={[styles.descriptionText, styles.scoreLabel, style]}>Solves:</Text>
                        <Text style={[styles.descriptionText, styles.scoreField, style]}>
                            {scoreObject.solveCount}/{totalCount}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.descriptionText, styles.scoreLabel, style]}>Total Time:</Text>
                        <Text style={[styles.descriptionText, styles.scoreField, style]}>{GetTimeText(scoreObject.totalTime)}</Text>
                    </View>
                </View>
            </>
        );
    }

    function retry() {
        const { cases, highScoreKey, options } = props.route.params;
        props.navigation.replace("TimeAttackPlay", { cases, highScoreKey, options });
    }

    return (
        <View style={styles.container}>
            {previousHighScore === undefined ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    {didBeatHighScore ? (
                        <Text style={[styles.header, styles.beatHighScore]}>You beat your high score! Congratulations!</Text>
                    ) : (
                        <Text style={[styles.header, styles.done]}>Done!</Text>
                    )}
                    <ScoreText title="Your score is:" style={didBeatHighScore && styles.highScoreText} scoreObject={timeAttackScore} />
                    <View style={styles.highScoreView}>
                        {previousHighScore === null ? (
                            <Text style={styles.descriptionText}>This is the first time you've done this set!</Text>
                        ) : (
                            <ScoreText
                                title={`Your ${didBeatHighScore ? "previous " : ""}high score for ${totalCount === 1 ? "this case" : "these cases"} is:`}
                                style={!didBeatHighScore && styles.highScoreText}
                                scoreObject={previousHighScore}
                            />
                        )}
                    </View>
                    <Button style={styles.retryButton} mode="contained" children="Retry" onPress={retry}></Button>
                </>
            )}
        </View>
    );
};

export default TimeAttackEndScreen;
