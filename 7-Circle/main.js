// In vertex shader, point size must be set.
import {vertexShader, fragmentShader} from "./shader.js"
import { Util} from "./util.js"

let canvas = document.querySelector("#playground") ;
 
const gl = Util.getContext(canvas) ;

// Geometry of the primitive we can draw 
const coords = [] ;

// prepare circle
for ( let i=0 ; i<100; i++) {
   let angle = (2 * Math.PI / 100) * i ;
   let x = Math.cos(angle) * 0.5;
   let y = Math.sin(angle) * 0.5;
   coords.push(x,y) ;
}

// Step 1: Write Shaders (GLSL program)

// Step 2: Create Program from shaders
const program = Util.getProgram(gl, vertexShader, fragmentShader) ;

// Step 3: Create Buffers
const buffer = Util.createBuffer(gl, coords) ;
// Step 4: Link GPU variable to CPU and sending Data
gl.useProgram(program)
const position = Util.linkGPUAndCPU(gl, {
    program, 
    gpuVariable : "position",
    buffer,
    dims: 2
})
// Step 5: Render Points
gl.drawArrays(gl.LINE_LOOP, 0, 100) ;

