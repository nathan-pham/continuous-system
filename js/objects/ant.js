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
    const rsize = Math.random()
    const speed = map(rsize, 0, 1, 15, 0)

    const size = rsize * 50 + 5 

    return {
        speed, 
        size,
        color: Math.random() + 0.1,
        rate: ((speed / 7) + rsize) / 1.5,
        energy: size + range(150, 400)
    }
}

const avg = (...args) => args.reduce((a, b) => a + b, 0) / args.length

const combineDNA  = (DNA1, DNA2) => (
    Object.keys(DNA1).reduce((acc, key) => ({
        ...acc,
        [key]: (Math.random() > 0.5 ? DNA2[key] : DNA1[key]) + (randomizeDNA()[key] / 10)
    }), {})
)

// ({
//     speed: avg(DNA1.speed, DNA2.speed, DNA3.speed),
//     size: avg(DNA1.size, DNA2.size, DNA3.size),
//     color: avg(DNA1.color, DNA2.color, DNA3.color),
//     rate: avg(DNA1.rate, DNA2.rate, DNA3.rate),
//     energy: avg(DNA1.energy, DNA2.energy, DNA3.energy)
// })

class Ant {
    constructor(pos, DNA) {
        this.off = vec2(range(0, 1000), range(0, 1000))
        this.DNA = DNA || randomizeDNA()

        this.pos = pos
        this.progress = 0

        this.fprogress = this.DNA.color
        this.dprogress = 0
    }

    get color() {
        return `rgba(0, 0, 0, ${this.DNA.color - this.dprogress - this.fprogress})`
    }

    render({ ctx, canvas: { width, height }, objects: { plants } }) {
        const { size, speed, rate, energy } = this.DNA

        this.progress += rate

        if(this.fprogress <= this.DNA.color && this.fprogress > 0) {
            this.fprogress -= 0.01
        }

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
                    this.progress -= 75
                    plant.dead = true
                }
            }

            const rpos = () => vec2(Math.random() * width, Math.random() * height)

            for(const object of (this.ants || [])) {
                if(
                    object !== this && 
                    Math.random() < 0.002 && 
                    dist(this.pos, object.pos) < (size + object.DNA.size) && 
                    this.progress < 100 && 
                    object.progress < 100
                ) {
                    console.log("reproduce")

                    object.progress += 100
                    this.progress += 100

                    this.ants.push(ant(
                        vec2((this.pos.x + object.pos.x) / 2, (this.pos.y + object.pos.y) / 2), 
                        combineDNA(this.DNA, object.DNA)
                    ))
                }
            }
        } else {
            this.dprogress += 0.01

            if(!this.dead) {
                console.log("dead")
            }
            this.dead = true
        }
        
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, size, 0, Math.PI * 2)
        ctx.fill()
    }
}

const ant = (...props) => new Ant(...props)
export default ant