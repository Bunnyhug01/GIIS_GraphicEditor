import debugGrid from "./algorithms/debugGrid"
import BasePixelDrawer from "./algorithms/drawer/BasePixelDrawer"
import { GeneratorContext } from "./generator/ObjectGenerator"
import DebugDrawObject from "./objects/DebugDrawObject"
import DrawObject from "./objects/DrawObject"


class JSGeneratorContext extends GeneratorContext {

    objects: DrawObject[] = []
    debug: boolean = false
    pixelSize: number = 10

    constructor() {
      super()
    }

    getObjects(): DrawObject[] {
      return this.objects
    }

    add(obj: DrawObject): void {
      this.objects.push(obj)  
    }

    remove(obj: DrawObject): void {
      const index = this.objects.indexOf(obj)
      this.objects.splice(index, 1)
    }

    clear(): void {
      this.objects = []
      this.repaint()
    }

    setPixelSize(size: number) {
      this.pixelSize = size
    }
      

    isDebug(): boolean {
      return this.debug      
    }

    changeDebug() {
      if(this.debug)
        for(const e of this.objects)
          if(e instanceof DebugDrawObject) {
            this.objects.push(e.origin)
            const index = this.objects.indexOf(e)
            this.objects.splice(index, 1)
          }
      this.debug = !this.debug
      this.repaint()
    }

    repaint() {
		  this.paint()
    }
    
    removeDebugPoint() {
      for(const e of this.objects)
        if(e instanceof DebugDrawObject)
          e.removePoint()
    }
    addDebugPoint() {
      for(const e of this.objects)
        if(e instanceof DebugDrawObject)
          e.addPoint()
    }

    paint() {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pixelDrawer = new BasePixelDrawer(ctx, this.pixelSize)

      if (this.debug)
        debugGrid(ctx, canvas.width, canvas.height, this.pixelSize);

      for (const e of this.objects) {
        e.draw(pixelDrawer)
      }
    }

  }
  export const context = new JSGeneratorContext()