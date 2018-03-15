import React, {Component} from 'react';
import axios from 'axios';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

export default class Demo extends Component {
    constructor(props){
        super(props)
        this.state = {
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            selectedKeys: [],
            treeData:[]
          }
    }
    componentDidMount(){
        let self=this;
        axios({
            url:'/react-gulp-es6/webAddress/getAddress',
            method:"get",
            data:{
                userId:""
            }
        }).then(
            function(res){
                if(res.data.state==1){
                    self.setState({
                        treeData:res.data.data
                    })
                }else{
                    alert(res.data.message)
                }
    
            }
        )
    }
  
  onExpand (expandedKeys) {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onSelect(selectedKeys, info){
      debugger
    console.log('onSelect', info);
    const data = {href:selectedKeys[0]};
    let path = {
      pathname:'/webPage',
      query:data,
    }
    this.props.router.push(path);
    this.setState({ selectedKeys });
  }
  renderTreeNodes(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  renderSelf(){
      return <div className='webAdd_tree'>
                <Tree
                    onExpand={this.onExpand.bind(this)}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onSelect={this.onSelect.bind(this)}
                    selectedKeys={this.state.selectedKeys}>
                    {this.renderTreeNodes(this.state.treeData)}
                </Tree>
            </div>
  }
  render() {
    return (
        <div className='webAdd_outer'>
            {this.props.children ||this.renderSelf()}
            {/* <div className='webAdd_tree'>
                    <Tree
                        onExpand={this.onExpand.bind(this)}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onSelect={this.onSelect.bind(this)}
                        selectedKeys={this.state.selectedKeys}>
                        {this.renderTreeNodes(this.state.treeData)}
                     </Tree>


            </div> */}
           {/*  <div className='webAdd_iframe'>
                {this.props.children }
            </div> */}

        </div>
        
      
    );
  }
}