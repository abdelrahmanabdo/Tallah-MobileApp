import {StyleSheet, Dimensions} from 'react-native';


const {width} = Dimensions.get('screen');
export default StyleSheet.create({
   container : {
      flex:1,
      alignSelf :'center',
      width : width ,
      backgroundColor: '#FFF',
   },
   createProfileButton : {
      width :'80%',
      alignSelf:'center',
      padding : 17 , 
      borderRadius : 20,
      alignItems:'center',
      textAlign:'center',
      elevation: 9,
      backgroundColor : '#FFF',
      shadowColor:'#000',
      shadowOffset : {width : 1 , height:4},
      shadowOpacity: 0.15,
      shadowRadius : 8,
   },
   addContainer : {
      paddingHorizontal : 15,
      paddingVertical : 15,
      justifyContent:'center',
      backgroundColor:'#FFF1D6',
      borderRadius : 5 , 
      marginVertical : 10
   },
   grayBoxContainer : {
      backgroundColor: '#F8F8F8',
      paddingHorizontal : 15 , 
      paddingVertical: 10 , 
      borderRadius : 10,
      marginVertical : 7
   },
   creditCardBg : {
      width : '100%' ,
      flexDirection:'column' ,
      justifyContent:'space-between',
      alignItems:'flex-start',
      paddingHorizontal:  20,
      paddingVertical : 15,
      backgroundColor : '#FFF',
      marginVertical : 35,
      borderRadius : 5 ,
      elevation: 9,
      shadowColor: "#CCC",
      shadowOffset: {
         width: 3,
         height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4.84,
   }
   

});