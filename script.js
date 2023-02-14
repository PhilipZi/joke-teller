const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



 
function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
    VoiceRSS.speech({
        key: 'aea2f4f045bd4544be60f9723444d244',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
       
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);