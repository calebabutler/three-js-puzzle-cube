type VoidFunction = () => void;
type GetterFunction = () => number;
type SetterFunction = (x: number) => void;

interface WasmFunctions {
    resetCube: VoidFunction;
    setEdgeId: SetterFunction;
    setEdgeOrientation: SetterFunction;
    setCornerId: SetterFunction;
    setCornerOrientation: SetterFunction;
    solve: VoidFunction;
    resetAlg: VoidFunction;
    pushMove: SetterFunction;
    executeAlg: VoidFunction;
    isSolved: GetterFunction;
    popMove: GetterFunction;
}

export default class CubeSolver {
    private wasm?: WasmFunctions;

    async initialize(): Promise<void> {
        const { instance } = await WebAssembly.instantiateStreaming(
            fetch("./solver.wasm"),
        );
        this.wasm = {
            resetCube: instance.exports.resetCube as VoidFunction,
            setEdgeId: instance.exports.setEdgeId as SetterFunction,
            setEdgeOrientation: instance.exports
                .setEdgeOrientation as SetterFunction,
            setCornerId: instance.exports.setCornerId as SetterFunction,
            setCornerOrientation: instance.exports
                .setCornerOrientation as SetterFunction,
            solve: instance.exports.solve as VoidFunction,
            resetAlg: instance.exports.resetAlg as VoidFunction,
            pushMove: instance.exports.pushMove as SetterFunction,
            executeAlg: instance.exports.executeAlg as VoidFunction,
            isSolved: instance.exports.isSolved as GetterFunction,
            popMove: instance.exports.popMove as GetterFunction,
        };
        this.resetCube();
    }

    isInitialized(): boolean {
        return this.wasm !== undefined;
    }

    private error(): Error {
        return new Error("Please initialize before using CubeSolver.");
    }

    resetCube(): void {
        if (this.wasm === undefined) {
            throw this.error();
        }
        this.wasm.resetCube();
    }

    private executeMove(move: string): void {
        if (this.wasm === undefined) {
            throw this.error();
        }

        this.wasm.resetAlg();
        switch (move) {
            case "U":
                this.wasm.pushMove(0);
                break;
            case "U'":
                this.wasm.pushMove(1);
                break;
            case "U2":
                this.wasm.pushMove(2);
                break;
            case "D":
                this.wasm.pushMove(3);
                break;
            case "D'":
                this.wasm.pushMove(4);
                break;
            case "D2":
                this.wasm.pushMove(5);
                break;
            case "R":
                this.wasm.pushMove(6);
                break;
            case "R'":
                this.wasm.pushMove(7);
                break;
            case "R2":
                this.wasm.pushMove(8);
                break;
            case "L":
                this.wasm.pushMove(9);
                break;
            case "L'":
                this.wasm.pushMove(10);
                break;
            case "L2":
                this.wasm.pushMove(11);
                break;
            case "F":
                this.wasm.pushMove(12);
                break;
            case "F'":
                this.wasm.pushMove(13);
                break;
            case "F2":
                this.wasm.pushMove(14);
                break;
            case "B":
                this.wasm.pushMove(15);
                break;
            case "B'":
                this.wasm.pushMove(16);
                break;
            case "B2":
                this.wasm.pushMove(17);
                break;
        }
        this.wasm.executeAlg();
        this.wasm.resetAlg();
    }

    executeAlgorithm(algorithm: string[]): void {
        for (const move of algorithm) {
            this.executeMove(move);
        }
    }

    private getAlgorithm(): string[] {
        if (this.wasm === undefined) {
            throw this.error();
        }

        const algorithm: string[] = [];
        let move;
        const MOVES = [
            "U",
            "U'",
            "U2",
            "D",
            "D'",
            "D2",
            "R",
            "R'",
            "R2",
            "L",
            "L'",
            "L2",
            "F",
            "F'",
            "F2",
            "B",
            "B'",
            "B2",
        ];
        while ((move = this.wasm.popMove()) !== 18) {
            algorithm.push(MOVES[move]);
        }
        this.wasm.resetAlg();
        return algorithm;
    }

