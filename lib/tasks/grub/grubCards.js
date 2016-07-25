var jsdom = require('js-dom');
var html = require('./data');
var request = require('request');
var fs = require('fs');


const extractStats = (td) => {
    const id = td.id;
    const stats = td.childNodes[2].textContent + '';
    const trimmed = stats.trim().slice(-4);
    return {
        id,
        power: trimmed[0],
        cardClass: trimmed[1],
        pDef: trimmed[2],
        mDef: trimmed[3]
    };
};

const extractImg = (th) => {

    return th.querySelector('img').src;
};


const onLoad = (err, window) => {
    // const cards = window.$('.full-width FFIX table tr');
    const pathToJson = `../../public/cards/cards.json`;
    const all = Array.prototype.slice.call(window.document.getElementsByTagName('tr'), 1);
    const result = all.reduce( (result, value) => {

        Array.prototype.slice.call(value.getElementsByTagName('td')).forEach((td) => result.stats.push(extractStats(td)));
        Array.prototype.slice.call(value.getElementsByTagName('th')).forEach((th) => result.images.push(extractImg(th)));

        return result;
    }, {stats: [], images: []});

    const cards = result.stats.map((el, index) => {
        const imgSrc = result.images[index];
        const pathToImg = `../../public/cards/${index}.webp`;
        request.get(imgSrc).pipe(fs.createWriteStream(pathToImg));
        return Object.assign(el, {img: pathToImg});

    });

    JSON.stringify(cards).pipe(fs.createWriteStream(pathToJson));

};


jsdom.env(html, ["http://code.jquery.com/jquery.js"],onLoad);
