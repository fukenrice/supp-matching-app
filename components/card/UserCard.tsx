import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useEffect, useMemo, useRef, useState} from "react";
import ProblemModel from "../../data/models/ProblemModel";
import HobbyModel from "../../data/models/HobbyModel";
import Swiper from 'react-native-swiper';
import {image_placeholder} from "../../assets/image_placeholder";
import {calculateAge} from "../../utils/calculateAge";
import {SvgXml} from "react-native-svg";
import {infoIcon} from "../../assets/infoIcon";
import BulletList from "../utils/BulletList";
import BottomSheet from "@gorhom/bottom-sheet";
import CardBottomSheet from "./CardBottomSheet";

export default function UserCard({name, desc, birthday, hobbies, photos, problems, style}: {
    name: string,
    birthday: Date,
    problems: ProblemModel[],
    hobbies: HobbyModel[],
    desc: string,
    photos: string[],
    style?: ViewStyle
}) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef<Swiper>(null);

    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['70%'], []);

    const onNextImage = () => {
        if (currentIndex < photos.length - 1 && swiperRef.current) {
            setCurrentIndex(currentIndex + 1);
            swiperRef.current.scrollBy(1, true)
        }
    };

    const onPrevImage = () => {
        if (currentIndex > 0 && swiperRef.current) {
            setCurrentIndex(currentIndex - 1);
            swiperRef.current.scrollBy(-1, true)
        }
    };

    const getDotsStyle = (): { activeDotStyle: ViewStyle, dotStyle: ViewStyle } => {
        if (photos.length === 2) {
            return {activeDotStyle: {width: "40%", height: 4}, dotStyle: {width: "40%", height: 4}}
        }
        if (photos.length === 3) {
            return {activeDotStyle: {width: "26.6%", height: 4}, dotStyle: {width: "26.6%", height: 4}}
        } else {
            return {activeDotStyle: {width: "20%", height: 4}, dotStyle: {width: "20%", height: 4}}
        }
    }

    return <View style={[style, {flex: 1, borderRadius: 20}]}>
        <View style={{flex: 1, width: "100%"}}>


            <Swiper style={{borderRadius: 20}}
                    loop={false}
                    ref={swiperRef}
                    scrollEnabled={false}
                    paginationStyle={{top: "-90%"}}
                    dotStyle={getDotsStyle().dotStyle}
                    activeDotStyle={getDotsStyle().activeDotStyle}
                    activeDotColor={"white"}
            >
                {photos.map((image, index) => (
                    <View key={index} style={{flex: 1}}>
                        <Image source={{uri: image}} style={styles.cardContainer} borderRadius={20}/>
                    </View>
                ))}
            </Swiper>

            <View style={styles.shortInfoContainer}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    marginBottom: 10
                }}>
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "flex-end"}}>
                        <Text style={{color: "white", fontWeight: "700", fontSize: 25}}>{name}, </Text>
                        <Text style={{color: "white", fontWeight: "600", fontSize: 20}}>{calculateAge(birthday)}</Text>
                    </View>
                    <SvgXml xml={infoIcon} onPress={() => {
                        bottomSheetRef.current?.expand()
                    }}/>
                </View>
                <BulletList data={problems} containerStyle={styles.bulletStyle} textStyle={{color: "black"}}/>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose={true}
                backgroundStyle={{backgroundColor:'#f2f2f2',}}
            >
                <CardBottomSheet name={name} birthday={birthday} problems={problems} hobbies={hobbies} desc={desc}/>
            </BottomSheet>

            <TouchableOpacity
                onPress={onNextImage}
                style={{
                    position: 'absolute', top: 0, right: 0, width: '50%', height: '70%',
                }}
            />
            <TouchableOpacity
                onPress={onPrevImage}
                style={{
                    position: 'absolute', top: 0, left: 0, width: '50%', height: '70%',
                }}
            />
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
    cardContainer: {
        flex: 1,
    },
    shortInfoContainer: {
        width: "100%",
        position: "absolute",
        padding: 15,
        top: "70%"
    },
    bulletStyle: {
        borderWidth: 1,
        backgroundColor: "#eaeaea",
        borderColor: "#D8D8D8",
    }
})
