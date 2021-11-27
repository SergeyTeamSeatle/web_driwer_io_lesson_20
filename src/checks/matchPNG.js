const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const MatchSnapshotOff = false
const screenDir ="match_screen/"

exports.screenFolder =screenFolder;
async function screenFolder () {
    if (!fs.existsSync(screenDir))
        await fs.mkdirSync(screenDir)
}



exports.toMatchSnapshot = toMatchSnapshot

async function toMatchSnapshot( name, rectangle) {
    if (rectangle === undefined) {
        rectangle = [{start: {x: 1, y: 1}, end: {x: 1, y: 1}}]
    }
    if (MatchSnapshotOff === false) {
        let browserName = browser.capabilities.browserName
        const pathCurrent = screenDir + name + '_' + browserName + '.new.png';
        const pathStandard = screenDir + name + '_' + browserName + '.old.png'
        const pathDiff = screenDir + name + '_' + browserName + '.diff.png'
        await screenFolder()
        await browser.saveScreenshot(pathCurrent)
        const img2 = PNG.sync.read(fs.readFileSync(pathCurrent));
        for (let item = 0; item < rectangle.length; item++) {
            for (let y = rectangle[item].start.y; y < rectangle[item].end.y; y++) {
                for (let x = rectangle[item].start.x; x < rectangle[item].end.x; x++) {
                    let idx = (img2.width * y + x) << 2;
                    img2.data[idx] = 255
                    img2.data[idx + 1] = 255
                    img2.data[idx + 2] = 255
                    img2.data[idx + 3] = img2.data[idx + 3] >> 1;
                }
            }
        }

        fs.writeFileSync(pathCurrent, PNG.sync.write(img2));
        if (fs.existsSync(pathStandard) === false) {
            fs.renameSync(pathCurrent, pathStandard);
            return false
        }


        const img1 = PNG.sync.read(fs.readFileSync(pathStandard));
        const {width, height} = img1;
        const diff = new PNG({width, height});
        let rez = await pixelmatch(img1.data, img2.data, diff.data, width, height, {
            threshold: 0.5,
            alpha: 0.5,
            includeAA: false
        });
        if (rez === 0) {
            fs.renameSync(pathCurrent, pathStandard);

            return true
        } else {
            fs.writeFileSync(pathDiff, PNG.sync.write(diff));
            return false
        }
    }
    return true

}