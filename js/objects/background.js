const background = ({ color }) => {
    return ({ ctx, canvas: { width, height } }) => {
        if(color) {
            ctx.fillStyle = color
            ctx.fillRect(0, 0, width, height)
        } else {
            ctx.clearRect(0, 0, width, height)
        }
    }
}

export default background