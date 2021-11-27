const matchPNG = require('../checks/matchPNG')
const startUrl = "https://webdriver.io/"

class BasePage {

    size = {
        "width": 1920,
        "height": 1080
    }

    async open() {
        await this.windowSize()
        await browser.url(startUrl)

    }

    async windowSize() {
        let size = await browser.getWindowSize()
        if (size.width !== this.size.width && size.height !== this.size.height) {
            await browser.setWindowSize(this.size.width, this.size.height)
        }
    }

    async getMenu(list) {

        let listName = []
        for (let item = 0; item < list.length; item++) {
            listName.push(await list[item].getText())
        }
        return listName
    }

    async matchScreen(name, rectangle) {
        return await matchPNG.toMatchSnapshot(name, rectangle)
    }


}

module.exports = BasePage
