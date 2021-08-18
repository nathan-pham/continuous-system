const createContainer = () => {
    const container = document.createElement("div")
    container.id = "sketch__container"
    Object.assign(container.style, { 
        width: "100vw", 
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center" 
    })

    return container
}

const createCanvas = ({ width=500, height=500 }) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    canvas.id = "sketch"
    Object.assign(canvas, { width, height })
    Object.assign(canvas.style, {  
        width: width + "px",
        height: height + "px",
        borderRadius: "0.5rem",
        boxShadow: "0 0.5rem 1rem gray"
    })

    return { canvas, ctx }
}

const sketch = (render) => {
    const container = createContainer()
    const { canvas, ctx } = createCanvas()
 
    container.appendChild(canvas)

    const frame = () => {
        render({ canvas, ctx })
        window.requestAnimationFrame(frame)
    }

    frame()
}

export default sketch