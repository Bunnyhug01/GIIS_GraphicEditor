import PixelDrawer from "./PixelDrawer";

export default class BasePixelDrawer extends PixelDrawer {

    ctx: CanvasRenderingContext2D;
    pixelSize: number;
    color: string;

    constructor(ctx: CanvasRenderingContext2D, pixelSize:number = 1, color:string = 'black'){
        super();
        this.ctx = ctx;
        this.pixelSize = pixelSize;
        this.color = color;
    }

    drawColorPixel(x: number, y: number, color: string): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
    }

    drawPixel(x: number, y: number, a: number = 1): void {
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = a
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
        this.ctx.globalAlpha = 1
    }

    getWidth(): number {
        return this.ctx.canvas.width / this.pixelSize
    }

    getHeight(): number {
        return this.ctx.canvas.height / this.pixelSize
    }
}