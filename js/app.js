import * as sketch from "./sketch.js"

import background from "./objects/background.js"
import plant from "./objects/plant.js"


sketch.create(({ canvas: { width, height } }) => {
    const plants = []
    for(let i = 0; i < 100; i++) {
        plants.push(plant({ position: { x: Math.random() * width, y: Math.random() * height } }))
    }

    return sketch.renderer([
        background({ color: "#000" }),
        ...plants
    ])
})