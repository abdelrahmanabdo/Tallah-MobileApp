import React from 'react';
import { Text, View, ImageBackground, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

//
import AddToFavourites from './AddToFavourites';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const ClosetItem = ({item,...props}) => {
   const navigation = useNavigation();
   
   return <View style={{position:'relative',alignItems:'flex-end'}}>
         <RectButton 
            style={{
                  width : width / 3.4 , height : 100 , marginStart : 8 , 
                  marginBottom : 15 , overflow: 'hidden',borderRadius:6}}
            onPress={()=> navigation.push('closetItemView',{itemId: item.id}) }>
            <ImageBackground source={ {uri: item.image} ?? require('../assets/icons/closet-item-default.png')}
                              style={{width : '100%' , height : '100%' }}
                              resizeMode={'stretch'}> 
            </ImageBackground>
         </RectButton>
         <View style={{position: 'absolute',top:10,right : 8}} >
               <AddToFavourites itemId={item.id}  />
         </View>
   </View>

};

export default ClosetItem;
