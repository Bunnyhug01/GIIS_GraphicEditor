import { range } from "@/app/utils/range";
import Point from "../Point";
import { MinimalConvexHullSolver, rotate } from "./MinimalConvexHullSolver";

export default class GrahamMinimalConvexHullSolver extends MinimalConvexHullSolver {

    solve(_a: Point[]): Point[] {
        const a = _a.filter((value, index) => _a.indexOf(value) === index)

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

        for (const i of range(2, n - 1)) {
            let j = i
            while(j > 1 && (rotate(a[p[0]], a[p[j - 1]], a[p[j]]) < 0)) {
                const t = p[j - 1]
                p[j - 1] = p[j]
                p[j] = t
                j--
            }
        }

        const result = [p[0], p[1]]
        for (const i of range(2, n - 1)) {
            while(rotate(a[result[result.length-2]], a[result[result.length-1]], a[p[i]]) < 0) {
                result.pop()
            }
            result.push(p[i])
        }

        return result.map((i) => a[i])
    }
}