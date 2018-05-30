import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from 'firebase';
import TugUrl from './tug.png';
import Player1 from './player1.png';
import Player2 from './player2.png'
import Background from './grassandsky.jpg';

class Tug extends Component {

    render() {

        const style = {
            left: this.props.x,
            top: "200px",
            position: "fixed",
            width: "80%"
        }

        return (
            <img ref= {this.props.innerRef} style={style} src={TugUrl} alt="tug"/>

        )
    }
}

class PlayerIcon extends Component {

    render() {

        return (

            <p style={this.props.style}>
            
                <img src={this.props.player} alt="player"/>
                
                {this.props.text}
                
            </p>

        )

    }

}

class BackgroundImage extends Component {
    
    render(){
        
        return (
            
            <img src={Background} style={this.props.style} alt="background"/>
            
            )
        
    }
    
}


export default class testGame extends Component {

    constructor(props) {
        super(props)
        this.ImgRef = React.createRef()
        this.state = {
            left: 150
        }
        this.left = firebase.database().ref('/left');
        this.left.on('value', (snapshot) => {
            var retrievedleft = snapshot.val()

            console.log(this.ImgRef.current.offsetWidth)
            this.setState({ left: retrievedleft || 0 })
        })

        this.onButtonPressed = this.onButtonPressed.bind(this)
    }

    componentDidUpdate() {
        if (this.state.left > window.innerWidth || this.state.left + this.ImgRef.current.offsetWidth < 0) {
            this.left.transaction(function(left) {
            return 150
            })
        }
        
    }

    onButtonPressed(event) {

        if (event.keyCode === 75) {
            this.left.transaction(function(left) {
                if (typeof left === 'number') {
                    return left + 50
                }

                //console.log('>>', left)
                return left
            });
            //this.presses.set(this.state.presses + 50)
            //   this.setState({
            //     presses: this.state.presses + 1
            //   })
        }
        if (event.keyCode === 83) {
            this.left.transaction(function(left) {
                if (typeof left === 'number') {
                    return left - 50
                }

                //console.log('<<', left)
                return left
            });
            //.presses.set(this.state.presses - 50)
            //this.setState({
            //presses: this.state.presses - 1
        }
    }

    render() {

        var style1 = {
            left: "100px",
            position: "fixed",

        }

        var style2 = {
            right: "100px",
            position: "fixed",
        }
        
        var style3 = {
            height: "600px",
            width: "100%",
            
            
        }
        
        var style4 = {
            position: "fixed",
            top: "100px",
            left: "600px",
        }
        

        return (
            
            <div className="container">
             
                <Tug innerRef={this.ImgRef} x={this.state.left}></Tug>
                
                <PlayerIcon player={Player1} style={style1} text="Player 1: Press Key S"/>
                
                <PlayerIcon player={Player2} style={style2} text="Player 2: Press Key K"/>
                
                <BackgroundImage style={style3}/>
                
                <div onKeyDown={this.onButtonPressed}>
    
                    <RaisedButton label= 'Start Game' style={style4}/>
                
                </div>
            
            </div>
        )
    }
};
