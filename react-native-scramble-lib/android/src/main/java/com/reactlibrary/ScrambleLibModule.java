package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import org.worldcubeassociation.tnoodle.puzzle.ThreeByThreeCubePuzzle;
import org.worldcubeassociation.tnoodle.scrambles.AlgorithmBuilder;
import org.worldcubeassociation.tnoodle.scrambles.InvalidScrambleException;
import org.worldcubeassociation.tnoodle.scrambles.Puzzle;

public class ScrambleLibModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ScrambleLibModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ScrambleLib";
    }

    /**
     * Generates a scramble algorithm for a case.
     * @param caseToScramble The case to generate a scramble for.
     * @param done           Called when the case is generated.
     *                       The first parameter is true if the generation succeeded, false otherwise.
     *                       The second parameter is the scramble (or an empty string if generation failed).
     */
    @ReactMethod
    public void generateScramble(String caseToScramble, Callback done)  {
        ThreeByThreeCubePuzzle p = new ThreeByThreeCubePuzzle();
        Puzzle.PuzzleState solved = p.getSolvedState();
        Puzzle.PuzzleState caseState = null;
        try {
            caseState = solved.applyAlgorithm(caseToScramble);
        } catch (InvalidScrambleException e) {
            done.invoke(false, "");
            return;
        }

        // We want to generate a scramble for a case, and more importantly, we want it to suck.
        // Therefore, we limit the axis which should be used last in the solution, and U. Everything uses U.
        // However! We might have a cube rotation (x,y,z) or maybe other stuff at the end.
        // So if it's not an actual move, I discard it.
        String[] caseParts = AlgorithmBuilder.splitAlgorithm(caseToScramble);
        String axisRestriction = caseParts[caseParts.length - 1].substring(0, 1);

        if (!"FBRLUD".contains(axisRestriction)) {
            axisRestriction = null;
        }

        try {
            // Call the callback with our result
            done.invoke(true, p.solveIn(caseState, 1000, "U", axisRestriction));
        } catch (Exception e) {
            done.invoke(false, "");
        }
    }
}
