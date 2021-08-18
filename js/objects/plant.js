const plant = ({ x=0, y=0 }={ }) => {
    return ({ ctx }) => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 10

        ctx.beginPath()
        ctx.rect(x, y, 50, 50)
        ctx.stroke()
        ctx.fill()
    }
}

export default plant