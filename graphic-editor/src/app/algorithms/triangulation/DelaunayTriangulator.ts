import Point from "@/app/objects/Point";
import Triangulator from "./Triangulator";
import { Line } from "@/app/objects/Line";
import JarvisMinimalConvexHullSolver from "@/app/objects/solver/JarvisMinimalConvexHullSolver";
import { rotate } from "@/app/objects/solver/MinimalConvexHullSolver";
import isLinesEqual from "@/app/utils/isLinesEqual";


export default class DelaunayTriangulator extends Triangulator {
    
    solve(points: Point[]): Line[] | null {

        try {
            const pointsArr = Array.from(points);
            if (pointsArr.length < 3) {
                return [];
            }

            const result: Line[] = [];
            const active: Line[] = [];
            
            {
                const ps = new JarvisMinimalConvexHullSolver().solve(pointsArr);
                active.push(new Line(ps[0], ps[1]));
            }
            
            const distance = (a: Point, b: Point): number => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                return dx * dx + dy * dy;
            }
            
            const sopr = (ab: Line): Point | null => {
                const a = ab.point1;
                const b = ab.point2;
                const filteredPoints = pointsArr.filter(it => rotate(a, b, it) > 0);

                if (filteredPoints.length === 0) {
                    return null
                }

                return filteredPoints.reduce((minPoint: Point, currentPoint: Point) => {
                    const minDistance = distance(triangleCenter(a, b, minPoint), a);
                    const currentDistance = distance(triangleCenter(a, b, currentPoint), a);
                    
                    return currentDistance < minDistance ? currentPoint : minPoint;
                });
            }
            
            while (active.length > 0) {
                const e = active.pop()!;
                result.push(e);
                const p = sopr(e);

                if (!p) {
                    continue;
                }

                const a = new Line(e.point1, p);
                const b = new Line(p, e.point2);
                
                const up = (a: Line) => {
                    if (isLinesEqual(a, result)) {
                        throw new Error(`${a} in ${result}`);
                    }
                    if (isLinesEqual(a, active)) {

                        const index = active.indexOf(a)

                        if (index !== -1)
                            active.splice(index, 1)

                        result.push(a);
                    } else {
                        active.push(a);
                    }
                }

                up(a);
                up(b);
            
            }

            return result;  
        
        } catch {
            return null
        }

    }
    
}

function triangleCenter(a:Point, b:Point, c:Point) {
    return new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3)
}