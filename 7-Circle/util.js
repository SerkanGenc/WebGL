class Util {
    static getContext(canvas) {
        let gl = canvas.getContext("webgl2") ;
        console.log(gl);
        gl.clearColor(0.9, 0.4, 0.4, 1.0) ;
        gl.clear(gl.COLOR_BUFFER_BIT) ;
        return gl ;
    }

    static getShader(gl, shaderSource, shaderType) {
        const shader = gl.createShader(shaderType) ;
        gl.shaderSource(shader, shaderSource) ;
        gl.compileShader(shader) ;
        if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader)) ;
        }
        return shader ;
    }

    static getProgram(gl, vsSource, fsSource) {
        const vs = this.getShader(gl,vsSource, gl.VERTEX_SHADER) ;
        const fs = this.getShader(gl,fsSource, gl.FRAGMENT_SHADER) ;
        const program = gl.createProgram() ;
        gl.attachShader(program, vs) ;
        gl.attachShader(program, fs) ;
        gl.linkProgram(program) ; 
        if ( !gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log(gl.getProgramInfoLog(program)) ;
        }
        return program;
    }

    static createBuffer(gl,  coords, type = gl.ARRAY_BUFFER) {
        const buffer = gl.createBuffer() ;
        gl.bindBuffer(type, buffer) ;
        gl.bufferData(type, new Float32Array(coords), gl.STATIC_DRAW) ;
        gl.bindBuffer(type, null) ;
        return buffer ;
    }

    static linkGPUAndCPU(gl, obj) {
        const position = gl.getAttribLocation(obj.program, obj.gpuVariable)
        gl.enableVertexAttribArray(position) ;
        gl.bindBuffer(obj.channel || gl.ARRAY_BUFFER, obj.buffer) ;
        gl.vertexAttribPointer(position, obj.dims, obj.dataType || gl.FLOAT, obj.normalize || false, obj.stride || 0, obj.offset || 0) ;
    }
} ;

export { Util } ;