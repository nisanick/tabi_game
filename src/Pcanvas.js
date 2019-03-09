import * as PIXI from "pixi.js";
import React, { Component } from 'react';
import Dominik from "./Dominik/Dominik";
import Robo from "./Robo/Robo";

export default class Pcanvas extends Component {
    constructor(props) {
        super(props);
        this.pixi_cnt = null;
        this.app = new PIXI.Application({width: 900, height: 900, transparent: false, antialias: true, resolution: 1});
        this.model = {};
        if(props.module === "Dominik"){
            this.model = new Dominik(this.app);
        } else {
            this.model = new Robo(this.app);
        }

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
        }
    };

    render() {
        return <span className="gameWindow" ref={this.updatePixiCnt}/>;
    }
}