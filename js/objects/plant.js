const plant = ({ position: { x=0, y=0 } }={ }) => {
    
    return ({ ctx }) => {
        ctx.fillStyle = "green"
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()
    }
}

export default plant