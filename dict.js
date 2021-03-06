#!/usr/bin/env node

var args = process.argv.slice(2),
    cheerio = require('cheerio'),
    request = require("request");

request({
  uri: "http://dict.youdao.com/search?q=" + args[0],
}, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);

    var error = $('.error-wrapper'),
        chineseToEnglish = $('#phrsListTab .contentTitle'),
        cTranslation = $('#phrsListTab .trans-container ul li');

    if (error.length > 0) {
        console.log("Could not find corresponding translations.");
        process.exit();
    }

    if (cTranslation.length > 0) {
        for(var i = 0; i < cTranslation.length; i++) {
            console.log(cTranslation[i]['children'][0].data);
        }
        process.exit();
    }

    if (chineseToEnglish.length > 0) {
        for(var i = 0; i < chineseToEnglish.length; i++) {
            console.log(chineseToEnglish[i]['children'][0].data);
        }
        process.exit();
    }
    
    var pronounce = $('#phrsListTab .phonetic'),
        additional = $('#phrsListTab .additional'),
        translation = $('#phrsListTab ul li'),
        eTranslation = $('#webTransToggle #tEETrans ul li .pos'), 
        eDiscription = $('#webTransToggle #tEETrans ul li .def'),
        eExplanation = $('#webTransToggle #tEETrans ul li em');


    console.log("Pronunciation England: " + pronounce[0]['children'][0].data);
    console.log("Pronunciation US: " + pronounce[0]['children'][0].data);
    console.log("Translations: ");

    for(var i = 0; i < translation.length; i++) {
        console.log(translation[i]['children'][0].data);
    }

    console.log("English Translation: \n");

    for (var i = 0; i < eTranslation.length; i++) {
        console.log(eTranslation[i]['children'][0].data);
    }

    for (var i = 0; i < eDiscription.length; i++) {
        console.log(eDiscription[i]['children'][0].data);
    }
   
    for (var i = 0; i < eExplanation.length; i++) {
        console.log(eExplanation[i]['children'][0].data);
    }
  } 
});
