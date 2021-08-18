import * as sketch from "./sketch.js"

import background from "./objects/background.js"
import plant from "./objects/plant.js"

import vec2 from "./math/vec2.js"

sketch.create(({ canvas: { width, height } }) => {
    const plants = []
    for(let i = 0; i < 100; i++) {
        plants.push(plant(vec2(Math.random() * width, Math.random() * height)))
    }

    return sketch.renderer([
        background({ color: "#fff" }),
        ...plants
    ])
})