import { useLayoutEffect, useRef } from "react";
import "./App.css";
import { renderPuzzleCube } from "./PuzzleCube";

const App = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        if (canvasRef.current !== null) {
            renderPuzzleCube(canvasRef.current);
        }
    }, [canvasRef]);

    return <canvas ref={canvasRef} />;
};

export default App;
