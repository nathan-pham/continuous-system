class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(v) {
        this.x += v.x
        this.y += v.y
    }

    sub(v) {
        this.x -= v.x
        this.y -= v.y
    }

    div(n) {
        this.x /= n
        this.y /= n
    }

    mult(n) {
        this.x *= n
        this.y *= n
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalize() {
        let m = this.mag()
        if (m != 0) {
            this.div(m)
        }
    }

    limit(n) {
        if(this.mag() > n) {
            this.reset(n)
        }
    }

    reset(n) {
        this.normalize()
        this.mult(n)
    }

    clone() {
        return new Vector(this.x, this.y)
    }
}

const vec2 = (x=0, y=0) => new Vector(x, y)

export default vec2