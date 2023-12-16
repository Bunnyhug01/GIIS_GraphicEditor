import { Line, toLines } from "@/app/objects/Line";
import Point from "@/app/objects/Point";
import Triangulator from "./Triangulator";
import JarvisMinimalConvexHullSolver from "@/app/objects/solver/JarvisMinimalConvexHullSolver";
import GrahamMinimalConvexHullSolver from "@/app/objects/solver/GrahamMinimalConvexHullSolver";

export default class SimpleTriangulator extends Triangulator {
    
    solve(points: Point[]): Line[] {
        const result: Line[] = []
        
        const jarvis = new GrahamMinimalConvexHullSolver().solve(points);
        result.push(...toLines(jarvis))

        const a = jarvis[0]

        for (let i = 1; i < jarvis.length; i++) {
            result.push(new Line(a, jarvis[i]))
        }

        return result
    }
}