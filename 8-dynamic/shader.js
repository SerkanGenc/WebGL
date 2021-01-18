 const vertexShader = `#version 300 es
  precision mediump float ;
  in vec2 position ;
  out vec4 outColor ;
  void main() {
      gl_Position = vec4(position, 0.0, 1.0) ;
      outColor = vec4(0.5*(position + vec2(1,1)),0,1) ;
  }
` ;

 const fragmentShader = `#version 300 es
  precision mediump float ;
  in vec4 outColor ;
  out vec4 color ;
  void main() {
      color = outColor ;
  }
` ;

export {vertexShader, fragmentShader} ;

