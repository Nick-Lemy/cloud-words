const myParagraph = document.getElementById("myParagraph").textContent;
const myWordCloud = document.getElementById("myWordCloud");
// console.log(myParagraph)
const newParagraph = myParagraph.replace(/[,:;.\n]/g, "");
// console.log(newParagraph)
const newWords = newParagraph.trim().split(" ");
// console.log(newWords);
const wordCount = {};

newWords.forEach((word) => {
  wordCount[word.toLocaleLowerCase()] =
    (wordCount[word.toLocaleLowerCase()] || 0) + 1;
});
// console.log(wordCount);

const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
// console.log(sortedWords);

const filteredWords = sortedWords.filter((n) => n[0] !== "");
console.log(filteredWords);

let c = 56;
let b = 20;
let result = filteredWords.map((element) => {
  if (filteredWords.indexOf(element) === 0) {
    element[1] = 64;
  } else if (filteredWords.indexOf(element) === 1) {
    element[1] = 60;
  } else if (
    filteredWords.indexOf(element) >= 2 &&
    filteredWords.indexOf(element) < 11
  ) {
    element[1] = c;
    c -= c > 20 ? 1 : 0;
  } else if (filteredWords.indexOf(element) >= 11) {
    element[1] = b;
    b -= b > 20 ? 1 : 0;
  }
  return element;
});
console.log(result);

const fragment = document.createDocumentFragment();
const para = document.createElement("p");
for (let i = 0; i < result.length; i++) {
  const newPara = document.createElement("span");
  newPara.textContent = result[i][0];
  newPara.style.fontSize = result[i][1] + "px";
  newPara.style.margin = "10px";
  para.appendChild(newPara);
}

para.style.wordBreak = "break-word";
myWordCloud.appendChild(para);

/*
The most often occurring word should have a font size of 64px. 
The second most often occurring word should have a font size of 60px. 
The third most often occurring word should have a font size of 56px. 
And so on, down to the 12th most often occurring word with a font size of 20px.
*/
