import React , {useState , useEffect} from 'react';
import { Text, View, ImageBackground  , StatusBar , FlatList , ScrollView, Dimensions} from 'react-native';
import {  RectButton, BorderlessButton, BaseButton  } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/StylistTabStyle';

//Components
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import NotFound from '../../components/NotFound';

const width = Dimensions.get('window').width ;

const StylistTab = props => {
    const [isFirstTime , setIsFirstTime ] = useState(true);

    /**
     * First Time 
     * @param {*} props 
     */
    const FirstTime = () => {
            return  <View style={[GeneralStyle.container]}>
                <ImageBackground source={require('../../assets/images/colored-bg.png')}
                                style={GeneralStyle.header}>
                    <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                        <RectButton>
                            <FastImage source={require('../../assets/icons/small-logo-white.png')}
                                    style={{width : 35 , height : 35}}
                                    resizeMode={'contain'} />
                        </RectButton>
                        <Text style={GeneralStyle.headerText}>
                            Stylist
                        </Text>
                        <View style={{flexDirection : 'row'}}>
                            <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                                <FastImage source={require('../../assets/icons/notification.png')}
                                        resizeMode={'contain'}
                                        style={{width : 25,height : 25}} />
                            </BorderlessButton>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[style.container]}>
                    <RectButton style={style.shareButton} >
                        <FastImage source={require('../../assets/icons/share-colored.png')}
                                resizeMode={'contain'}
                                style={{width : 26 , height : 27}} />
                    </RectButton>
                    <FastImage source={require('../../assets/images/stylist-image.png')} 
                            resizeMode={'stretch'}
                            style={style.image} />
                    <Text style={[GeneralStyle.blackBoldText, {marginBottom : 8,fontSize : 17}]}>
                    Book your Stylist now.
                    </Text>
                    <Text style={[GeneralStyle.blackText, {marginBottom : 5,fontSize : 13}]}>
                    Get your tailored online advice from one of our 
                        experienced consultants and enjoy confident 
                        possibilities & celebs look.
                    </Text>
                </View>
                <Button label ={'Next'}
                        labelColor = {'#FFF'}
                        onPress={()=> setIsFirstTime(false) }
                        style={{width : '90%',padding :15,marginBottom : 30}}
                        />
            </View>
    }

    /**
     * Stylists list
     * @param {*} props 
     */
    const StylistsList = () => {
        const [featuredStylists , setFeaturedStylists ] = useState([
           {
               id : 1 ,
               name : 'stylist 1' ,
               avatar : '' ,
               sessions : 3 ,
               rating : 3.4 ,
               location : 'Cairo , Egypt'
           },
           {
               id : 2 ,
               name : 'stylist 2'  ,
               avatar : '' ,
               sessions : 3 ,
               rating : 2.6 ,
               location : 'Cairo , Egypt' 
           },
           {
               id : 3 ,
               name : 'stylist 3'  ,
               avatar : '' ,
               sessions : 3 ,
               rating : 2.1 ,
               location : 'Cairo , Egypt'
           },
           {
               id : 4 ,
               name : 'stylist 4'  ,
               avatar : '' ,
               sessions : 5 ,
               rating : 3.9 ,
               location : 'Cairo , Egypt'
           },
           {
              id : 5 ,
              name : 'stylist 5'  ,
              avatar : '' ,
              sessions : 2 ,
              rating : 3.4 ,
              location : 'Cairo , Egypt'
          },
          {
              id : 6 ,
              name : 'stylist 6'  ,
              avatar : '' ,
              sessions : 1 ,
              rating : 4.2 ,
              location : 'Cairo , Egypt'
          },
     
       ]);
     
       const [stylists , setStylists ] = useState([]);
     

       /**
        * Get list of all stylusts
        */
       const getStylists = () => {
          api  
            .get(endpoints.stylist)
            .then(res => setStylists(res.data.data));
       }

       /**
        * Render featured stylists list
        */
       const renderFeaturedStylist = ({item}) => {
          return <RectButton onPress={()=> {}}
                             style={{width : width * .19,marginHorizontal:5}}>
              <FastImage source={require('../../assets/icons/default-avatar.png')} 
                       style={{width : 55 , height : 55 , borderRadius : 18}} />
              <Text style={[GeneralStyle.blackText,{marginTop : 5}]} 
                    numberOfLines={2}>
                 {item.name}
              </Text>
          </RectButton>
       }
     
       /**
        * Render featured stylists list
        */
       const renderStylist = ({item}) => {
          return <BaseButton onPress={()=> {props.navigation.navigate('stylistDetails',{stylistId: item.id})}}
                             style={[style.stylistBox]}>
              <View style={{flex:1}}>
     
              </View>
              <View style={{flex:2}}>
                 <View style={[GeneralStyle.rowSpaceBetween,{marginBottom : 8}]}>
                    <View style={[GeneralStyle.row , {alignItems:'center'}]}>
                       <FastImage source={item.avatar ? {uri: item.avatar} : require('../../assets/icons/default-avatar.png')} 
                                  style={{width : 35 , height : 35 , borderRadius : 18 , marginEnd : 10}} />
                       <View>
                          <Text style={[GeneralStyle.blackText,{marginTop : 5}]} 
                                numberOfLines={1}>
                             {item.user.name}
                          </Text>
                          {/* <Text style={[GeneralStyle.blackText,{marginTop : 5 , color : '#BBB'}]} >
                          {item.sessions} Session
                          </Text> */}
                       </View>
                    </View>
                    <View>
                       <Text style={[GeneralStyle.blackText,{marginTop : 5 ,alignItems:'center' , color : '#D1AD67'}]}>
                         <FastImage source={require('../../assets/icons/rating-star.png')} 
                                    resizeMode={'contain'}
                                    style={{width : 15 , height : 15 , marginEnd : 5}}/> 
                          {item.rating}
                       </Text>
                       <Text style={[GeneralStyle.blackText,{marginTop : 5 , fontSize : 13}]} 
                          numberOfLines={1}>
                        {item.country.name_en} 
                       </Text>
                    </View>
                 </View>
                 <Text style={[GeneralStyle.blackText]}>
                    {item.bio}
                 </Text>
              </View>
          </BaseButton>
       }

       useEffect(() => {
          //Get list of all stylists
         getStylists();
       },[])
     
        return  <View style={[GeneralStyle.container]}>
              <StatusBar hidden={false}  barStyle={'light-content'}  backgroundColor={'#012647'}/>
           <ImageBackground source={require('../../assets/images/colored-bg.png')}
                             style={GeneralStyle.header}>
                 <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton>
                       <FastImage source={require('../../assets/icons/small-logo-white.png')}
                                   resizeMode={'contain'}
                                   style={{width : 35 , height : 35}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                       Stylists
                    </Text>
                    <View style={{flexDirection : 'row'}}>
                       <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                             <FastImage source={require('../../assets/icons/notification.png')}  
                                      resizeMode={'contain'}
                                      style={{width : 25,height : 25}} />
                       </BorderlessButton>
                       <BorderlessButton onPress={() => {props.navigation.navigate('profile')}}>
                             <FastImage source={require('../../assets/images/girl.png')}
                                   resizeMode={'contain'}
                                   style={{width : 30,height :  30 , marginStart : 14}} />
                       </BorderlessButton>
                    </View>
                 </View>
           </ImageBackground>
           <View style={[GeneralStyle.rowSpaceBetween,{padding:15}]}>
              <BorderlessButton 
                  onPress={() => props.navigation.navigate('stylistRequestIntro')}
                  style={[GeneralStyle.SecondaryButton]}
               >
                 <Text style={[GeneralStyle.SecondaryButtonText]}>
                    Be a Stylist
                 </Text>
              </BorderlessButton>
              <View style={[GeneralStyle.row]}>
                 <BaseButton style={{marginEnd : 20}}>
                    <FastImage 
                       source={require('../../assets/icons/search.png')} 
                       style={{width : 20 , height : 20}}
                    />
                 </BaseButton>
                 <BaseButton>
                 <Text style={[GeneralStyle.goldText, {fontSize: 17}]}>
                       Filter
                    </Text>
                  </BaseButton>
              </View>
           </View>
           <View style={[style.grayContainer]}>
              <Text style={[GeneralStyle.primaryText , {textAlign :'center',fontSize:18,fontWeight : '500'}]}>
                 Highest rating
              </Text>
              <FlatList 
                 horizontal
                 showsHorizontalScrollIndicator={false}
                 data={featuredStylists}
                 style={{backgroundColor: '#F8F8F8', paddingVertical : 10}}
                 keyExtractor={(item,index) => index.toString()}
                 renderItem={renderFeaturedStylist}
              />
           </View>
           {
              stylists.length === 0 ?
              <NotFound
                  text={'No Stylist till now'}
              />
              :
               <FlatList 
                     showsVerticalScrollIndicator={false}
                     data={stylists}
                     style={{padding : 10}}
                     keyExtractor={(item,index) => index.toString()}
                     renderItem={renderStylist}
                  />
           }

       </View>
     
     
     }

     return <>
        {
            isFirstTime ? 
            <FirstTime />
            :
            <StylistsList />
        }
    
     </>
};

export default StylistTab;
