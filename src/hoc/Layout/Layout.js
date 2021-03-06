import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

 class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    SideDrawerToggleHandler = () =>{
        this.setState((prevState) =>{
            return { showSideDrawer: !prevState.showSideDrawer }
        })
        
    }

     render(){
        return(
            <Auxiliary>
        <div>  
            <Toolbar 
                DrawerToggleClicked={this.SideDrawerToggleHandler} 
            />  
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.SideDrawerClosedHandler}
            />
            <main className={classes["Content"]}>
                {this.props.children}
            </main>     
        </div>
        </Auxiliary>

        )
     }   
}

export default Layout;