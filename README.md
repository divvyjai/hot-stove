# Hot Stove

A fantasy MLB schedule creator. I got the idea from [Jomboy's MLB Realignment](https://www.youtube.com/watch?v=zWMxbWX4D0M) video from last year, but most of the features
here are my own ideas.

## WIP
- Calendar (randomly generated based off the season settings and random series generation)
- Playoff Customisation (different series lengths, removal of wildcard series, and more advanced customisation)

## Limitations

The real MLB schedule (as of 2023) has an unequal split between divisional, intraleague and interleague games. Teams play exactly 13 games against each division rival,
6 or 7 games against each of the teams in the rest of the league, 4 games against one "natural" interleague rival, and the 3 games against every other interleague rival. The 
current model doesn't allow for this variability, and instead has a fixed split of games that users can change. In the future, this may be implemented as a more advanced
model, but since this is currently just a fantasy schedule generator (which aims to allow fans to create simpler schedules to avoid cases like this) it's been kept
unimplemented.

## AI Usage

The majority of the CSS styling was done using AI. Almost all of the HTML and Javascript however was written by me, with some AI assistance here and there.