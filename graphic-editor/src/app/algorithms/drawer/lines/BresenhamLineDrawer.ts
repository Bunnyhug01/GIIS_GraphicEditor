import Point from "@/app/objects/Point";
import { range } from "../../../utils/range";
import PixelDrawer from "../PixelDrawer";
import TwoPointDrawer from "../TwoPointDrawer";

export default class BresenhamLineDrawer extends TwoPointDrawer {
    draw(ctx: PixelDrawer, point1: Point, point2: Point): void {
        const x1 = point1.x;
        const y1 = point1.y;
    
        const x2 = point2.x;
        const y2 = point2.y;

        if (Math.abs(y2 - y1) < Math.abs(x2 - x1)) {
            if (x2 > x1) {
                drawLineLow(ctx, point1.x, point1.y, point2.x, point2.y);
            } else {
                drawLineLow(ctx, point2.x, point2.y, point1.x, point1.y);
            }
        }
        else {
            if (y1 > y2) {
                drawLineHigh(ctx, point2.x, point2.y, point1.x, point1.y);
            } else {
                drawLineHigh(ctx, point1.x, point1.y, point2.x, point2.y);
            }  
        }
    }
}

// y1 < y2
// dx < dy
function drawLineHigh(ctx: PixelDrawer, x1:number, y1:number, x2:number, y2:number) {
    
    let dx:number = x2 - x1;
    const dy:number = y2 - y1;

    let xi:number = 1;
    if (dx < 0) {
        xi = -1;
        dx = -dx;
    }

    let D:number = (2 * dx) - dy;
    let x:number = x1;

    range(y1, y2).forEach((y) => {
        const xCord = Math.floor(Math.floor(x + .1));
        const yCord = Math.floor(Math.floor(y+ .1));

        ctx.drawPixel(xCord, yCord)

        if (D > 0) {
            x += xi;
            D -= 2 * dy
        } 
        D += 2 * dx;
        
    });

}


function drawLineLow(ctx: PixelDrawer, x1:number, y1:number, x2:number, y2:number) {
    
    const dx:number = x2 - x1;
    let dy:number = y2 - y1;

    let yi:number = 1;
    if (dy < 0) {
        yi = -1;
        dy = -dy
    }

    let D:number = 2 * dy - dx;
    let y = y1;

    range(x1, x2).forEach((x) => {
        const xCord = Math.floor(Math.floor(x + .1));
        const yCord = Math.floor(Math.floor(y+ .1));

        ctx.drawPixel(xCord, yCord)

        if (D > 0) {
            y += yi;
            D -= 2 * dx
        }
        D += 2 * dy;
        
    });
}