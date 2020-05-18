import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {getTimeText} from './Utils';
import {Case} from './Models';
import {getHighScore, setHighScore} from './TimeAttackStorage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        // justifyContent: "center",
    },
    header: {
        fontSize: 60,
        marginBottom: 20,
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 20,
    },
    highScoreView: {
        marginTop: 10,
        textAlign: 'center',
        alignItems: 'center',
    },
});

type Props = {route: {params: {cases: Case[]; totalTime: number; solveCount: number}}};
type State = {highScore: {totalTime: number; solveCount: number} | null};

export class TimeAttackEndScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {highScore: null};
    }

    async componentDidMount() {
        const {cases, totalTime, solveCount} = this.props.route.params;
        const highScore = await getHighScore(cases);

        if (highScore == null || highScore.solveCount < solveCount || (highScore.solveCount == solveCount && highScore.totalTime > totalTime)) {
            await setHighScore(cases, {totalTime, solveCount});
        } else {
            this.setState({highScore});
        }
    }

    getScoreText(scoreObject: {totalTime: number; solveCount: number}) {
        return `${scoreObject.solveCount}/${this.props.route.params.cases.length} solves in ${getTimeText(scoreObject.totalTime)}`;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Done!</Text>

                <Text style={styles.descriptionText}>Your total time is: </Text>
                <Text style={styles.descriptionText}>{this.getScoreText(this.props.route.params)}.</Text>
                <View style={styles.highScoreView}>
                    {this.state.highScore ? (
                        <>
                            <Text style={styles.descriptionText}>You didn't beat your high score!</Text>
                            <Text style={styles.descriptionText}>Your high score for this category is:</Text>
                            <Text style={styles.descriptionText}>{this.getScoreText(this.state.highScore)}.</Text>
                        </>
                    ) : (
                        <Text>You beat your high score! Congratulations!</Text>
                    )}
                </View>
            </View>
        );
    }
}
