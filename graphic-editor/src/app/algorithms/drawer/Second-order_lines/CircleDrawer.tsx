import Point from "@/app/objects/Point";
import PixelDrawer from "../PixelDrawer";
import TwoPointDrawer from "../TwoPointDrawer";


export default class CircleDrawer extends TwoPointDrawer {

    draw(drawer: PixelDrawer, point1: Point, point2: Point) {
        const x1 = point1.x;
        const y1 = point1.y;
    
        const x2 = point2.x;
        const y2 = point2.y;

        const dx:number = x2 - x1
        const dy:number = y2 - y1
        const R:number = Math.floor(Math.sqrt(dx * dx + dy))

        let x = 0
		let y = R
		let delta = 3 - 2 * R
		while(x <= y) {
			drawer.drawPixel(x1 + x, y1 + y)
			drawer.drawPixel(x1 + x, y1 - y)
			drawer.drawPixel(x1 - x, y1 + y)
			drawer.drawPixel(x1 - x, y1 - y)
			drawer.drawPixel(x1 + y, y1 + x)
			drawer.drawPixel(x1 + y, y1 - x)
			drawer.drawPixel(x1 - y, y1 + x)
			drawer.drawPixel(x1 - y, y1 - x)

			delta +=
				(delta < 0) ?
					4 * x + 6
				:
					4 * (x - y--) + 10
			++x
		}
    }
}