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

const createCanvas = ({ width=2048, height=2048 }={ }) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    const aspect = width / height

    canvas.id = "sketch"
    Object.assign(canvas, { width, height })
    Object.assign(canvas.style, {  
        height: "80vmin",
        width: `calc(${aspect} * 80vmin)`,
        borderRadius: "0.5rem",
        boxShadow: "0 0.5rem 2rem rgba(0, 0, 0, 0.2)"
    })

    return { canvas, ctx }
}

export const create = (render) => {
    const container = createContainer()
    const { canvas, ctx } = createCanvas()
 
    document.body.appendChild(container)
    container.appendChild(canvas)

    const props = { canvas, ctx }
    const renderer = render(props)

    const frame = () => {
        renderer(props)
        window.requestAnimationFrame(frame)
    }

    frame()
}