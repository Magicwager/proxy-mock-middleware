import React, { Component } from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import {Link} from 'react-router';
import Hello from '../../pages/HelloWorld';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

export default class App extends Component{
  constructor(props){
    super(props);
    console.log(this)
    this.state = {
      collapsed: false,
    };
    this.onCollapse=this.onCollapse.bind(this)
  }
  onCollapse(collapsed) {
    console.log(this);
    this.setState({ collapsed });
  }
  render(){
    return(
    <div>
      <div>
        <Layout>
          <Sider  collapsible collapsed={this.state.collapsed}  onCollapse={this.onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="pie-chart" />
                <Link to="/webAddress">WebAddress</Link>
              </Menu.Item>
              <Menu.Item key="3" >
                <Icon type="desktop" />
                <Link to="/myRepo">MyGitRep</Link>
                {/* <span onClick={this.getMyGit}>我的Git仓库</span> */}
            </Menu.Item>
             {/*  <SubMenu key="sub1" title={<span><Icon type="user" /><span>name</span></span>}>
                <Menu.Item key="4">Tom</Menu.Item>
                <Menu.Item key="5">Bill</Menu.Item>
                <Menu.Item key="6">Alex</Menu.Item>
              </SubMenu> */}

            </Menu>
          </Sider>
            <Layout>
              <Header className='appHead'>
                  <Breadcrumb routes={this.props.routes} params={this.props.params} />
              </Header>
              <Content>{ this.props.children||<Hello /> }</Content>
              <Footer className='appFooter'></Footer>
            </Layout>
        </Layout>
      </div>
    </div>
    )
  }
}
