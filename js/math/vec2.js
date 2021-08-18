const vec2 = (x=0, y=0) => {
    const add = (vec) => {
        x += vec.x
        y += vec.y
    }

    const sub = (vec) => {
        x -= vec.x
        y -= vec.y
    }
    
    const div = (n) => {
        x /= n
        y /= n
    }

    const mult = (n) => {
        x *= n
        y *= n
    }

    const mag = () => {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    }

    const normalize = () => {
        const m = mag()
        if(m !== 0) {
            div(m)
        }
    }

    const reset = (n) => {
        normalize()
        mult(n)
    }

    const clone = () => ({...vec2(x, y)})

    return { x, y, add, sub, div, mult, mag, reset, clone, normalize }
}

export default vec2