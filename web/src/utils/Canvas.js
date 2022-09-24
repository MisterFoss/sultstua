import { useRef, useEffect } from "react"


export default function Canvas({draw}) {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        draw(canvas)
      }, [draw])

    return <canvas ref={canvasRef} style={{background:"blue"}}></canvas>
} 