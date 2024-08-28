import { useLayoutEffect, useRef } from "react";
import "./App.css";
import { renderPuzzleCube } from "./PuzzleCube";

const App = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        if (canvasRef.current !== null) {
            renderPuzzleCube(canvasRef.current);
        }
    }, [canvasRef]);

    return <canvas tabIndex={0} ref={canvasRef} />;
};

export default App;
