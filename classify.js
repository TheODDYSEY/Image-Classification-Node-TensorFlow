const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

// raed the image 
const readImage = path => {
    const imageBuffer = fs.readFileSync(path);
    const tfimage = tfnode.node.decodeImage(imageBuffer);
    return tfimage;
  }

//   image classification function
const imageClassification = async path => {
    const image = readImage(path);
    const mobilenetModel = await mobilenet.load();
    const predictions = await mobilenetModel.classify(image);
    console.log('Classification Results:', predictions);
  }

// calling the function
if (process.argv.length !== 3) throw new Error('Incorrect arguments: node classify.js <IMAGE_FILE>');

imageClassification(process.argv[2]);
