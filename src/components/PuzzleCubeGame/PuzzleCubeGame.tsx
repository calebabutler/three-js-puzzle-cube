import { useLayoutEffect, useRef } from "react";
import styles from "./PuzzleCubeGame.module.css";
import PuzzleCube from "./PuzzleCube";

const PuzzleCubeGame = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const makeCanvasWindowSize = () => {
        if (canvasRef.current !== null) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    };

    useLayoutEffect(() => {
        window.addEventListener("resize", makeCanvasWindowSize);
    }, []);

    useLayoutEffect(() => {
        if (canvasRef.current !== null) {
            makeCanvasWindowSize();
            const puzzleCube = new PuzzleCube(canvasRef.current);
            puzzleCube.render();
        }
    }, [canvasRef]);

    return (
        <canvas
            className={styles.puzzleCubeCanvas}
            tabIndex={0}
            ref={canvasRef}
        />
    );
};

export default PuzzleCubeGame;
