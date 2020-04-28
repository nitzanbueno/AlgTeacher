/**
 * Returns a string of URLs to images that could represent a specific case for the 3x3 Rubik's cube.
 * @param imageCase The case to generate image options for
 */
export function GenerateCaseImageOptions(imageCase: string): string[] {
    return [
        `http://cube.crider.co.uk/visualcube.php?size=500&fmt=png&case=${imageCase}`,
        `http://cube.crider.co.uk/visualcube.php?size=500&fmt=png&view=plan&case=${imageCase}`,
        `http://cube.crider.co.uk/visualcube.php?size=500&fmt=png&view=plan&stage=oll&case=${imageCase}`,
        `http://cube.crider.co.uk/visualcube.php?size=500&fmt=png&stage=f2l&case=${imageCase}`,
        `http://cube.crider.co.uk/visualcube.php?size=500&fmt=png&stage=wv&case=${imageCase}`,
    ];
}
