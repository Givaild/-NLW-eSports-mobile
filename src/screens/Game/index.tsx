import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native'
import {Entypo} from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';
import { styles } from './styles';

import { GameParams } from '../../@types/navigation';

import { Head } from '../../components/Head';
import { Background } from '../../components/Background';
import { DouCard, DuoCardProps } from '../../components/DouCard';

export function Game() {

    const [duos,setDuos] = useState<DuoCardProps[]>([]);

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams
    

    function handleGoBack() {
      navigation.goBack();
    }
    
    useEffect(()=> {
      fetch(`http://192.168.1.105:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data));
    },[]);

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo
          name='chevron-thin-left' 
          color={THEME.COLORS.CAPTION_300}
          size={20}
          />
        </TouchableOpacity>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        
        <View  style ={styles.right}/>
      </View>

      <Image 
        source={{uri:game.bannerURL}}
        style = {styles.cover}
        resizeMode = "center"
      />
        <Head
          title = {game.title}
          subtitle = 'Conecte-se e comece a jogar!'
        />

       <FlatList 
       data={duos}
       keyExtractor = {item => item.id}
       renderItem = {({item})=>(
        <DouCard 
        data={item}
        onConnect = {() => {}}
        />
       )}
       horizontal
       style = {styles.containerList}
       contentContainerStyle = { [duos.length > 0 ? styles.contentList : styles.emptyListContent]}
       showsHorizontalScrollIndicator = {false}
       
       ListEmptyComponent = {()=>(
         <Text style = {styles.emptyListText}>
          Não há anúncios publicados ainda
         </Text>
         )}
       />

    </SafeAreaView>
    </Background>
  );
}