import range from "./range";


export default function drawLineAntialiasing(ctx: CanvasRenderingContext2D, begin: number[], end: number[], stroke = 'black', pixelSize:number = 1): number[][] {
    if (stroke) {
        ctx.fillStyle = stroke;
    }
    
    let coordinates:number[][] = [];
    
    const x1:number = Math.floor(begin[0] / pixelSize);
    const y1:number = Math.floor(begin[1] / pixelSize);

    const x2:number = Math.floor(end[0] / pixelSize);
    const y2:number = Math.floor(end[1] / pixelSize);

    if(Math.abs(y2 - y1) < Math.abs(x2 - x1)) {
        if (x2 < x1) {
            coordinates = drawLineLow(ctx, x2, y2, x1, y1, pixelSize);
        }
        else {
            coordinates = drawLineLow(ctx, x1, y1, x2, y2, pixelSize);
        }
    } else {
        if (y1 > y2) {
            coordinates = drawLineHigh(ctx, x2, y2, x1, y1, pixelSize);
        }
        else {
            coordinates = drawLineHigh(ctx, x1, y1, x2, y2, pixelSize);
        }
    }

    return coordinates;
}

function drawLineHigh(ctx: CanvasRenderingContext2D, x1:number, y1:number, x2:number, y2:number, pixelSize:number = 1): number[][] {
	const dx = x2 - x1 + .0;
	const dy = y2 - y1 + .0;
	const gradient = y1 === y2 ? 1.0 : dx / dy;

    const coordinates:number[][] = [];

	let intery = x1 + gradient;
    range(y1, y2).forEach((y) => {
        const xCord = Math.floor(ipart(intery)) * pixelSize;
        const xCord2 = Math.floor(ipart(intery) + 1) * pixelSize;
        const yCord = Math.floor(y) * pixelSize;

        const alpha1 = rfpart(intery);
        const alpha2 = fpart(intery);

        ctx.globalAlpha = alpha1;
        ctx.fillRect(xCord, yCord, pixelSize, pixelSize);

        ctx.globalAlpha = alpha2;
		ctx.fillRect(xCord2, yCord, pixelSize, pixelSize);
		intery += gradient;
        
        coordinates.push([xCord, yCord, alpha1], [xCord2, yCord, alpha2]);
    });

    return coordinates;
}

function drawLineLow(ctx: CanvasRenderingContext2D, x1:number, y1:number, x2:number, y2:number, pixelSize:number = 1): number[][] {
	const dx = x2 - x1 + .0;
	const dy = y2 - y1 + .0;
	const gradient = x1 === x2 ? 1.0 : dy / dx;

    const coordinates:number[][] = [];
    
	let intery = y1 + gradient;
    range(x1, x2).forEach((x) => {
        const xCord = Math.floor(x) * pixelSize;
        const yCord = Math.floor(ipart(intery)) * pixelSize;
        const yCord2 = Math.floor(ipart(intery) + 1) * pixelSize;

        const alpha1 = rfpart(intery);
        const alpha2 = fpart(intery);

        ctx.globalAlpha = alpha1;
        ctx.fillRect(xCord, yCord, pixelSize, pixelSize);

        ctx.globalAlpha = alpha2;
		ctx.fillRect(xCord, yCord2, pixelSize, pixelSize);
		intery += gradient;

        coordinates.push([xCord, yCord , alpha1], [xCord, yCord2, alpha2]);
    });

    return coordinates;
}

const ipart = (x: number): number => (Math.floor(Math.floor(x) + .1));
const fpart = (x: number): number => x - ipart(x);
const rfpart = (x: number): number => 1 - fpart(x);