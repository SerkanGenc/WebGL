let canvas = document.querySelector("#playground") ;

/** @type {WebGLRenderingContext} */
let gl = canvas.getContext("webgl2") ;
console.log(gl);
gl.clearColor(0.9, 0.4, 0.4, 1.0) ;
gl.clear(gl.COLOR_BUFFER_BIT) ;