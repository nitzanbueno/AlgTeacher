import React, { FC, useState, useEffect } from "react";
import { Text, View, StyleSheet, StyleProp, TextStyle } from "react-native";
import { GetTimeText } from "../Utils";
import TimeAttackStorage, { HighScoreType } from "../TimeAttackStorage";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        // justifyContent: "center",
    },
    header: {
        marginTop: 80,
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
});

interface Props {
    route: { params: { highScoreKey: string; totalTime: number; solveCount: number; totalCount: number } };
}

const TimeAttackEndScreen: FC<Props> = props => {
    const [highScore, setHighScore] = useState<HighScoreType | null>(null);

    const { highScoreKey, totalCount } = props.route.params;
    const timeAttackScore = { totalTime: props.route.params.totalTime, solveCount: props.route.params.solveCount };

    useEffect(() => {
        async function checkHighScore() {
            const fetchedHighScore = await TimeAttackStorage.FetchHighScore(highScoreKey);

            if (
                fetchedHighScore == null ||
                fetchedHighScore.solveCount < timeAttackScore.solveCount ||
                (fetchedHighScore.solveCount == timeAttackScore.solveCount && fetchedHighScore.totalTime > timeAttackScore.totalTime)
            ) {
                await TimeAttackStorage.SaveHighScore(highScoreKey, timeAttackScore);
            } else {
                setHighScore(fetchedHighScore);
            }
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

    return (
        <View style={styles.container}>
            {highScore ? (
                <Text style={[styles.header, styles.done]}>Done!</Text>
            ) : (
                <Text style={[styles.header, styles.beatHighScore]}>You beat your high score! Congratulations!</Text>
            )}

            <ScoreText title="Your score is:" style={!highScore && styles.highScoreText} scoreObject={timeAttackScore} />
            <View style={styles.highScoreView}>
                {highScore && (
                    <ScoreText title={`Your high score for ${totalCount === 1 ? "this case" : "these cases"} is:`} style={styles.highScoreText} scoreObject={highScore} />
                )}
            </View>
        </View>
    );
};

export default TimeAttackEndScreen;
