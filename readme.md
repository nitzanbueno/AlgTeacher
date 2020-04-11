# AlgTeacher
AlgTeacher is a (WIP) tool that helps you learn Rubik's cube algorithms.

I'll create the full readme when the app is done (maybe).  
For now, here's a specification of what I want to have in the app on the first version:

## The main page
The main page should be a list of cases, some of them marked as "untested" (I think it's going to be a red coloring), some marked as "tested" (green coloring), and some unmarked.  
The unchecked cases should be at the top, then the checked ones, then the unmarked cases.  
When a case is tapped on, it'll open the case test page.  
There is also a + button to add an case.

## The case test page
The test page contains the picture of the case, and a scramble to generate the case (which should be generated using a Kociemba solution generator, as to not be the inverse of the solution algorithm).

The test page also contains the text "Do you remember the algorithm for this case?" with buttons for "Yes" and "No". 

If "Yes" is tapped, the case becomes "tested" and is marked as such (green color).  
If "No" is tapped, the case also becomes "tested" but the solution algorithm is displayed on screen.

## The case addition page
The case addition page asks for a description of the case, and the solution algorithm.

The page then renders a selection of pictures for the user to choose from - one from top view, another from the isometric view, F2L selection etc. This will be done using VisualCube.

After a picture is selected, the case is added.

## The test-marking algorithm
When will a case be marked as untested?

Once each day, the app will check all cases to see if any should be marked untested:
* A case added less than a week ago will be marked each day.
* A case added more than a week ago will be marked every 3 days.
* After 3 weeks, a case will not be marked.

This algorithm is subject to change based on how well I think I remember solutions for cases (when I forget them, etc.).