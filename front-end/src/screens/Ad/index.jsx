import React,{ useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { styles } from './styles.js';
import { favoriteService, retrieveFavorite } from '../../service/adService'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { retrieveData } from '../../service/storage'


export default function Ad({ navigation, route }) {
    const [ isFavorite, setIsFavorite ] = useState(false)

    useEffect(()=>{
        async function _init() {
            let userId = JSON.parse(await retrieveData('@user'))._id
            let status = await retrieveFavorite({ userId, id: route.params.value._id })
            setIsFavorite(status.msg)
        };
        _init();
    }, [route.params])

    const setFavorite = async (status) => {
        let userId = JSON.parse(await retrieveData('@user'))._id
        let newStatus = await favoriteService({ status, id: route.params.value._id, userId})
        console.log(newStatus)
        setIsFavorite(newStatus.msg)
    } 

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableHighlight 
                        onPress={() => navigation.goBack()}
                        underlayColor="#DDDDDD"
                    >
                        <Ionicons name="ios-arrow-back" size={30} color="black" />
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={() => setFavorite(!isFavorite) }
                        underlayColor="#DDDDDD"
                    >
                        { isFavorite ?
                           <AntDesign name="star" size={24} color="yellow" />   
                           :
                           <AntDesign name="staro" size={24} color="black" />
                        }
                    </TouchableHighlight>
                </View>
            </View>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.bodyItem}>
                        <Text style={ styles.bodyText }>Imagem aqui</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={ styles.label }>Título:</Text>
                    <View style={styles.bodyItem}>
                        <Text style={ styles.bodyText }>{route.params.value.name}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={ styles.label }>Descrição:</Text>
                    <View style={styles.bodyItem}>
                        <Text style={ styles.bodyText }>{route.params.value.description}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={ styles.label }>Categoria:</Text>
                    <View style={styles.bodyItem}>
                        <Text style={ styles.bodyText }>{route.params.value.category.map(category=>(` ${category.name}`))}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={ styles.label }>Valor:</Text>
                    <View style={styles.bodyItem}>
                        <Text style={ styles.bodyText }>{route.params.value.value}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={ styles.label }>Anunciante:</Text>
                    <View style={styles.bodyItem}>
                        <Text style={ styles.bodyText }>{`${route.params.value.owner.name} ${route.params.value.owner.lastName}`}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={ styles.label }>Localização:</Text>
                    <View style={styles.bodyItem}>
                        <Text style={ styles.bodyText }>{`${route.params.value.owner.address[0].city} - ${route.params.value.owner.address[0].district}`}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}