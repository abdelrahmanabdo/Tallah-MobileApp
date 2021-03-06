import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BorderlessButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';
//Componentes
import Snackbar from './Snackbar';
import I18n from '../lang/I18n';

const AddToFavourites = ({itemId, isGold, iconSize}) => {
   const user = useSelector(state => state.user.user );
   const [isFavourited , setIsFavourited] = useState(false);
   const favoruitesItem = useRef();
   const size = {width : iconSize == 'big' ? 29 : 23, height : iconSize == 'big' ?  29 : 23};

   /**
    * Favoruite item
    */
   const makeFavorited = () => {
      if (!user) return new Snackbar({text : I18n.t('loginFirst') , type : 'danger'});
      if (!itemId) new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
      
      //Submit data to api
      api  
         .post(endpoints.favourites, {
            'user_id': user.id, 
            'closet_id' : itemId,
            'remove_item' : isFavourited
         })
         .then(res => {
           new Snackbar({text : res.data.message , type : 'success'});
           setIsFavourited(prev => !prev);
         })
         .catch(err => {
            console.log(err.response)
            new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
         });
   }

   return <BorderlessButton onPress={()=>{makeFavorited()}}>
      {
         isFavourited ?
               <Animatable.View animation={'pulse'} iterationCount={2}>
                  <FastImage  source={require('../assets/icons/heart-red.png')}
                              resizeMode={'contain'}
                              style={size}  />
               </Animatable.View>
               :
               isGold ?
               <Animatable.View animation={'fadeIn'}>
                  <FastImage   source={require('../assets/icons/secondary-heart.png')}
                               resizeMode={'contain'}
                               style={size}  />   
               </Animatable.View>
               :              
               <Animatable.View animation={'fadeIn'} duration={500}>
                  <FastImage   source={require('../assets/icons/heart.png')}
                               resizeMode={'contain'}
                               style={size}  />   
               </Animatable.View>

      }
   </BorderlessButton>
};
  

export default AddToFavourites;
