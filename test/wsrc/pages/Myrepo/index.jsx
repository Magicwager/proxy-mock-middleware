import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card} from 'antd';
import axios from 'axios';

export default class Myrepo extends Component {
    constructor(props){
        super(props)
        this.state={
            myRepoData:[]
        }
        this.routeTo=this.routeTo.bind(this)
    }
    componentDidMount(){
        let self=this;
        axios({
            url:'/react-gulp-es6/myrepo/getMyRepo',
            method:"get",
            data:{
                userId:"wujiank"
            }
        }).then(
            function(res){
                if(res.data.state==1){
                    self.setState({
                        myRepoData:res.data.data
                    })
                }else{
                    alert(res.data.message)
                }
    
            }
        )
    }
    routeTo(href){
        /* 可以通过穿对象的方式传参数，通过query属性传参数，在接收的组件中可以通过self.props.location.query获取参数 */
        const data = {href:href};
        let path = {
          pathname:'/repo',
          query:data,
        }
        this.props.router.push(path);
    }
    render(){
        let self=this;
        return (
            <div className='Myrepo-outer' style={{padding:10}}>
                <h2>Magicwager's Repositories</h2>
                {
                    self.state.myRepoData.map(function(repo,index){
                     return  (
                         <Card title={repo.title} key={index} extra={  <a href={repo.href} target="_blank">More</a>} style={{ width: 300 ,maginRight:40,display:'inline-block'}}>
                            <p>{repo.content}</p>
                        </Card>)
                     })
                }
                {this.props.children }

            </div>
            
        )
    }
}