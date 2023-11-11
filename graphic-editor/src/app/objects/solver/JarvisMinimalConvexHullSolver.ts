import { range } from "@/app/utils/range";
import Point from "../Point";
import { MinimalConvexHullSolver, rotate } from "./MinimalConvexHullSolver";

export default class JarvisMinimalConvexHullSolver extends MinimalConvexHullSolver {

    solve(a: Point[]): Point[] {
        const n = a.length
        if (n < 3) return []

        const p = range(0, n - 1)

        for (const i of range(1, n - 1)) {
            if (a[p[i]].x < a[p[0]].x) {
                const t = p[0]
                p[0] = p[i]
                p[i] = t
            }
        }

        const result = [p[0]]
        p.shift()
        p.push(result[0])

        while(true) {
            let right = 0
            for (const i of range(1, p.length - 1)) {
                if (rotate(a[result[result.length-1]], a[p[right]], a[p[i]]) < 0) {
                    right = i
                }
            }
            if (p[right] === result[0]) {
                break
            } else {
                result.push(p[right])
                p.splice(right, 1)
            }
        }

        return result.map((i) => a[i])
    }
}