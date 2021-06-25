import React, {useEffect} from "react"

export default function About() {
    useEffect(() => {
        console.log("useEffect => About")
        return () => {
            console.log("useEffect => About done")
        }
    }, [])
    return <h1>This is the About page</h1>
}