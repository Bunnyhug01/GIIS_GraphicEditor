import Point from "@/app/objects/Point";
import PixelDrawer from "../PixelDrawer";
import TwoPointDrawer from "../TwoPointDrawer";

export default class DDALineDrawer extends TwoPointDrawer {
  draw(drawer: PixelDrawer, point1: Point, point2: Point): void {
    
    let x1 = point1.x;
    let y1 = point1.y;

    const x2 = point2.x;
    const y2 = point2.y;
    
    const L:number = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
      
    const dx:number = (x2 - x1) / L;
    const dy:number = (y2 - y1) / L;
  
    for (let i:number = 0; i <= L; i++) {
      x1 += dx;
      y1 += dy;

      drawer.drawPixel(Math.floor(x1), Math.floor(y1))
    }
  }
}

// export default function drawLineDDA(ctx: CanvasRenderingContext2D, begin: number[], end: number[], stroke = 'black', pixelSize:number = 1): number[][] {

//   if (stroke) {
//     ctx.fillStyle = stroke;
//   }

//   const coordinates:number[][] = [];

//   let x1:number = Math.floor(begin[0] / pixelSize);
//   let y1:number = Math.floor(begin[1] / pixelSize);

//   const x2:number = Math.floor(end[0] / pixelSize);
//   const y2:number = Math.floor(end[1] / pixelSize);

//   const L:number = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    
//   const dx:number = (x2 - x1) / L;
//   const dy:number = (y2 - y1) / L;

//   for (let i:number = 0; i <= L; i++) {
//     x1 += dx;
//     y1 += dy;

//     const xCord = Math.floor(x1) * pixelSize;
//     const yCord = Math.floor(y1) * pixelSize;

//     ctx.fillRect(xCord, yCord, pixelSize, pixelSize);
//     coordinates.push([xCord, yCord]);
//   }

//   return coordinates;
// }