import React, { useState, useEffect, createContext } from 'react';

class PowerUps {
    turn: number;
    hit: number;
    
    width: number;
    height: number;

    positionX: number;
    positionY: number;

    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    color: string[];

    constructor(context: CanvasRenderingContext2D, c: HTMLCanvasElement) {
        this.turn = 0;
        this.hit = 0;
       
        this.context = context;
        this.canvas = c;

        this.positionX = this.getPositionX(3);
        this.positionY = this.getPositionY(2);
        
        this.width = this.canvas.width/20;
        this.height = this.canvas.width/20;

        this.color = ['Yellow', 'Green', 'Red'];
    }

    draw() {
        if (this.hit == 0) {
            this.context.beginPath();
            this.context.fillStyle = this.color[0];
            this.context.fillRect(
                this.positionX,
                this.positionY,
                this.width,
                this.height,
                this.color
            );
        }
        this.context.closePath();
    }

    getPositionX(max: number) {
        const i = Math.floor(Math.random() * max);
        const positionx = [this.canvas.width * 0.3, this.canvas.width * 0.4, this.canvas.width * 0.7];
        return (positionx[i]);
    }

    getPositionY(max: number) {
        const i = Math.floor(Math.random() * max);
        const positiony = [this.canvas.height * 0.2, this.canvas.height * 0.7];
        return (positiony[i]);
    }
}
export default PowerUps;
