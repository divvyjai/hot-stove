splitTitle();

// "intro" switches on the first-load entrance animations. It is removed again
// afterwards so that later re-renders (adding/removing things) don't replay them.
document.body.classList.add("intro");
renderAll();
validateSeason();
setTimeout(() => document.body.classList.remove("intro"), 1500);