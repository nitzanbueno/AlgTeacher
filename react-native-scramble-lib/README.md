# react-native-scramble-lib

## Getting started

`$ npm install react-native-scramble-lib --save`

### Mostly automatic installation

`$ react-native link react-native-scramble-lib`

## Usage
```javascript
import ScrambleLib from 'react-native-scramble-lib';

ScrambleLib.generateScramble("F", (success, scramble) => {
    if (success) {
        this.scramble = scramble;
    }
});
```
