import Ractive from 'ractive'
import template from "../modules/template.html"
import ractiveTap from 'ractive-events-tap'

export class App {

	constructor(data) {

		console.log(data)

		this.database = {

			first : "Headline",

			second : 	[{
							"label" : "Bedroom lights"
						},{
							"label" : "Close the door"
						},{
							"label" : "Turn the kitchen lights off"
						},{
							"label" : "Turn off the lights in the living room"
						},{
							"label" : "Kitchen"
						}]

		}

		this.ractivate()

	}

    ractivate() {

        var self = this
        Ractive.DEBUG = false;
        this.ractive = new Ractive({
            events: { 
                tap: ractiveTap
            },
            el: '#app',
            data: self.database,
            template: template
        })

        this.ractive.on( "sample", ( context, index ) => {

            console.log(`Tapped ${index}`)

        });

    }

}