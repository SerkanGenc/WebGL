 const vertexShader = `#version 300 es
  precision mediump float ;
  in vec2 position ;
  void main() {
      gl_Position = vec4(position, 0.0, 1.0) ;
      gl_PointSize = 2.0 ;
  }
` ;

 const fragmentShader = `#version 300 es
  precision mediump float ;
  out vec4 color ;
  void main() {
      color = vec4(1.0, 1.0, 0.0, 1.0) ;
  }
` ;

export {vertexShader, fragmentShader} ;

