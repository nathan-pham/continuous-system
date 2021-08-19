import * as sketch from "./sketch.js"

import background from "./objects/background.js"
import plant from "./objects/plant.js"
import ant from "./objects/ant.js"

import vec2 from "./math/vec2.js"

sketch.create(({ canvas: { width, height } }) => {
    const rpos = () => vec2(Math.random() * width, Math.random() * height)

    const plants = []
    for(let i = 0; i < 30; i++) {
        plants.push(plant(rpos()))
    }

    const ants = []
    for(let i = 0; i < 10; i++) {
        ants.push(ant(rpos()))
    }

    for(const object of ants) {
        object.ants = ants
    }

    return sketch.renderer({
        background: background({ color: "#fff" }),
        plants,
        ants
    })
})