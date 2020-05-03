const numRes = document.querySelector('.nums');

// Part 1
fourNums = [];

for (let i = 0; i < 5; i++) {
  fourNums.push(axios.get('http://numbersapi.com/26?json'));
}

Promise.all(fourNums)
  .then((numArr) => {
    for (res of numArr) {
      let pTag = document.createElement('P');
      let numFact = document.createTextNode(res.data.text);
      pTag.appendChild(numFact);
      numRes.append(pTag);
    }
  })
  .catch((error) => console.log(error));
//-------------------------------------------------------------------------------
