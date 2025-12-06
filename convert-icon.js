const pngToIco = require('png-to-ico');
const fs = require('fs');

pngToIco('icon.png')
    .then(buf => {
        fs.writeFileSync('icon.ico', buf);
        console.log('✓ Icon converted to ICO format successfully!');
    })
    .catch(err => {
        console.error('Error converting icon:', err);
    });
