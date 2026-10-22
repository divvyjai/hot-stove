# Pennant Chase

A fantasy MLB schedule creator.

## WIP
- Calendar
- Playoff Customisation

## Limitations

The real MLB schedule (as of 2023) has an unequal split between divisional, intraleague and interleague games. Teams play exactly 13 games against each division rival,
6 or 7 games against each of the teams in the rest of the league, 4 games against one "natural" interleague rival, and the 3 games against every other interleague rival. The 
current model doesn't allow for this variability, and instead has a fixed split of games that users can change. In the future, this may be implemented as a more advanced
model, but since this is currently just a fantasy schedule generator (which aims to allow fans to create simpler schedules to avoid cases like this) it's been kept
unimplemented.