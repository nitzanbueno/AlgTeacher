import { CubeOptions, Masking } from "sr-visualizer";

/**
 * Returns an array with different options the user might want to add to their case.
 */
export const CUBE_IMAGE_OPTIONS: CubeOptions[] = [
    {},
    { view: "plan" },
    { view: "plan", mask: Masking.OLL },
    { view: "plan", mask: Masking.COLL },
    { view: "plan", mask: Masking.CMLL },
    { view: "plan", mask: Masking.WV },
    { mask: Masking.F2L },
    { mask: Masking.WV },
];
