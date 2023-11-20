import PixelDrawer from "./PixelDrawer";


export default class WithColor extends PixelDrawer {
    
    origin: PixelDrawer;
    color: string;

    constructor(origin: PixelDrawer, color: string) {
        super()
        this.origin = origin
        this.color = color
    }

    drawColorPixel(x: number, y: number, color: string) {
		throw new Error("Method not implemented.")
    }

    drawPixel(x: number, y: number, a?: number) {
        this.origin.drawColorPixel(x, y, this.color)
    }

}