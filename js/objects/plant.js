import vec2 from "../math/vec2.js"

class Plant {
    constructor(pos) {
        this.pos = pos
        this.size = 20

        this.dead = false
        this.dprogress = 0
        this.opacity = 0.35
        this.respawn = true // false

        this.fprogress = this.opacity
    }

    get color() {
        return `rgba(0, 0, 0, ${this.opacity - this.dprogress - this.fprogress})`
    }

    render({ ctx, canvas: { width, height }}) {
        if(this.fprogress <= this.opacity && this.fprogress > 0) {
            this.fprogress -= 0.02
        }

        if(this.dead) {
            this.dprogress += 0.02

            if(this.dprogress > this.opacity && this.respawn) {
                this.dead = false
                this.pos = vec2(Math.random() * width, Math.random() * height)
            }
        } else if (this.dprogress > 0) {
            this.dprogress -= 0.02
        }

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size)
    }
}

const plant = (...props) => new Plant(...props)
export default plant
