import React, { Component } from 'react';

import { Image, StyleSheet } from 'react-native';

import { List, ListItem, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import {  format, parseISO } from "date-fns";

import { color } from 'react-native-reanimated';

import ServerClient from '../../server/serve'


const echo = ServerClient
export default class CardImageExample extends Component {

    constructor(props){
        super(props)

        this.state = {user:{}}
        echo
        .channel('reserve-received')
        .listen('EventResponseReserve', () => {
            this.loaderUser()
            this.render()
        });
    }

    componentDidMount (){
        this.loaderUser()
    }


    loaderUser = (id) => {
        return fetch(`http://10.19.1.31/BJ/BomJesus/BomJesus/public/api/dashboard/reserve_user/${id}`,{
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then( res => {
            this.setState({
                user: res.user
            })
            console.log(this.state.user)
        })
    }
    showReseve(){
        return this.state.reserves.map((reserve, index) => {
            return <Card  key={index.toString}>
                        <CardItem style={styles.data} footer bordered>
                            <Text style={styles.textDate}>{ format(parseISO(reserve.date),"dd '/' MM '/' yyyy ")}</Text>
                            <Text style={styles.textDate}>| Período: {reserve.period}</Text>
                        </CardItem>
                        <CardItem bordered style={{backgroundColor:'#848785'}}>
                            <Body>
                                <List keyExtractor = {(...[,index]) => index.toString}>{this.showClass(reserve.classes)}</List>
                            </Body>
                        </CardItem>
                    </Card>
        })
    }

    showClass(classes){
        return classes.map( (item, index) => {
             return <ListItem key={index.toString} keyExtractor = {(...[,index]) => index.toString}><Text style={{fontSize:16,color:'white',fontWeight:"bold",}}>{item}</Text></ListItem>
        })
     }


  render() {
    return (
      <Container>
        <Content style={{maxHeight:180,backgroundColor:'#418c35'}}>
          <Card style={{backgroundColor: '#418c35'}}>
            <CardItem style={styles.profile} cardBody>
                <Thumbnail  large source={{uri:'http://10.19.1.31:8000/storage/users/2020030412095e5fc4a1f13aa.jpg'}} />
            </CardItem>
            <CardItem style={styles.name}>
                <Text style={styles.name}>Fábio Gilberto Andrioli Goncalves</Text>
            </CardItem>
          </Card>
        </Content>
        <Content >
            <Card>
               
            </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    profile:{
        justifyContent: 'center',
        height:80,
        backgroundColor:'#418c35',
        marginTop:5
    },
    name:{
        justifyContent: 'center',
        fontSize:21,
        backgroundColor:'#275221',
        color:'white',
        marginTop:4
    },
    textTile: {
        color: 'white',
        fontSize: 20,
        fontWeight:"bold",
    },
    data:{
        backgroundColor: '#f3b5b5',
        fontSize: 17,
    },
  })