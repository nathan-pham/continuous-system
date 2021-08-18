import * as sketch from "./sketch.js"
import background from "./objects/background.js"

sketch.create(() => {
    const objects = []

    objects.push(background({ color: "#000" }))

    return sketch.renderer(objects)
})