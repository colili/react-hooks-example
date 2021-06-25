import React, {useEffect} from "react"

export default function Home() {
    useEffect(() => {
        console.log("useEffect => Home")
        return () => {
            console.log("useEffect => Home done")
        }
    }, []) // 只有当Home页面销毁的时候才执行。类似生命周期的willUnmount
    return (
        <div>
            <h1>This is my Home page</h1>
        </div>
    )
}