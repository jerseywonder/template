import loadJson from './modules/load-json/'
import { App } from './modules/app'
import './main.scss';

const app = {

	init: () => {

		loadJson('https://interactive.guim.co.uk/docsdata/1IRGyMr0bqUhKReesVdvW4dev8SBw8kwQIO8zv2xpaqU.json?t=' + new Date().getTime())
			.then((resp) => {
				new App(resp.sheets.data)
			})

	}

}

app.init()