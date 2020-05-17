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
});

type Props = {route: {params: {cases: Case[]; totalTime: number}}};
type State = {highScore: number | null};

export class TimeAttackEndScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {highScore: null};
    }

    async componentDidMount() {
        const {cases, totalTime} = this.props.route.params;
        const highScore = await getHighScore(cases);

        if (highScore == null || highScore > totalTime) {
            await setHighScore(cases, totalTime);
        } else {
            this.setState({highScore});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Done!</Text>
                <Text>Your total time is: {getTimeText(this.props.route.params.totalTime)}</Text>
                {this.state.highScore ? (
                    <>
                        <Text>You didn't beat your high score!</Text>
                        <Text>Your high score for this category is: {getTimeText(this.state.highScore)}</Text>
                    </>
                ) : (
                    <Text>You beat your high score! Congratulations!</Text>
                )}
            </View>
        );
    }
}
