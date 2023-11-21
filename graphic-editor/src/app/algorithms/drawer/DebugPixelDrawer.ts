import PixelDrawer from "./PixelDrawer";

export default class DebugPixelDrawer extends PixelDrawer {
    originPixelDrawer:PixelDrawer;
    count:number;

    private _lastX:number = -1;
    private _lastY:number = -1;

    constructor(originPixelDrawer:PixelDrawer, count:number){
        super();
        this.originPixelDrawer = originPixelDrawer;
        this.count = count;
    }

    drawPixel(x: number, y: number, a: number = 1): void {
        if(this._lastX === x && this._lastY === y)
            return;

        if(this.count > 0) {
            this.count--;

            this._lastX = x;
            this._lastY = y;

            this.originPixelDrawer.drawPixel(x, y, a);
        }
    }

    drawColorPixel(x: number, y: number, color: string): void {
        if(this._lastX === x && this._lastY === y)
            return;

        if(this.count > 0) {
            this.count--;

            this._lastX = x;
            this._lastY = y;

            this.originPixelDrawer.drawColorPixel(x, y, color);
        }
    }
}