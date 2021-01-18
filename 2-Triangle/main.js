let canvas = document.querySelector("#playground") ;

/** @type {WebGLRenderingContext} */
let gl = canvas.getContext("webgl2") ;
console.log(gl);
gl.clearColor(0.9, 0.4, 0.4, 1.0) ;
gl.clear(gl.COLOR_BUFFER_BIT) ;

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

const vs = gl.createShader(gl.VERTEX_SHADER) ;
const fs = gl.createShader(gl.FRAGMENT_SHADER) ;
gl.shaderSource(vs, vertexShader) ;
gl.shaderSource(fs, fragmentShader) ;
gl.compileShader(vs) ;
gl.compileShader(fs) ;
if ( !gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vs)) ;
}
if ( !gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(fs)) ;
}
const program = gl.createProgram() ;
gl.attachShader(program, vs) ;
gl.attachShader(program, fs) ;
gl.linkProgram(program) ;

if ( !gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(program)) ;
}

// Step 3: Create Buffers
const buffer = gl.createBuffer() ;
gl.bindBuffer(gl.ARRAY_BUFFER, buffer) ;
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW) ;
gl.bindBuffer(gl.ARRAY_BUFFER, null) ;
// Step 4: Link GPU variable to CPU and sending Data
gl.useProgram(program)
const position = gl.getAttribLocation(program, "position")
// const inColor = gl.getUniformLocation(program, "inColor") ;

gl.enableVertexAttribArray(position) ;
gl.bindBuffer(gl.ARRAY_BUFFER, buffer) ;
gl.vertexAttribPointer(position, 2, gl.FLOAT, gl.FALSE, 0, 0) ;
// Step 5: Render Triangle
//gl.uniform4fv(inColor, new Float32Array([1,1,0,1])) ;
gl.drawArrays(gl.TRIANGLES,0, 3) ;

//gl.uniform4fv(inColor, new Float32Array([0,0,0,1])) ;
gl.drawArrays(gl.LINE_LOOP,0, 3) ;
