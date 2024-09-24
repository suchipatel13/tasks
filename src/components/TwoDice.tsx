import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    // Initial values for the dice must be different
    const [leftDie, setLeftDie] = useState<number>(d6());
    const [rightDie, setRightDie] = useState<number>(d6());

    // Ensure initial values are different
    useEffect(() => {
        while (leftDie === rightDie) {
            setRightDie(d6());
        }
    }, [leftDie, rightDie]);

    const rollLeft = () => {
        const newLeftDie = d6();
        setLeftDie(newLeftDie);
        // Update right die only if they are now equal
        if (newLeftDie === rightDie) {
            setRightDie(d6());
        }
    };

    const rollRight = () => {
        const newRightDie = d6();
        setRightDie(newRightDie);
        // Update left die only if they are now equal
        if (newRightDie === leftDie) {
            setLeftDie(d6());
        }
    };

    const getGameStatus = () => {
        if (leftDie === rightDie) {
            if (leftDie === 1) {
                return "You Lose! Snake Eyes!";
            }
            return "You Win!";
        }
        return null;
    };

    const gameStatus = getGameStatus();

    return (
        <div>
            <span data-testid="left-die">{leftDie}</span>
            <span data-testid="right-die">{rightDie}</span>
            <div>
                <Button onClick={rollLeft}>Roll Left</Button>
                <Button onClick={rollRight}>Roll Right</Button>
            </div>
            {gameStatus && <div>{gameStatus}</div>}
        </div>
    );
}
