import React, {Component} from 'react';

export default class Webpage extends Component {
    constructor(props){
        super(props)
        this.state={
           
        }
    }
    componentDidMount(){
        debugger
      
        
    }
    render(){
        let self=this;
        return (
            <iframe src={self.props.location.query.href} className='iframeOuter'></iframe>
        )
    }
}