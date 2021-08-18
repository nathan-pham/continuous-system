import vec2 from "../math/vec2.js"

const ant = () => {
    const pos = vec2()
    const vel = vec2()
    const acc = vec2()

    let size = 50,
        speed = 100
        energy = 200,
        consumption = 0,
        color = `rgba(0, 0, 0, 0.5)`

        // props: size, speed, energy, color

    return ({ ctx }) => {
        vel.add(acc)
        pos.add(vel)
        acc.mult(0)

        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2)
        ctx.fill()
    }
}

export default ant