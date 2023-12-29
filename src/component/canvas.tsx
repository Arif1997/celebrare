import { ClassAttributes, CanvasHTMLAttributes } from "react"
import { JSX } from "react/jsx-runtime"

const Canvas = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLCanvasElement> & CanvasHTMLAttributes<HTMLCanvasElement>)=> <canvas {...props}/>

export default Canvas