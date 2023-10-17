import BasePixelDrawer from "../algorithms/drawer/BasePixelDrawer"
import PixelDrawer from "../algorithms/drawer/PixelDrawer"
import Point from "./Point"

export default class DrawObject {
	
    getPoints(): Point[] {
		throw new Error("Method not implemented.")
	}

    draw(drawer:PixelDrawer) {}

    countPixel(): number {
        let count = 0
        let counter: PixelDrawer =  {
            drawPixel(x: number, y: number, a:number = 1) {
                count++
            }
        }
        this.draw(counter)
        return count
    }

}