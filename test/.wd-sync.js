const converter = require("selenium-html-js-converter");
const path = require('path');
const wdSync = require('wd-sync');
const fs = require('fs');

// Your test files and export path
const TEST_SCRIPTS_DIR = path.resolve(__dirname, 'Selenium/Tests');
const EXPORT_DIR = path.resolve(__dirname, 'Selenium/Export')

// Convert your tests
fs.readdir(TEST_SCRIPTS_DIR, (err, files) => {
  files.forEach(file => {
    console.log("converting file : ", file);
    converter.convertHtmlFileToJsFile(`${TEST_SCRIPTS_DIR}\/${file}`, `${EXPORT_DIR}\/${file.split('.')[0]}.js`);
  });
})

// // Your list of tests
var list_of_tests = new Array();

fs.readdir(EXPORT_DIR, (err, files) => {
  files.forEach(file => {
    const test = require(`${EXPORT_DIR}\/${file}`);
    if(typeof test === 'function') list_of_tests.push(test);
  });
});

// Run the tests
var client = wdSync.remote()
    , browser = client.browser
    , sync = client.sync;

sync(function(){
    browser.init( { browserName: 'chrome'} );
    for(var test of list_of_tests){
      test(browser);
    }
    browser.quit();
});