/**
 * Returns a string of URLs to images that could represent a specific case for the 3x3 Rubik's cube.
 * @param imageCase The case to generate image options for
 */
export function GenerateCaseImageOptions(imageCase: string): string[] {
    return [
        `https://algteacher.000webhostapp.com/visualcube.php?size=500&fmt=svg&case=${imageCase}`,
    //    `https://algteacher.000webhostapp.com/visualcube.php?size=500&fmt=svg&view=plan&case=${imageCase}`,
      //  `https://algteacher.000webhostapp.com/visualcube.php?size=500&fmt=svg&view=plan&stage=oll&case=${imageCase}`,
      //`https://algteacher.000webhostapp.com/visualcube.php?size=500&fmt=svg&view=plan&stage=coll&case=${imageCase}`,
 //   `https://algteacher.000webhostapp.com/visualcube.php?size=500&fmt=svg&view=plan&stage=wv&case=${imageCase}`,
        //`https://algteacher.000webhostapp.com/visualcube.php?size=500&fmt=svg&stage=f2l&case=${imageCase}`,
        //`https://algteacher.000webhostapp.com/visualcube.php?size=500&fmt=svg&stage=wv&case=${imageCase}`,
    ];
}
