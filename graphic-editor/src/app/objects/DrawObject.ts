import BasePixelDrawer from "../algorithms/drawer/BasePixelDrawer"
import PixelDrawer from "../algorithms/drawer/PixelDrawer"

export default class DrawObject {
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

    iterator() {throw new Error()}
}