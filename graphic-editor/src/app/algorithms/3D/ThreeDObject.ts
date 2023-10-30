import parseOBJ from "./parseObj";


export default async function ThreeDObject(obj?: File) {
   const canvas = document.createElement('canvas');

   canvas.id = "3Dcanvas";
   canvas.width = 1200;
   canvas.height = 720;
   canvas.style.zIndex = '60';
   canvas.style.position = "absolute";
   canvas.style.border = "1px solid";
    
    
   const canvasDiv = document.getElementById("canvases");
   canvasDiv!.appendChild(canvas);

   const gl = canvas.getContext('webgl')!;

   const text = await obj?.text().then((value) => {
      return value
   })

   const data = parseOBJ(text ? text : '');

   /*========== Defining and storing the geometry ==========*/

   const vertices = data.position

   // Create and store data into vertex buffer
   const vertex_buffer = gl!.createBuffer ();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


   /*=================== SHADERS =================== */

   const vertCode = 'attribute vec3 position;'+
      'uniform mat4 Pmatrix;'+
      'uniform mat4 Vmatrix;'+
      'uniform mat4 Mmatrix;'+
      'void main(void) { '+//pre-built function
         'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);'+
      '}';

   const fragCode = 'precision mediump float;'+
      'void main(void) {'+
         'gl_FragColor = vec4(144, 0, 255, 1.);'+
      '}';

   const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
   gl.shaderSource(vertShader, vertCode);
   gl.compileShader(vertShader);

   const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
   gl.shaderSource(fragShader, fragCode);
   gl.compileShader(fragShader);

   const shaderprogram = gl.createProgram()!;
   gl.attachShader(shaderprogram, vertShader);
   gl.attachShader(shaderprogram, fragShader);
   gl.linkProgram(shaderprogram);


   /*======== Associating attributes to vertex shader =====*/
   const _Pmatrix = gl.getUniformLocation(shaderprogram, "Pmatrix");
   const _Vmatrix = gl.getUniformLocation(shaderprogram, "Vmatrix");
   const _Mmatrix = gl.getUniformLocation(shaderprogram, "Mmatrix");

   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
   const _position = gl.getAttribLocation(shaderprogram, "position");
   gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,0,0);
   gl.enableVertexAttribArray(_position);

   gl.useProgram(shaderprogram);


   /*==================== MATRIX ====================== */

   function get_projection(angle: number, a:number, zMin:number, zMax:number) {
      const ang = Math.tan((angle*.5)*Math.PI/180);
      return [
         0.5/ang, 0 , 0, 0,
         0, 0.5*a/ang, 0, 0,
         0, 0, -(zMax+zMin)/(zMax-zMin), -1,
         0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 
      ];
    }

   const proj_matrix = get_projection(40, canvas.width/canvas.height, 1, 100);
   let mo_matrix = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];
   const view_matrix = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];

   view_matrix[14] = view_matrix[14]-6;


   /*================= Mouse events ======================*/

   const AMORTIZATION = 0.95;
   let drag = false;
   let old_x: number, old_y: number;
   let dX = 0, dY = 0;

   let THETA = 0;
   let PHI = 0;
   let time_old = 0;

   let x = 0, y = 0, z = 0, scaleX = 1, scaleY = 1, scaleZ = 1;

   const mouseDown = function(e: MouseEvent) {
      drag = true;
      old_x = e.pageX, old_y = e.pageY;
      e.preventDefault();
      return false;
    };

   const mouseUp = function(e: MouseEvent){
      drag = false;
    };

   const mouseMove = function(e: MouseEvent) {
      if (!drag) return false;
      dX = (e.pageX-old_x)*2*Math.PI/canvas.width,
      dY = (e.pageY-old_y)*2*Math.PI/canvas.height;
      THETA+= dX;
      PHI+=dY;
      old_x = e.pageX, old_y = e.pageY;
      e.preventDefault();
    };

   const moveUp = (e: KeyboardEvent) => {
      switch(e.code) {
         case 'KeyW': 
            y++
            break;
         case 'KeyA': 
            x--
            break;         
         case 'KeyS': 
            y--
            break;
         case 'KeyD': 
            x++
            break;

         case 'KeyQ': 
            z++
            break;
         case 'KeyE': 
            z--
            break;

         case 'KeyM': 
            scaleX *= 1.1
            break;
         case 'KeyN': 
            scaleX /= 1.1
            break;

         case 'KeyK': 
            scaleY *= 1.1
            break;
         case 'KeyL': 
            scaleY /= 1.1
            break;

         case 'KeyO': 
            scaleZ *= 1.1
            break;
         case 'KeyP': 
            scaleZ /= 1.1
            break;
      }
   }

   canvas.addEventListener("mousedown", mouseDown, false);
   canvas.addEventListener("mouseup", mouseUp, false);
   canvas.addEventListener("mouseout", mouseUp, false);
   canvas.addEventListener("mousemove", mouseMove, false);
   document.addEventListener("keydown", moveUp, false);


   /*=================== Transformations =================== */

   function moveXYZ(m : number[], x: number, y: number, z: number) {
      m[12] += x
      m[13] += y
      m[14] += z
   }

   function scaleXYZ(m : number[], x: number, y: number, z: number) {
      m[0] *= x
      m[5] *= y
      m[10] *= z
   }

   function rotateX(m: number[], angle: number) {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const mv1 = m[1], mv5 = m[5], mv9 = m[9];

      m[1] = m[1]*c-m[2]*s;
      m[5] = m[5]*c-m[6]*s;
      m[9] = m[9]*c-m[10]*s;

      m[2] = m[2]*c+mv1*s;
      m[6] = m[6]*c+mv5*s;
      m[10] = m[10]*c+mv9*s;
   }

   function rotateY(m: number[], angle: number) {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const mv0 = m[0], mv4 = m[4], mv8 = m[8];

      m[0] = c*m[0]+s*m[2];
      m[4] = c*m[4]+s*m[6];
      m[8] = c*m[8]+s*m[10];

      m[2] = c*m[2]-s*mv0;
      m[6] = c*m[6]-s*mv4;
      m[10] = c*m[10]-s*mv8;
   }


   /*=================== Drawing =================== */

   const animate = function(time: number) {

      if (!drag) {
         dX *= AMORTIZATION, dY*=AMORTIZATION;
         THETA+=dX, PHI+=dY;
      }

      //set model matrix to I4

      mo_matrix = [
         1, 0, 0, 0,
         0, 1, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1
      ];


      moveXYZ(mo_matrix, x, y, z);
      scaleXYZ(mo_matrix, scaleX, scaleY, scaleZ);
      rotateY(mo_matrix, THETA);
      rotateX(mo_matrix, PHI);

      time_old = time; 
      gl.enable(gl.DEPTH_TEST);

      gl.clearColor(0.5, 0.5, 0.5, 0.9);
      gl.clearDepth(1.0);
      gl.viewport(0.0, 0.0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.uniformMatrix4fv(_Pmatrix, false, proj_matrix);
      gl.uniformMatrix4fv(_Vmatrix, false, view_matrix);
      gl.uniformMatrix4fv(_Mmatrix, false, mo_matrix);

      gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3)

      window.requestAnimationFrame(animate);
   }
   animate(0);
}