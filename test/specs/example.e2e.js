const menuDocs = require("../../data/menuDocs.json")
const menuApi = require("../../data/menuAPI.json")
const startPageArea = require("../../data/cuttingArea/startPage.json")
let DocsPage= require("../../src/objects/docsPage")
let apiPage= require("../../src/objects/apiPage")
let startPage= require("../../src/objects/basePage")
const chai = require('chai');
chai.should();
const assert =  chai.assert

describe('test sute', () => {
    it.skip('Docs Page', async () => {
        await  DocsPage.open()
        let  listMenu = await DocsPage.getMenu()
        listMenu.should.to.be.eql(menuDocs,"menu items do not match")
        assert.isOk( await DocsPage.matchScreen(), 'the screenshot is missing or does not match');
    });

    it.skip('API Page', async () => {
        await  apiPage.open()
        let  listMenu = await apiPage.getMenu()
        listMenu.should.to.be.eql(menuApi,"menu items do not match")
        assert.isOk( await apiPage.matchScreen(), 'the screenshot is missing or does not match');
    });

    it('Start Page', async () => {
        const page = new startPage()
        await  page.open()
         assert.isOk( await page.matchScreen("star_page",startPageArea), 'the screenshot is missing or does not match');
    });
});

