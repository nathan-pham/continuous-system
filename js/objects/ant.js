import SimplexNoise from "https://esm.sh/simplex-noise"
import vec2 from "../math/vec2.js"

const map = (n, start1, stop1, start2, stop2) => (
    ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
)

const range = (min, max) => (
    (Math.random() * (max - min)) + min
)

const dist = (v1, v2) => {
    const dx = v1.x - v2.x
    const dy = v1.y - v2.y
    return Math.sqrt(dx * dx + dy * dy)
}

const simplex = new SimplexNoise(Math.random())

const randomizeDNA = () => {
    const size = Math.random()
    
    return {
        size: size * 50 + 5,
        color: Math.random() + 0.1,
        rate: size,
        speed: map(size, 0, 1, 10, 0),
        energy: size + range(100, 500),
    }
}

class Ant {
    constructor(pos, DNA) {
        this.off = vec2(range(0, 1000), range(0, 1000))
        this.DNA = DNA || randomizeDNA()

        this.pos = pos
        this.progress = 0

        this.dprogress = 0
    }

    get color() {
        return `rgba(0, 0, 0, ${this.DNA.color - this.dprogress})`
    }

    render({ ctx, canvas: { width, height }, objects: { plants } }) {
        const { size, speed, rate, color, energy } = this.DNA

        this.progress += rate

        if(this.progress <= energy) {
            const vel = vec2(
                map(simplex.noise2D(this.off.x, 0), -1, 1, -speed, speed),
                map(simplex.noise2D(0, this.off.y), -1, 1, -speed, speed)
            )

            this.pos.add(vel)
            this.off.add(vec2(0.01, 0.01))

            if(this.pos.x < -size) { this.pos.x = width + size }
            if(this.pos.y < -size) { this.pos.y = height + size }
            if(this.pos.x > width + size) { this.pos.x = -size }
            if(this.pos.y > height + size) { this.pos.y = -size }

            for(const plant of plants) {
                if(dist(this.pos, plant.pos) < size + plant.size && !plant.dead) {
                    this.progress -= 20
                    plant.dead = true
                }
            }

        } else {
            this.dprogress += 0.01
        }
        
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, size, 0, Math.PI * 2)
        ctx.fill()
    }
}

const ant = (...props) => new Ant(...props)
export default ant