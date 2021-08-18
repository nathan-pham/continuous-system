import * as sketch from "./sketch.js"

sketch.create(() => {
    const objects = []

    return (props) => {
        for(const renderer of objects) {
            renderer(props)
        }
    }
})