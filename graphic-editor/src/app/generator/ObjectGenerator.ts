import DrawObject from "../objects/DrawObject";

export class ObjectGenerator {
    click(ctx: GeneratorContext, x: number, y:number) {}
    move(ctx: GeneratorContext, x: number, y:number) {}

    end(ctx: GeneratorContext) {}

    press(ctx: GeneratorContext, x: number, y:number) {}
    release(ctx: GeneratorContext, x: number, y:number) {}

}


export class GeneratorContext {
    isDebug():boolean { return false }

    add(obj: DrawObject) {}
    remove(obj: DrawObject) {}
}