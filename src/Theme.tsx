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
    primary: "#5281CD",
    accent: "#875F9A",
    solutionButton: "#7F7F7F",
    startButton: "#4AB075",
    stopButton: "#478FD7"
  }
}

export default theme;