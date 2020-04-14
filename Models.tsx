import { Platform, TouchableNativeFeedback } from "react-native";

export interface Case {
    imageUrl: string;
    id: string;
    description: string;
    algorithm: string;
}

export const TOUCHABLE_BACKGROUND =
    Platform.OS === "android"
        ? TouchableNativeFeedback.SelectableBackground()
        : undefined;

export const CASE_STUBS: Array<Case> = [
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "0",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "1",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "2",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "3",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "4",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "5",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "6",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "7",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "8",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "9",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "10",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "11",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "12",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "13",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "14",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "15",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "16",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "17",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "18",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "19",
        description: "Test",
        algorithm: "R U R' U' R' F R F'",
    },
];
