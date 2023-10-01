import range from "./range";


export default function drawLineBresenham(ctx: CanvasRenderingContext2D, begin: number[], end: number[], stroke = 'black', pixelSize:number = 1): number[][] {
    if (stroke) {
        ctx.fillStyle = stroke;
    }

    let coordinates:number[][] = [];
  
    const x1:number = Math.floor(begin[0] / pixelSize);
    const y1:number = Math.floor(begin[1] / pixelSize);

    const x2:number = Math.floor(end[0] / pixelSize);
    const y2:number = Math.floor(end[1] / pixelSize);
    
    if (Math.abs(y2 - y1) < Math.abs(x2 - x1)) {
        if (x2 > x1){
            coordinates = drawLineLow(ctx, x1, y1, x2, y2, pixelSize);
        }
        else {
            coordinates = drawLineLow(ctx, x2, y2, x1, y1, pixelSize);
        }
    }
    else {
      if (y1 > y2) {
        coordinates = drawLineHigh(ctx, x2, y2, x1, y1, pixelSize);
      }
      else {
        coordinates = drawLineHigh(ctx, x1, y1, x2, y2, pixelSize);
      }  
    }
    
    return coordinates;
}

// y1 < y2
// dx < dy
function drawLineHigh(ctx: CanvasRenderingContext2D, x1:number, y1:number, x2:number, y2:number, pixelSize:number = 1): number[][] {
    const coordinates:number[][] = [];
    
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
        const xCord = Math.floor(x) * pixelSize;
        const yCord = Math.floor(y) * pixelSize;

        ctx.fillRect(xCord, yCord, pixelSize, pixelSize);
        coordinates.push([xCord, yCord]);

        if (D > 0) {
            x += xi;
            D -= 2 * dy
        } 
        D += 2 * dx;
        
    });

    return coordinates;

}


function drawLineLow(ctx: CanvasRenderingContext2D, x1:number, y1:number, x2:number, y2:number, pixelSize:number = 1): number[][] {
    const coordinates:number[][] = [];
    
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
        const xCord = Math.floor(x) * pixelSize;
        const yCord = Math.floor(y) * pixelSize;

        ctx.fillRect(xCord, yCord, pixelSize, pixelSize);
        coordinates.push([xCord, yCord]);

        if (D > 0) {
            y += yi;
            D -= 2 * dx
        }
        D += 2 * dy;
        
    });

    return coordinates;
}