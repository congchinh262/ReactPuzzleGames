import React from 'react';
import Square from './Square';
import './Puzzle-15.css';
import { isPropertySignature } from 'typescript';

interface IContainerProps {

}

interface IContainerStates {
    row: number;
    col: number;
    moveCount: number
}

function shuffledArray(array: unknown[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default class Container extends React.Component<IContainerProps, IContainerStates>{
    xBlankIndex: number;
    yBlankIndex: number;
    isPosittionCorrectArray: any[];
    shuffledArray: any[];

    constructor(props: IContainerProps) {
        super(props);
        this.state = {
            row: 4,
            col: 4,
            moveCount: 0
        }
        this.xBlankIndex = this.state.row;
        this.yBlankIndex = this.state.col;
        this.isPosittionCorrectArray = [];
        this.shuffledArray = [];
        for (let i = 1; i < this.state.col * this.state.row; i++) {
            this.shuffledArray.push(i);
        }
        shuffledArray(this.shuffledArray);
        this.shuffledArray.forEach((item: number, index: number) => {
            if (item === index + 1) {
                this.isPosittionCorrectArray.push(true);
            } else {
                this.isPosittionCorrectArray.push(false);
            }
        });
    }
    switchBlankIndex = (xIndex: number, yIndex: number) => {
        this.xBlankIndex = xIndex;
        this.yBlankIndex = yIndex;
        this.setState({
            moveCount:this.state.moveCount+1
        })
    }
    getState = () => {
        return {
            xBlankIndex: this.xBlankIndex,
            yBlankIndex: this.yBlankIndex,
            row: this.state.row,
            col: this.state.col,
        }
    }

    setPosittionArray = (index: number, isCorrect: boolean) => {
        console.log("isCorrect: " + isCorrect);
        this.isPosittionCorrectArray[index] = isCorrect;
        if (this.checkEndGame()) {
            console.log("Check end game is running")
            setTimeout(function (this: any) {
                alert("Winner Winner Chicken Dinner!!! \n Your move: " + this.state.moveCount);
            }, 200);
        }
    }
    checkEndGame = (): boolean => {
        for (let i = 0; i < this.isPosittionCorrectArray.length; i++) {
            if (!this.isPosittionCorrectArray[i]) {
                return false;
            }
        }
        return true;
    }

    setSquareList = () => {
        let squareArray: any[] = [];
        let count: number = 0;
        for (let i = 0; i < this.state.row; i++) {
            for (let j = 0; j < this.state.col; j++) {
                if (count < (this.state.col * this.state.row) - 1) {
                    squareArray.push(
                        <Square key={count} xIndex={i + 1} yIndex={j + 1}
                            value={this.shuffledArray[count]} onClick={this.switchBlankIndex}
                            getState={this.getState} setCorrectPossion={this.isPosittionCorrectArray}
                            setPosittionArray={this.setPosittionArray}
                        ></Square>
                    )
                    count++;
                }
            }
        }
        return squareArray;
    }
    render() {
        const containerStyle = {
            gridTemplateColumns: "repeat(" + this.state.col + ", 100px)",
            gridTemplateRows: "repeat(" + this.state.row + ", 100px)",
        };
        return (
            <div>
                <p>Moves:{this.state.moveCount}</p>
                <div style={containerStyle} className="containerG15P">
                    {this.setSquareList()}
                </div>
            </div>

        )
    }
}
