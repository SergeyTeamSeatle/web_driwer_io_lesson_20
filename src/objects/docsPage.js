const BasePage = require("./basePage")

class DocsPage extends BasePage {

 async open () {
  await super.open()
  await this.docsBtn.click()
 }

 async getMenu () {
    return await super.getMenu( await this.listMenu)
 }

 async matchScreen () {
  return await super.matchScreen( "docsPage")
 }

 get docsBtn(){ return $('.//div[@class="navbar__items"]/a[@href="/docs/gettingstarted"]')}
 get listMenu ( ){return $$(".//ul[@class='theme-doc-sidebar-menu menu__list']/li/a")}
 get listMenuSubItems (){return $$(".//ul[@class='theme-doc-sidebar-menu menu__list']/li/ul/li")}
}
module.exports= new DocsPage()