import {Case} from './Models';

const OLL: Case[] = [
    { id: -1, category: 'OLL', description: 'OLL 1 (Dot)', algorithm: "R U2 R2 F R F' U2 R' F R F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U2 R2 F R F' U2 R' F R F'", },
    { id: -1, category: 'OLL', description: 'OLL 2 (Dot)', algorithm: "F R U R' U' F' Fw R U R' U' Fw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=F R U R' U' F' Fw R U R' U' Fw'", },
    { id: -1, category: 'OLL', description: 'OLL 3 (Dot)', algorithm: "U' Fw R U R' U' Fw' U' F R U R' U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U' Fw R U R' U' Fw' U' F R U R' U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 4 (Dot)', algorithm: "U' Fw R U R' U' Fw' U F R U R' U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U' Fw R U R' U' Fw' U F R U R' U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 5 (Square)', algorithm: "U Rw' U2 R U R' U Rw", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U Rw' U2 R U R' U Rw", },
    { id: -1, category: 'OLL', description: 'OLL 6 (Square)', algorithm: "Rw U2 R' U' R U' Rw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw U2 R' U' R U' Rw'", },
    { id: -1, category: 'OLL', description: 'OLL 7 (Bolt)', algorithm: "Rw U R' U R U2 Rw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw U R' U R U2 Rw'", },
    { id: -1, category: 'OLL', description: 'OLL 8 (Bolt)', algorithm: "U2 Rw' U' R U' R' U2 Rw", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U2 Rw' U' R U' R' U2 Rw", },
    { id: -1, category: 'OLL', description: 'OLL 11 (Bolt)', algorithm: "U' Rw' R2 U R' U R U2 R' U M'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U' Rw' R2 U R' U R U2 R' U M'", },
    { id: -1, category: 'OLL', description: 'OLL 12 (Bolt)', algorithm: "U Lw L2 U' L U' L' U2 L U' M'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U Lw L2 U' L U' L' U2 L U' M'", },
    { id: -1, category: 'OLL', description: 'OLL 9', algorithm: "U R U R' U' R' F R2 U R' U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U R U R' U' R' F R2 U R' U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 10', algorithm: "R U R' y R' F R U' R' F' R", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U R' y R' F R U' R' F' R", },
    { id: -1, category: 'OLL', description: 'OLL 13', algorithm: "Rw U' Rw' U' Rw U Rw' F' U F", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw U' Rw' U' Rw U Rw' F' U F", },
    { id: -1, category: 'OLL', description: 'OLL 14', algorithm: "Lw' U Lw U Lw' U' Lw F U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Lw' U Lw U Lw' U' Lw F U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 15', algorithm: "Lw' U' Lw L' U' L U Lw' U Lw", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Lw' U' Lw L' U' L U Lw' U Lw", },
    { id: -1, category: 'OLL', description: 'OLL 16', algorithm: "Rw U Rw' R U R' U' Rw U' Rw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw U Rw' R U R' U' Rw U' Rw'", },
    { id: -1, category: 'OLL', description: 'OLL 17', algorithm: "R U R' U R' F R F' U2 R' F R F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U R' U R' F R F' U2 R' F R F'", },
    { id: -1, category: 'OLL', description: 'OLL 18', algorithm: "U2 F R U R' U y' R' U2 R' F R F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U2 F R U R' U y' R' U2 R' F R F'", },
    { id: -1, category: 'OLL', description: 'OLL 19', algorithm: "M U R U R' U' M' R' F R F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=M U R U R' U' M' R' F R F'", },
    { id: -1, category: 'OLL', description: 'OLL 20', algorithm: "M U R U R' U' M2 U R U' Rw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=M U R U R' U' M2 U R U' Rw'", },
    { id: -1, category: 'OLL', description: 'OLL 28', algorithm: "M' U M U2 M' U M", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=M' U M U2 M' U M", },
    { id: -1, category: 'OLL', description: 'OLL 21 (H)', algorithm: "R' U' R U' R' U R U' R' U2 R", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R' U' R U' R' U R U' R' U2 R", },
    { id: -1, category: 'OLL', description: 'OLL 22 (Pi)', algorithm: "R U2 R2 U' R2 U' R2 U2 R", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U2 R2 U' R2 U' R2 U2 R", },
    { id: -1, category: 'OLL', description: 'OLL 23 (Headlights)', algorithm: "R2 D R' U2 R D' R' U2 R'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R2 D R' U2 R D' R' U2 R'", },
    { id: -1, category: 'OLL', description: 'OLL 24 (Chameleon)', algorithm: "Rw U R' U' Rw' F R F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw U R' U' Rw' F R F'", },
    { id: -1, category: 'OLL', description: 'OLL 25 (Bowtie)', algorithm: "U F' Rw U R' U' Rw' F R", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U F' Rw U R' U' Rw' F R", },
    { id: -1, category: 'OLL', description: 'OLL 26 (Anti-sune)', algorithm: "R U2 R' U' R U' R'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U2 R' U' R U' R'", },
    { id: -1, category: 'OLL', description: 'OLL 27 (Sune)', algorithm: "R U R' U R U2 R'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U R' U R U2 R'", },
    { id: -1, category: 'OLL', description: 'OLL 29', algorithm: "r2 D' Rw U Rw' D r2 U' Rw' U' Rw", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=r2 D' Rw U Rw' D r2 U' Rw' U' Rw", },
    { id: -1, category: 'OLL', description: 'OLL 30', algorithm: "U2 F U R U2 R' U' R U2 R' U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U2 F U R U2 R' U' R U2 R' U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 41', algorithm: "U2 R U R' U R U2 R' F R U R' U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U2 R U R' U R U2 R' F R U R' U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 42', algorithm: "R' U' R U' R' U2 R F R U R' U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R' U' R U' R' U2 R F R U R' U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 31', algorithm: "R' U' F U R U' R' F' R", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R' U' F U R U' R' F' R", },
    { id: -1, category: 'OLL', description: 'OLL 32', algorithm: "R U B' U' R' U R B R'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U B' U' R' U R B R'", },
    { id: -1, category: 'OLL', description: 'OLL 43', algorithm: "Fw' L' U' L U Fw", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Fw' L' U' L U Fw", },
    { id: -1, category: 'OLL', description: 'OLL 44', algorithm: "Fw R U R' U' Fw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Fw R U R' U' Fw'", },
    { id: -1, category: 'OLL', description: 'OLL 33', algorithm: "R U R' U' R' F R F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U R' U' R' F R F'", },
    { id: -1, category: 'OLL', description: 'OLL 45', algorithm: "F R U R' U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=F R U R' U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 34', algorithm: "U2 R U R' U' x D' R' U R U' D x'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U2 R U R' U' x D' R' U R U' D x'", },
    { id: -1, category: 'OLL', description: 'OLL 46', algorithm: "R' U' R' F R F' U R", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R' U' R' F R F' U R", },
    { id: -1, category: 'OLL', description: 'OLL 35', algorithm: "R U2 R2 F R F' R U2 R'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U2 R2 F R F' R U2 R'", },
    { id: -1, category: 'OLL', description: 'OLL 36', algorithm: "U2 L' U' L U' L' U L U L F' L' F", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U2 L' U' L U' L' U L U L F' L' F", },
    { id: -1, category: 'OLL', description: 'OLL 37', algorithm: "F R U' R' U' R U R' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=F R U' R' U' R U R' F'", },
    { id: -1, category: 'OLL', description: 'OLL 38', algorithm: "R U R' U R U' R' U' R' F R F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U R' U R U' R' U' R' F R F'", },
    { id: -1, category: 'OLL', description: 'OLL 39', algorithm: "U L F' L' U' L U F U' L'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U L F' L' U' L U F U' L'", },
    { id: -1, category: 'OLL', description: 'OLL 40', algorithm: "U R' F R U R' U' F' U R", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=U R' F R U R' U' F' U R", },
    { id: -1, category: 'OLL', description: 'OLL 47', algorithm: "F' L' U' L U L' U' L U F", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=F' L' U' L U L' U' L U F", },
    { id: -1, category: 'OLL', description: 'OLL 48', algorithm: "F R U R' U' R U R' U' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=F R U R' U' R U R' U' F'", },
    { id: -1, category: 'OLL', description: 'OLL 49', algorithm: "Rw U' r2 U r2 U r2 U' Rw", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw U' r2 U r2 U r2 U' Rw", },
    { id: -1, category: 'OLL', description: 'OLL 50', algorithm: "Rw' U r2 U' r2 U' r2 U Rw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw' U r2 U' r2 U' r2 U Rw'", },
    { id: -1, category: 'OLL', description: 'OLL 51', algorithm: "Fw R U R' U' R U R' U' Fw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Fw R U R' U' R U R' U' Fw'", },
    { id: -1, category: 'OLL', description: 'OLL 52', algorithm: "R U R' U R U' y R U' R' F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U R' U R U' y R U' R' F'", },
    { id: -1, category: 'OLL', description: 'OLL 55', algorithm: "R U2 R2 U' R U' R' U2 F R F'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U2 R2 U' R U' R' U2 F R F'", },
    { id: -1, category: 'OLL', description: 'OLL 56', algorithm: "Rw U Rw' U R U' R' U R U' R' Rw U' Rw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw U Rw' U R U' R' U R U' R' Rw U' Rw'", },
    { id: -1, category: 'OLL', description: 'OLL 53', algorithm: "Rw' U' R U' R' U R U' R' U2 Rw", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw' U' R U' R' U R U' R' U2 Rw", },
    { id: -1, category: 'OLL', description: 'OLL 54', algorithm: "Rw U R' U R U' R' U R U2 Rw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=Rw U R' U R U' R' U R U2 Rw'", },
    { id: -1, category: 'OLL', description: 'OLL 57', algorithm: "R U R' U' M' U R U' Rw'", imageUrl: "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=oll&case=R U R' U' M' U R U' Rw'", },
];

const PLL: Case[] = [
    {
        id: -1,
        category: 'PLL',
        description: 'Aa Permutation',
        algorithm: "x R' U R' D2 R U' R' D2 R2",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=x R' U R' D2 R U' R' D2 R2 x'&ac=black&ac=black&arw=U0U2,U2U8,U8U0",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Ab Permutation',
        algorithm: "x R2 D2 R U R' D2 R U' R x'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=x R2 D2 R U R' D2 R U' R x'&ac=black&arw=U0U8,U8U2,U2U0",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'E Permutation',
        algorithm: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=x' R U' R' D R U R' D' R U R' D R U' R' D' x&ac=black&arw=U0U6,U6U0,U2U8,U8U2",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'F Permutation',
        algorithm: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R&ac=black&arw=U2U8,U8U2,U1U7,U7U1",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Ga Permutation',
        algorithm: "R2 Uw R' U R' U' R Uw' R2 y' R' U R",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R2 Uw R' U R' U' R Uw' R2 y' R' U R&ac=black&arw=U6U0-red,U0U2-red,U2U6-red,U3U5-blue,U5U1-blue,U1U3-blue",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Gb Permutation',
        algorithm: "R' U' R U D' R2 U R' U R U' R U' R2 D",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R' U' R U D' R2 U R' U R U' R U' R2 D&ac=black&arw=U8U0-red,U0U6-red,U6U8-red,U7U3-blue,U3U1-blue,U1U7-blue",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Gc Permutation',
        algorithm: "R2 U' R U' R U R' U R2 D' U R U' R' D",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R2 U' R U' R U R' U R2 D' U R U' R' D&ac=black&arw=U0U6-red,U6U8-red,U8U0-red,U3U5-blue,U5U7-blue,U7U3-blue",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Gd Permutation',
        algorithm: "R U R' U' D R2 U' R U' R' U R' U R2 D'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R U R' U' D R2 U' R U' R' U R' U R2 D'&ac=black&arw=U6U0-red,U0U2-red,U2U6-red,U3U7-blue,U7U1-blue,U1U3-blue",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'H Permutation',
        algorithm: "M2 U' M2 U2 M2 U' M2",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=M2 U' M2 U2 M2 U' M2&ac=black&arw=U1U7,U7U1,U3U5,U5U3",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Ja Permutation',
        algorithm: "R' U L' U2 R U' R' U2 R L",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R' U L' U2 R U' R' U2 R L&ac=black&arw=U1U3,U3U1,U0U2,U2U0",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Jb Permutation',
        algorithm: "R U R' F' R U R' U' R' F R2 U' R'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R U R' F' R U R' U' R' F R2 U' R'&ac=black&arw=U2U8,U8U2,U5U7,U7U5",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Na Permutation',
        algorithm: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'&ac=black&arw=U1U7,U7U1,U0U8,U8U0",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Nb Permutation',
        algorithm: "R' U R U' R' F' U' F R U R' F R' F' R U' R",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R' U R U' R' F' U' F R U R' F R' F' R U' R&ac=black&arw=U1U7,U7U1,U2U6,U6U2",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Ra Permutation',
        algorithm: "R U' R' U' R U R D R' U' R D' R' U2 R'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R U' R' U' R U R D R' U' R D' R' U2 R'&ac=black&arw=U2U8,U8U2,U1U3,U3U1",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Rb Permutation',
        algorithm: "R' U2 R U2 R' F R U R' U' R' F' R2",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R' U2 R U2 R' F R U R' U' R' F' R2&ac=black&arw=U0U2,U2U0,U5U7,U7U5",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'T Permutation',
        algorithm: "R U R' U' R' F R2 U' R' U' R U R' F'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R U R' U' R' F R2 U' R' U' R U R' F'&ac=black&arw=U2U8,U8U2,U3U5,U5U3",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Ua Permutation',
        algorithm: "R U' R U R U R U' R' U' R2",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R U' R U R U R U' R' U' R2&ac=black&arw=U3U7,U7U5,U5U3",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Ub Permutation',
        algorithm: "R2 U R U R' U' R' U' R' U R'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R2 U R U R' U' R' U' R' U R'&ac=black&arw=U3U5,U5U7,U7U3",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'V Permutation',
        algorithm: "R' U R' U' y R' F' R2 U' R' U R' F R F",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=R' U R' U' y R' F' R2 U' R' U R' F R F&ac=black&arw=U0U8,U8U0,U1U5,U5U1",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Y Permutation',
        algorithm: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=F R U' R' U' R U R' F' R U R' U' R' F R F'&ac=black&arw=U0U8,U8U0,U1U3,U3U1",
    },
    {
        id: -1,
        category: 'PLL',
        description: 'Z Permutation',
        algorithm: "M2 U' M2 U' M' U2 M2 U2 M'",
        imageUrl:
            "http://cube.rider.biz/visualcube.php?fmt=png&size=500&view=plan&stage=pll&case=M2 U' M2 U' M' U2 M2 U2 M'&ac=black&arw=U1U5,U5U1,U3U7,U7U3",
    },
];

export const ALGORITHM_SETS: Map<string, Case[]> = new Map([['OLL', OLL], ['PLL', PLL]]);
