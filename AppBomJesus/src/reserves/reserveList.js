import React, { Component } from 'react';

import { List, ListItem, Container, Card, CardItem, Text, Body, Content, Thumbnail } from "native-base";

import {  format, parseISO } from "date-fns";

import { Notifications } from 'expo';

import registerForPushNotificationsAsync from '../notification/registerForPushNotificationsAsync';

import {StyleSheet} from 'react-native'





//components criados neste projeto.
import HeaderReserve from './HeaderReserve'

import ServerClient from '../../server/serve'




const echo = ServerClient

export default class FlatListBasics extends Component {
    constructor(props){
        super(props)
        
        this.state = {reserves:[], notification: {},}
        echo
        .channel('reserve-received')
        .listen('EventResponseReserve', () => {
            this.loaderReserve()
            this.render()
            registerForPushNotificationsAsync();
        });
    }

    componentDidMount (){
        registerForPushNotificationsAsync();
        this.loaderReserve()
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('new_reserve', {
                name: 'Fabio',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            })
        }

    }

    _handleNotification = notification => {
        this.setState({ notification: notification });
      };

    loaderReserve = () => {
        return fetch("http://10.19.1.31/BJ/BomJesus/BomJesus/public/api/dashboard/reserves",{
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then( res => {
           // console.log(res.reservas[0].date)
            this.setState({
                reserves: res.reservas || []
            })
            //console.log(this.state.reserves)
        })
    }
    showClass(classes){
        return classes.map( (item, index) => {
             return <ListItem key={index.toString} keyExtractor = {(...[,index]) => index.toString}><Text>{item}</Text></ListItem>
        })
     }
    showReseve(){
        return this.state.reserves.map((reserve, index) => {
            return <Card  key={index.toString}>
                        <CardItem  header bordered>
                            <Thumbnail source={{ uri: 'http://10.19.1.31:8000/storage/users/' + reserve.user.image }} />
                            <Text style={styles.text}> {reserve.user.name}</Text>
                        </CardItem>
                        <CardItem bordered>
                        <Body>
                            <List keyExtractor = {(...[,index]) => index.toString}>{this.showClass(reserve.classes)}</List>
                        </Body>
                        </CardItem>
                        <CardItem style={styles.data} footer bordered>
                            <Text style={styles.textDate}>{ format(parseISO(reserve.date),"dd '/' MM '/' yyyy ")}</Text>
                            <Text style={styles.textDate}>| Período: {reserve.period}</Text>
                        </CardItem>
                    </Card>
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.reserves !== nextState.reserves;
    }

    render() {
        return (
            <Container>
            <HeaderReserve></HeaderReserve>
              <Content padder>
                {this.showReseve()}
              </Content>
            </Container>
          );
     }
}

const styles = StyleSheet.create({
    text: {
        color: '#0e203d',
        fontSize: 20,
        fontWeight:"bold",
    },
    data:{
        backgroundColor: '#f3b5b5',
        fontSize: 17,
    },
    textDate:{
        fontSize: 18,
        color:'#266118',
    }
  })
