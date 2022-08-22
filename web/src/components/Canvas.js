import { useRef } from "react"
import { useEffect } from "react"
import "./Canvas.css"


export default function Canvas({draw}) {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        draw(canvas)
      }, [draw])

    return <canvas ref={canvasRef}></canvas>
} 
