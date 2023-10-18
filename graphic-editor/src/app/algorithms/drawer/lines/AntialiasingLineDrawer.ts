import Point from "@/app/objects/Point";
import { range } from "../../../utils/range";
import PixelDrawer from "../PixelDrawer";
import TwoPointDrawer from "../TwoPointDrawer";

export default class AntialiasingLineDrawer extends TwoPointDrawer {
    draw(ctx: PixelDrawer, point1: Point, point2: Point) {
        const x1 = point1.x
        const y1 = point1.y;

        const x2 = point2.x;
        const y2 = point2.y;

        if(Math.abs(y2 - y1) < Math.abs(x2 - x1)) {
            if (x2 < x1) {
                drawLineLow(ctx, x2, y2, x1, y1);
            }
            else {
                drawLineLow(ctx, x1, y1, x2, y2);
            }
        } else {
            if (y1 > y2) {
                drawLineHigh(ctx, x2, y2, x1, y1);
            }
            else {
                drawLineHigh(ctx, x1, y1, x2, y2);
            }
        }
    }
}

function drawLineHigh(ctx: PixelDrawer, x1:number, y1:number, x2:number, y2:number) {
	const dx = x2 - x1 + .0;
	const dy = y2 - y1 + .0;
	const gradient = y1 === y2 ? 1.0 : dx / dy;

	let intery = x1 + gradient;
    range(y1, y2).forEach((y) => {
        const xCord = Math.floor(ipart(intery));
        const xCord2 = Math.floor(ipart(intery) + 1);
        const yCord = Math.floor(y);

        const alpha1 = rfpart(intery);
        const alpha2 = fpart(intery);

        ctx.drawPixel(xCord, yCord, alpha1)
        ctx.drawPixel(xCord2, yCord, alpha2)

        intery += gradient;
    });
}

function drawLineLow(ctx: PixelDrawer, x1:number, y1:number, x2:number, y2:number) {
	const dx = x2 - x1 + .0;
	const dy = y2 - y1 + .0;
	const gradient = x1 === x2 ? 1.0 : dy / dx;
    
	let intery = y1 + gradient;
    range(x1, x2).forEach((x) => {
        const xCord = Math.floor(x);
        const yCord = Math.floor(ipart(intery));
        const yCord2 = Math.floor(ipart(intery) + 1);

        const alpha1 = rfpart(intery);
        const alpha2 = fpart(intery);

        ctx.drawPixel(xCord, yCord, alpha1)
        ctx.drawPixel(xCord, yCord2, alpha2)
        intery += gradient;
    });
}

const ipart = (x: number): number => (Math.floor(Math.floor(x) + .1));
const fpart = (x: number): number => x - ipart(x);
const rfpart = (x: number): number => 1 - fpart(x);