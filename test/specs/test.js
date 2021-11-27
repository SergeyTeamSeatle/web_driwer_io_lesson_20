const menuDocs = require("../../data/menuDocs.json")
const menuApi = require("../../data/menuAPI.json")
const subMenuAPI = require("../../data/subMenuAPI.json")
const subMenuDocs = require("../../data/subMenuDocs.json")
const startPageArea = require("../../data/cuttingArea/startPage.json")
let docsPage= require("../../src/objects/docsPage")
let apiPage= require("../../src/objects/apiPage")
let startPage= require("../../src/objects/basePage")
const chai = require('chai');
chai.should();
const assert =  chai.assert

describe('test sute', () => {
    it('Docs Page', async () => {
        await  docsPage.open()
        let  listMenu = await docsPage.getMenu()
        listMenu.should.to.be.eql(menuDocs,"menu items do not match")
        assert.isOk( await docsPage.matchScreen(), 'the screenshot is missing or does not match');
        for (let i=0;i<menuDocs.length;i++){
            let  listSubMenu = await  docsPage.getSubMenu(menuDocs[i])
            listSubMenu.should.to.be.eql(subMenuDocs[menuDocs[i]],"Sum menu " +menuDocs[i] +" items do not match")
        }

    });

    it('API Page', async () => {
        await  apiPage.open()
        let  listMenu = await apiPage.getMenu()
        listMenu.should.to.be.eql(menuApi,"menu items do not match")
        assert.isOk( await apiPage.matchScreen(), 'the screenshot is missing or does not match');
       for (let i=0;i<menuApi.length;i++){
           let  listSubMenu = await  apiPage.getSubMenu(menuApi[i])
           listSubMenu.should.to.be.eql(subMenuAPI[menuApi[i]],"Sum menu " +menuApi[i] +" items do not match")
       }
    });

    it('Start Page', async () => {
        const page = new startPage()
        await  page.open()
         assert.isOk( await page.matchScreen("star_page",startPageArea), 'the screenshot is missing or does not match');
    });
});

