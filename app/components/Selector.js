import React, { useState, useEffect } from 'react';
import {Text, View  ,  StyleSheet , Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, BaseButton, BorderlessButton } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('screen');

const Selector = ({...props}) => {
   const [isSelected , setIsSelected ]= useState(false);
   const [item , setItem ]= useState(props.item.item);

   const onSelect = () => {
      setIsSelected(!isSelected);
      props.onSelect(item.id)
   }

   useEffect(()=>{
   },[props.isCurrentSelected])

   return <>
       {
          props.isRadio ?
            <BorderlessButton style={style.container}
                        rippleColor={'#F8F8f8'}
                        onPress={onSelect}>
               <Animatable.View animation={'flipInY'} style={style.imageContainer}>
                  <FastImage source={{uri: item.image}} 
                             resizeMode="contain"
                             style={style.image}
                  />
                  <View style={[style.radio,{backgroundColor : props.isCurrentSelected ? '#5D0D57' : '#FFF'}]}>

                  </View>
               </Animatable.View>
               <Text style={style.label}>
                  {item.title ?? ''}
               </Text>
            </BorderlessButton>
         :
         <Animatable.View animation={'slideInUp'}>
            <BorderlessButton style={[style.container ,props.style,{height : props.hideText ? 120 : 175}]}
                        rippleColor={'#F8F8f8'}
                        onPress={onSelect}>
               <View  style={style.imageContainer}>
                  <FastImage source={{uri: item.image}} 
                             resizeMode="stretch"
                             style={[style.image]}
                  />
                  <View  style={[style.check,{backgroundColor : props.isCurrentSelected ? '#5D0D57' : '#FFF'}]}>
                  </View>
               </View>
               {
                  !props.hideText &&
                  <Text style={style.label}>
                     {item.title ?? ''}
                  </Text>
               }

            </BorderlessButton>
         </Animatable.View>

       }
    </>
};

export default Selector;

const style = StyleSheet.create({
   container : {
      width : width  / 2 - 20,
      height : 150,
      borderRadius : 9,
      margin: 5,
      alignSelf:'center',
   },

   imageContainer:{
      flex:3,
      flexDirection:'row',
      color : "#F90909",
      fontSize:16,
   },
   image :{
      width:'100%',
      height:'100%'
   },
   radio :{
      width:20,
      height:20,
      borderRadius : 10,
      backgroundColor:'#FFF',
      borderWidth : 1,
      borderColor : '#5D0D57',
      position:'absolute'
   },
   check :{
      width:25,
      height:25,
      borderRadius : 2,
      backgroundColor:'#FFF',
      borderWidth : 1,
      borderColor : '#5D0D57',
      position:'absolute',
      left : 10,
      top:10
   },
   label : {
      flex:1,
      color : "#5D0D57",
      fontFamily : "Roboto",
      fontSize: 13,
      alignSelf:'center',
      marginTop:4
   },

});
