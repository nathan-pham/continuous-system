import vec2 from "../math/vec2.js"

const range = (min, max) => (
    (Math.random() * (max - min)) + min
)

const randomizeDNA = () => {
    const size =  range(20, 200)
    
    return {
        size,
        rate: Math.pow(size, 0.01),
        speed: (1 / size) * range(200, 500),
        energy: size + range(100, 1000),
    }
}

const ant = (pos, DNA) => {
    const vel = vec2()
    const acc = vec2()

    const { size, speed, rate, energy } = DNA || randomizeDNA()

    let progress = 0

    const color = () => `rgba(0, 0, 0, ${1 - (progress / energy)})`

    return ({ ctx, canvas: { width, height }, objects: { plants } }) => {
        acc.add(vec2(Math.random() * 2 - 1, Math.random() * 2 - 1))
        
        progress += rate

        if (progress <= energy) {
            vel.add(acc)
            pos.add(vel)
            acc.mult(0)
    
            vel.limit(speed)
            
            if(pos.x < -size) { pos.x = width + size }
            if(pos.x > width + size) { pos.x = -size }
            if(pos.y < -size) { pos.y = height + size }
            if(pos.y > height + size) { pos.y = -size }
        }

        ctx.fillStyle = color()
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2)
        ctx.fill()
    }
}

export default ant