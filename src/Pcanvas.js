import * as PIXI from "pixi.js";
import React, { Component } from 'react';

export default class Pcanvas extends Component {
    constructor(props) {
        super(props);
        this.pixi_cnt = null;
        this.state = {
            app : new PIXI.Application({width: 600, height: 600, transparent: false})
        };
        this.updatePixiCnt = this.updatePixiCnt.bind(this);
    }

    updatePixiCnt = (element) => {
        // the element is the DOM object that we will use as container to add pixi stage(canvas)
        this.pixi_cnt = element;
        //now we are adding the application to the DOM element which we got from the Ref.
        if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
            this.pixi_cnt.appendChild(this.state.app.view);
            //The setup function is a custom function that we created to add the sprites. We will this below
            //this.setup();
        }
    };

    render() {
        return <div ref={this.updatePixiCnt}/>;
    }
}