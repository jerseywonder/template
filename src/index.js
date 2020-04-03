import loadJson from './helpers/load-json/'
//import { App } from './apps/app'
import './main.scss';

// import utilities from './importer';

// var array = ["a", "b", "a"]

// console.log(utilities.has_duplicates(array))

// new App()

// Dynamically import modules... modules are compiled separately
import("./modules/hello-world")
  .then((importedModule) => {
    let instance = new importedModule.default("Hello world... yo sup world.")
  })

