let qrImage = require('qr-image');
let fs = require('fs');

qrImage
  .image("http://www.nodejs.org", {type: 'png', size:20})
  .pipe(fs.createWriteStream("MyQrCode.png"));
