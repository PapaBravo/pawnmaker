# pawnmaker
A small web utility to quickly generate printable pawns.

# Features

## User Story
The user is a gm for a ttrpg trying to quickly make a number of paper pawns to print out and use in a session.
The user can use existing art and just needs an easy way to build pawns.

### Steps
1. For a new pawn, the user enters a name
2. The user uploads a picture by file picker or drag and drop
3. The user optionally selects a size other than medium
4. The user optionally selects a number other then 1
5. The user repeats the steps for as many pawns as he wants
6. The user selects print and receives a pdf with all pawns (some are repeated multiple times if selected by the user)

### How do the pawns look like?
The following sizes exist
* Small: 2.9 cm wide, 2.9 cm tall
* Medium: 2.9 cm wide, 4.9 cm tall
* Large: 4.9 cm wide, 6.4 cm tall
* Huge: 7.6 cm wide, 9.9 cm tall

All pawns repeat the image, mirrored at the top so they can later be folded and glued together.
All pawns have a stand with the same width and a height of 1cm. 
This stand is rectangle that is attached at the bottom of the pawn and repeated at the top of the mirrored one.
The name of the pawn is printed in the bottom rectangle.

The uploaded image is scaled so it can fit into the box defined by the size of the pawn.

### Page
The page should be printable but the arrangement on the page can be done by the browsers print page function.
CSS assures that pawns including their stands stay together in case of line- or page breaks.

# Design Goals
The app is build with vanilla javascript.
Modern semantic HTML is used.
The structure of javascript and html focuses on readability and simplicity.
Dependencies are included from reputable remote locations to keep the deployment process trivial.
Dependencies are only used when absolutely necessary.
CSS is minimal and kept well structured in a single file.
Javascript is structured in clear functions and kept in a single file.
