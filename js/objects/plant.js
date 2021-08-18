import vec2 from "../math/vec2.js"

class Plant {
    constructor(pos) {
        this.pos = pos
        this.size = 20

        this.dead = false
        this.dprogress = 0
        this.opacity = 0.35
    }

    get color() {
        return `rgba(0, 0, 0, ${this.opacity - this.dprogress})`
    }

    render({ ctx, canvas: { width, height }}) {
        if(this.dead) {
            this.dprogress += 0.02

            if(this.dprogress > this.opacity) {
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
