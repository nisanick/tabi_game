import * as PIXI from "pixi.js";
import React, { Component } from 'react';

export default class Pcanvas extends Component {
    constructor(props) {
        super(props);
        this.pixi_cnt = null;
        this.loader = new PIXI.Loader();
        this.resources = this.loader.resources;
        this.app = new PIXI.Application({width: 600, height: 600, transparent: false, antialias: true, resolution: 1});
        this.imgPath = "public/assets/characters/boar.png";

        this.updatePixiCnt = this.updatePixiCnt.bind(this);
    }

    updatePixiCnt = (element) => {
        // the element is the DOM object that we will use as container to add pixi stage(canvas)
        this.pixi_cnt = element;
        //now we are adding the application to the DOM element which we got from the Ref.
        if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
            this.pixi_cnt.appendChild(this.app.view);
            //The setup function is a custom function that we created to add the sprites. We will this below
            //this.setup();

            this.app.renderer.view.style.position = "absolute";
            this.app.renderer.view.style.display = "block";
            this.app.renderer.resize(window.innerWidth, window.innerHeight);

            this.initImage();
        }
    };

    initImage(){
        this.loader.add(this.imgPath)
            .load(()=>{
                let boar = new PIXI.Sprite(this.resources[this.imgPath].texture);
                console.log(boar);
                //Add the cat to the stage
                boar.visible = true;
                boar.x = 10;
                boar.y = 10;
                this.app.stage.addChild(boar);
            });
    }

    setup(){

    }

    render() {
        return <div ref={this.updatePixiCnt}/>;
    }
}