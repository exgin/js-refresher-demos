const $cardRes = $('.cards');
const $draw = $('.btn');

const deckNum = '3xrla41ed388';
const baseUrl = 'https://deckofcardsapi.com/api/deck/';

function app() {
  $draw.on('click', async function () {
    axios
      .get(`${baseUrl}/new/shuffle/?deck_count=1`)
      .then(() => {
        deck = axios.get(`${baseUrl}/${deckNum}/draw/?count=1`);
        return deck;
      })
      .then((res) => {
        deck = axios.get(`${baseUrl}/new/draw/?count=1`);
        return deck;
      })
      .then((res) => {
        for (cards of res.data.cards) {
          let cardImg = cards.images['png'];
          let angle = Math.random() * 90 - 45;
          let randomX = Math.random() * 40 - 20;
          let randomY = Math.random() * 40 - 20;
          $cardRes.append(
            $('<img>', {
              src: cardImg,
              css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
              },
            })
          );
        }
      });
  });
}

app();
