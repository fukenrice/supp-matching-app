import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Touchable,
    TouchableWithoutFeedback, TouchableHighlight
} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useEffect, useState} from "react";
import ButtonInactive from "../buttons/ButtonInactive";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {xml} from "../../assets/mainPic";
import {SvgXml} from "react-native-svg";
import {image_placeholder} from "../../assets/image_placeholder";
import * as ImagePicker from 'expo-image-picker';
import {addPhoto, confirmPhotos} from "../../redux/action-creators/ProfileActionCreators";
import {image_placeholder_conent} from "../../assets/image_placeholder_conent";
import {uploadPhotos} from "../../data/repo/repo";

export default function PhotosScreen() {

    const state = useSelector((state: RootState) => state.userProfile)
    const dispatch = useDispatch()

    const fillArray = (arr: string[]) => {
        const res = [...arr]
        for (let i = arr.length; i < 4; i++) {
            res.push("")
        }
        return res
    }

    const pickImage = async (index?: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });

        if (!result.canceled) {
            dispatch(addPhoto(result.assets[0].uri, index))
        }
    };

    return <View style={styles.container}>
        <View style={{flex: 9, alignItems: "center", justifyContent: "center", padding: 10}}>
            <Text style={loginHintsText}>Выбери до 4 своих фото</Text>
            <FlatList data={state.photos.length < 4 ? fillArray(state.photos) : state.photos}
                      contentContainerStyle={{flex: 1, alignItems: "center", justifyContent: "center"}}
                      ItemSeparatorComponent={() => <View style={{height: 20}}/>}
                      renderItem={({item, index}) => {
                          return item === "" ?
                              <TouchableOpacity
                                  style={[{
                                      ...styles.imageContainer,
                                      borderWidth: 1,
                                      borderColor: "#D8D8D8",
                                      backgroundColor: "#eaeaea",
                                      borderStyle: "dashed",
                                      alignItems: "center",
                                      justifyContent: "center"
                                  }, index % 2 === 0 ? {marginRight: 10} : {marginLeft: 10}]}
                                  onPress={() => pickImage()}
                              >
                                  <SvgXml
                                      xml={image_placeholder_conent}
                                  />
                              </TouchableOpacity>
                              :
                              <TouchableOpacity
                                  style={[styles.imageContainer, index % 2 === 0 ? {marginRight: 10} : {marginLeft: 10}]}
                                  onPress={() => {
                                      pickImage(index)
                                  }}>
                                  <Image
                                      style={{flex: 1, borderRadius: 20}}
                                      source={{uri: item}}
                                  />
                              </TouchableOpacity>
                      }} numColumns={2}/>
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {state.photos.length !== 0 ?
                <ButtonActive text={"Далее"} onClick={async () => {
                    dispatch(confirmPhotos())
                }}/>
                :
                <ButtonInactive text={"Далее"}/>
            }
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    imageContainer: {
        borderRadius: 20,
        width: "47%",
        aspectRatio: 2 / 3
    }
})
