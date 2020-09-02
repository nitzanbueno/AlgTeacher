import { DefaultTheme } from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      startButton: string;
      stopButton: string;
      solutionButton: string;
    }
  }
}

const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
    // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    solutionButton: "#7F7F7F",
    startButton: "#26C281",
    stopButton: "dodgerblue"
  }
}

export default theme;