import PixelDrawer from "../algorithms/drawer/PixelDrawer"
import TwoPointDrawer from "../algorithms/drawer/TwoPointDrawer"
import WithColor from "../algorithms/drawer/WithColor"
import DrawObject from "./DrawObject"
import { Line, crossProduction, toLines } from "./Line"
import Point from "./Point"

export default class PolygonDrawObject extends DrawObject {

    drawer: TwoPointDrawer

    constructor(drawer: TwoPointDrawer) {
        super()
        this.drawer = drawer
    }

    draw(drawer: PixelDrawer) {
        for (const line of this.getLines()) {
            this.drawer.draw(drawer, line.point1, line.point2)
			const normal = line.normal
			const center = line.center
			const color = this.isHull() ? 'yellow' : 'green'
			this.drawer.draw(new WithColor(drawer, color), center, new Point(center.x + (normal.x * -10), center.y + (normal.y * -10)))
        }
    }
    
	isHull(): Boolean {
        const lines = [...this.getLines()]
        if(lines.length < 3)
            return false
        lines.push(lines[0])
        for(var i = 0; i < lines.length - 1; i++) {
            const a = lines[i+0]
            const b = lines[i+1]
            if(crossProduction(a, b) < 0)
                return false
        }
		return true
	}

	isInside(point: Point): Boolean {
		throw new Error("Method not implemented.")
    }
}