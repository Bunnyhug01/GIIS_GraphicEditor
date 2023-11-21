import PixelDrawer from "./PixelDrawer";

export default class BasePixelDrawer extends PixelDrawer {

    ctx: CanvasRenderingContext2D;
    pixelSize:number;

    constructor(ctx: CanvasRenderingContext2D, pixelSize:number = 1){
        super();
        this.ctx = ctx;
        this.pixelSize = pixelSize;
    }

    drawPixel(x: number, y: number, a: number = 1): void {
        this.ctx.globalAlpha = a
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
    }

    drawColorPixel(x: number, y: number, color: string): void {
        this.ctx.fillStyle = color 
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
    }
}