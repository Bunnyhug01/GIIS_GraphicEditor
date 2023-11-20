import PixelDrawer from "./PixelDrawer";

export default class BasePixelDrawer extends PixelDrawer {

    ctx: CanvasRenderingContext2D;
    stroke:string;
    pixelSize:number;

    constructor(ctx: CanvasRenderingContext2D, pixelSize:number = 1, stroke:string = 'black'){
        super();
        this.ctx = ctx;
        this.stroke = stroke;
        this.pixelSize = pixelSize;
    }

    drawColorPixel(x: number, y: number, color: string): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
    }

    drawPixel(x: number, y: number, a: number = 1): void {
        this.ctx.fillStyle = this.stroke;
        this.ctx.globalAlpha = a
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
    }
}