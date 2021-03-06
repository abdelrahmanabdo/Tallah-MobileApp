import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text , FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import TallahButton from '../../../../components/Button';
import Snackbar from '../../../../components/Snackbar';

import Add from './Add';

import I18n from '../../../../lang/I18n';
import AddProject from '../../Projects/AddProject';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

const StepFour = props => {
   const navigation = useNavigation();
   const [showAddModal , setShowAddModal ] = useState(false);
   const [projects , setProjects] = useState([]);
   const projectRef = useRef(null);

   /**
    * Submit current step
    */
   const submitStep = () => {
     //Submit projects to api
      api  
         .post(endpoints.stylistProject, projects)
         .then(res => {
            props.goToNext();
         })
         .catch(err => {
            console.log(err.response);
            new Snackbar({text : err.response.data.message , type : 'danger'});
         });
   }

   /**
    * Render project item
    */
   const renderItem = ({item , index}) => {
         return <BorderlessButton 
                  key={index} 
                  style={{flexDirection:'row'  , flexWrap :'wrap' ,
                          width :'29%' , height : 120  , margin: 10 , borderRadius : 5 , overflow:'hidden'}}
                  onPress={() => navigation.navigate('projectDetails')}
               >
               {
                  item?.images.map((item2 , key) => {
                     return <FastImage 
                        key={key}
                        resizeMode={'contain'}
                        source={{uri: item2}}
                        style={{flex:1,height : '100%' , width : '50%'}}
                     />
                  })
               }
         </BorderlessButton>
   } 


   return <SafeAreaView style={{height : '86%'}}>
      <Text
         style={[GeneralStyle.blackBoldText , 
               {marginStart : 15 , marginVertical : 8 , fontSize : 16}]}
      >
       Projects
      </Text>
      <Add  
         type={'project'}
         onPress={() => setShowAddModal(true)}
      />
      <FlatList 
                contentContainerStyle={[style.favoruitesListContainer]}
                showsVerticalScrollIndicator={false}
                horizontal = {false}
                keyExtractor={(item,index) => index.toString()}
                numColumns={3}
                data={projects}
                renderItem={renderItem}
      />
      <TallahButton 
            onPress={submitStep}
            labelColor = "#FFF"
            label = {I18n.t('next')}
            bgColor = "#D1AD67"
            style={{ padding: 15 , width : '91%'  }}
      />
      <AddProject 
         showModal={showAddModal}
         onCloseModal={() => setShowAddModal(false)}
         onSubmitModal={(newProject) => { 
            setProjects([...projects , newProject]) ;
            setShowAddModal(false);
         }}
      />   

   </SafeAreaView>
}

export default StepFour;