import { Console } from 'console';
import React from 'react';
import './Puzzle-15.css';

interface ISquareProps {
    xIndex: number;
    yIndex: number;
    getState: Function;
    value: number;
    onClick: any;
    setCorrectPossion: any;
    setPosittionArray:unknown;
}

interface ISquareStates {
    xIndex: number;
    yIndex: number;
    isIndexCorrected: boolean;
    class: string;
}

export default class Square extends React.Component<ISquareProps, ISquareStates>{
    constructor(props: ISquareProps) {
        super(props);
        this.state = {
            xIndex: this.props.xIndex,
            yIndex: this.props.yIndex,
            isIndexCorrected: false,
            class: "squareG15P",
        }
        this.setState({
            isIndexCorrected:this.checkIsIndexCorrected()
        });
        //wasted time here:4 days 11 hours
        //some one finish this game for me :( im crying a lot...
        //this.state.isIndexCorrected=this.checkIsIndexCorrected();
        if (this.state.isIndexCorrected) {
            this.setState({
                isIndexCorrected:true,
                class: "squareG15P isCorrectG15P"
            })
        }
    }
    componentDidUpdate(prevProps: ISquareProps, prevStates: ISquareStates) {
        if (this.state.isIndexCorrected !== this.checkIsIndexCorrected()) {
            if (this.checkIsIndexCorrected()) {   
                this.setState({
                    class: "squareG15P isCorrectG15P"
                })
            } else {
                this.setState({
                    class: "squareG15P"
                })
            }
            this.setState({
                isIndexCorrected: this.checkIsIndexCorrected()
            });
        }
        console.log(this.state.isIndexCorrected);
    }

    checkIsIndexCorrected() {
        if (this.props.value === ((this.state.xIndex - 1) * this.props.getState().col + this.state.yIndex )) {
            // this.setState({
            //     isIndexCorrected: true,
            //     class: "squareG15P isCorrectG15P"
            // });
            return true;
        }
        return false;
    }
    handleClick = () => {
        const xBlankIndex: number = this.props.getState().xBlankIndex;
        const yBlankIndex: number = this.props.getState().yBlankIndex;
        if (this.state.xIndex === xBlankIndex || this.state.yIndex === yBlankIndex) {
            if (Math.abs(this.state.xIndex - xBlankIndex) === 1 || Math.abs(this.state.yIndex - yBlankIndex) === 1) {
                this.props.onClick(this.state.xIndex, this.state.yIndex);
                this.setState({
                    xIndex: xBlankIndex,
                    yIndex: yBlankIndex,
                });
            }
        }
       
    }
    render() {
        let squareStyle = {
            gridColumn: this.state.yIndex,
            gridRow: this.state.xIndex,
        }
        return (
            <button className={this.state.class}
                style={squareStyle}
                onClick={this.handleClick}>{this.props.value}
            </button>
        )
    }
}