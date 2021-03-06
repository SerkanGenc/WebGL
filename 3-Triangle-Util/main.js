let canvas = document.querySelector("#playground") ;
 
const gl = Util.getContext(canvas) ;

// Geometry of the primitive we can draw (Triangle)
const coords = [ -0.8, 0, 0.8,0, 0, 0.8] ;

// Step 1: Write Shaders (GLSL program)
const vertexShader = `#version 300 es
  precision mediump float ;
  in vec2 position ;
  void main() {
      gl_Position = vec4(position, 0.0, 1.0) ;
  }
` ;

const fragmentShader = `#version 300 es
  precision mediump float ;
  out vec4 color ;
  // uniform vec4 inColor ;
  void main() {
      color = vec4(1.0, 1.0, 0.0, 1.0) ;
  }
` ;
// Step 2: Create Program from shaders
const program = Util.getProgram(vertexShader, fragmentShader) ;

// Step 3: Create Buffers
const buffer = Util.createBuffer(coords) ;
// Step 4: Link GPU variable to CPU and sending Data
gl.useProgram(program)
const position = Util.linkGPUAndCPU({
    program, 
    gpuVariable : "position",
    buffer,
    dims: 2
})
// Step 5: Render Triangle
gl.drawArrays(gl.TRIANGLES,0, 3) ;

