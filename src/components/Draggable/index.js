import React, {useCallback, useEffect, useRef, useState} from 'react'

const Draggable = ({children}) => {
    const draggable = useRef(null)
    const [mouseCoord, setMouseCoord] = useState(null)
    const [deltaCoord, setDeltaCoord] = useState(null)

    const handleDown = (e) => {
        const {clientX, clientY} = e
        setMouseCoord({x: clientX, y: clientY})
        e.preventDefault()
    }

    const handleMove = useCallback(({clientX, clientY}) => {

        if (mouseCoord) {
            const {x, y} = mouseCoord
            setDeltaCoord({x: clientX - x, y: clientY - y})
        }
    }, [mouseCoord])

    const handleUp = useCallback(() => {
        if (deltaCoord) {
            setMouseCoord(null)
        }
    }, [deltaCoord])

    useEffect(() => {
        draggable.current.addEventListener('mousedown', handleDown)
        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', handleUp)

        return () => {
            draggable.current.removeEventListener('mousedown', handleDown)
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseup', handleUp)
        }
    }, [draggable.current, mouseCoord, deltaCoord])


    return <div ref={draggable}
                style={deltaCoord ? {transform: `translate(${deltaCoord.x}px, ${deltaCoord.y}px)`} : null}>
        {children}
    </div>
}

export default Draggable