    private static simplifyAlgorithm(algorithm: string[]): void {
        const exchangeTable: { [key: string]: string[] } = {};

        const addThreeMoveCombosStage1 = (
            primary: string,
            secondary: string,
        ): void => {
            exchangeTable[`${primary} ${secondary} ${primary}`] = [
                `${primary}2`,
                `${secondary}`,
            ];
            exchangeTable[`${primary} ${secondary} ${primary}'`] = [
                `${secondary}`,
            ];
            exchangeTable[`${primary} ${secondary} ${primary}2`] = [
                `${primary}'`,
                `${secondary}`,
            ];
            exchangeTable[`${primary}' ${secondary} ${primary}`] = [
                `${secondary}`,
            ];
            exchangeTable[`${primary}' ${secondary} ${primary}'`] = [
                `${primary}2`,
                `${secondary}`,
            ];
            exchangeTable[`${primary}' ${secondary} ${primary}2`] = [
                `${primary}`,
                `${secondary}`,
            ];
            exchangeTable[`${primary}2 ${secondary} ${primary}`] = [
                `${primary}'`,
                `${secondary}`,
            ];
            exchangeTable[`${primary}2 ${secondary} ${primary}'`] = [
                `${primary}`,
                `${secondary}`,
            ];
            exchangeTable[`${primary}2 ${secondary} ${primary}2`] = [
                `${secondary}`,
            ];
        };

        const addThreeMoveCombosStage2 = (
            primary: string,
            secondary: string,
        ): void => {
            addThreeMoveCombosStage1(primary, secondary);
            addThreeMoveCombosStage1(primary, `${secondary}'`);
            addThreeMoveCombosStage1(primary, `${secondary}2`);
            addThreeMoveCombosStage1(secondary, primary);
            addThreeMoveCombosStage1(secondary, `${primary}'`);
            addThreeMoveCombosStage1(secondary, `${primary}2`);
        };

        const addThreeMoveCombos = (): void => {
            addThreeMoveCombosStage2("U", "D");
            addThreeMoveCombosStage2("R", "L");
            addThreeMoveCombosStage2("F", "B");
        };

        const addTwoMoveCombosStage1 = (move: string): void => {
            exchangeTable[`${move} ${move}`] = [`${move}2`];
            exchangeTable[`${move} ${move}'`] = [];
            exchangeTable[`${move} ${move}2`] = [`${move}'`];
            exchangeTable[`${move}' ${move}`] = [];
            exchangeTable[`${move}' ${move}'`] = [`${move}2`];
            exchangeTable[`${move}' ${move}2`] = [`${move}`];
            exchangeTable[`${move}2 ${move}`] = [`${move}'`];
            exchangeTable[`${move}2 ${move}'`] = [`${move}`];
            exchangeTable[`${move}2 ${move}2`] = [];
        };

        const addTwoMoveCombos = (): void => {
            addTwoMoveCombosStage1("U");
            addTwoMoveCombosStage1("D");
            addTwoMoveCombosStage1("R");
            addTwoMoveCombosStage1("L");
            addTwoMoveCombosStage1("F");
            addTwoMoveCombosStage1("B");
        };

        // Add all entries to exchangeTable
        addThreeMoveCombos();
        addTwoMoveCombos();

        // Go through all 3 move combos in algorithm
        for (let i = 0; i < algorithm.length - 2; i++) {
            const key = algorithm.slice(i, i + 3).join(" ");
            if (key in exchangeTable) {
                const replacements = exchangeTable[key];
                algorithm.splice(i, 3, ...replacements);
            }
        }

        // Go through all 2 move combos in algorithm
        for (let i = 0; i < algorithm.length - 1; i++) {
            const key = algorithm.slice(i, i + 2).join(" ");
            if (key in exchangeTable) {
                const replacements = exchangeTable[key];
                algorithm.splice(i, 2, ...replacements);
            }
        }
    }

    solve(): string[] {
        if (this.wasm === undefined) {
            throw this.error();
        }

        this.wasm.solve();

        const algorithm = this.getAlgorithm();
        CubeSolver.simplifyAlgorithm(algorithm);
        return algorithm;
    }

    isSolved(): boolean {
        if (this.wasm === undefined) {
            throw this.error();
        }
        if (this.wasm.isSolved() === 1) {
            return true;
        }
        return false;
    }
}
