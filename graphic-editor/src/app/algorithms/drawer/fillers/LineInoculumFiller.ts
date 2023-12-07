import Point from "@/app/objects/Point";
import PolygonDrawObject from "@/app/objects/PolygonDrawObject";
import FillDrawer from "../FillDrawer";
import PixelDrawer from "../PixelDrawer";
import isPointsEqual from "@/app/utils/isPointsEqual";

export default class LineInoculumFiller extends FillDrawer {
    
    draw(drawer: PixelDrawer, polygon: PolygonDrawObject): void {
        const painted: Point[] = [];
        const stack: Point[] = [];

        let x:number = 0
        let y:number = 0
        for (const p of polygon.getPoints()) {
            x += p.x
            y += p.y
        }

        const center = new Point(Math.floor(x / polygon.getPoints().length), Math.floor(y / polygon.getPoints().length))

        stack.push(center);
        while(stack.length > 0) {

            const point: Point = stack.pop()!;
            if(isPointsEqual(point, painted))
                continue;

            if(point.x < 0 || point.x > 600)
                continue;
            if(point.y < 0 || point.y > 600)
                continue;

            const x = point.x
            const y = point.y
            let maxX = x;
            while(polygon.isInside(new Point(maxX, y)))
                maxX++;
            maxX--;

            let minX = x;
            while(polygon.isInside(new Point(minX, y)))
                minX--;
            minX++;

            for(let x = minX; x <= maxX; x++) {
                painted.push(new Point(x, y));
                drawer.drawPixel(x, y);
            }

            for(let x = minX; x <= maxX; x++) {
                const p = new Point(x, y + 1);
                if(polygon.isInside(p)) {
                    stack.push(p);
                    break;
                }
            }

            for(let x = minX; x <= maxX; x++) {
                const p = new Point(x, y - 1);
                if(polygon.isInside(p)) {
                    stack.push(p);
                    break;
                }
            }
        }
    }
    
    
}