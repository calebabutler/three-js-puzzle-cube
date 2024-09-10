import { useLayoutEffect, useRef } from "react";
import styles from "./PuzzleCubeGame.module.css";
import PuzzleCube from "./PuzzleCube";

const PuzzleCubeGame = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        if (canvasRef.current !== null) {
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
