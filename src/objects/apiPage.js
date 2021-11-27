const BasePage = require("./basePage")

class ApiPage extends BasePage {


    async open () {
        await super.open()
        await this.apiBtn.click()
    }

    async getMenu () {
        return await super.getMenu( await this.listMenu)
    }

    async getMenuSubItems () {
        await super.openAllMenu( await this.listMenu)
        return await super.getMenu( await this.listMenuSubItems)
    }




    async matchScreen () {
        return await super.matchScreen( "docsAPI")
    }



    get apiBtn(){ return $('.//div[@class="navbar__items"]/a[@href="/docs/api"]')}
    get listMenu ( ){return $$(".//ul[@class='theme-doc-sidebar-menu menu__list']/li/a")}
    get listMenuSubItems (){return $$(".//ul[@class='theme-doc-sidebar-menu menu__list']/li/ul/li")}

}
module.exports= new ApiPage()