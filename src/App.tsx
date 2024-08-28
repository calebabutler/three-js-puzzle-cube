import { useLayoutEffect, useRef } from "react";
import "./App.css";
import PuzzleCube from "./PuzzleCube";

const App = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        if (canvasRef.current !== null) {
            const puzzleCube = new PuzzleCube(canvasRef.current);
            puzzleCube.render();
        }
    }, [canvasRef]);

    return <canvas tabIndex={0} ref={canvasRef} />;
};

export default App;
