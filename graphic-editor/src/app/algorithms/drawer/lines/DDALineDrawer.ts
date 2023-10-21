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