// In vertex shader, point size must be set.
import {vertexShader, fragmentShader} from "./shader.js"
import { Util} from "./util.js"

let canvas = document.querySelector("#playground") ;
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;

const gl = Util.getContext(canvas) ;
initCanvas() ;

const program = Util.getProgram(gl, vertexShader, fragmentShader) ;

// Step 4: Link GPU variable to CPU and sending Data
gl.useProgram(program)


const toGLCoord = (x,y) => {
    return {
            x: 2 * x / canvas.width - 1, 
            y: -2 * y / canvas.height + 1
        }
}

function initCanvas() {
    const canvas = gl.canvas ;
    canvas.addEventListener("click", function(e) {
      console.log(e.pageX + " " + e.pageY)   
      Util.drawRectangle(gl, program,toGLCoord(e.pageX-155, e.pageY-155), toGLCoord(e.pageX+155, e.pageY+155))
 
 
    })
 }
