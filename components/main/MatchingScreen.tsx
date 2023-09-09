import {Alert, Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {loginHintsText} from "../../styles";
import React, {LegacyRef, useEffect, useRef, useState} from "react";
import UserCard from "../card/UserCard";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import Swiper from "react-native-deck-swiper";
import {addChat, addLiked, getProfiles, getUserProfile, uploadUser} from "../../data/repo/repo";
import {ProfileData} from "../../data/models/ProfileData";
import {calculateAge} from "../../utils/calculateAge";
import BulletList from "../utils/BulletList";


export default function MatchingScreen() {

    const state = useSelector((state: RootState) => state.userProfile)
    const [profiles, setProfiles] = useState<ProfileData[]>([])
    const ref = useRef<Swiper<ProfileData>>(null)
    const [index, setIndex] = useState(0)
    const [swipedAll, setSwipedAll] = useState(false)
    const [cardLength, setCardLength] = useState<number>(0);
    const [showBack, setShowBack] = useState(true)
    const [userProfile, setUserProfile] = useState<ProfileData>()

    useEffect(() => {
        fetchData()
    }, []);

    const likeProfile = async (profile: ProfileData) => {
        await addLiked(profile.uid!)
    }

    function handleYup(index: number) {
        likeProfile(profiles[index])
        if ([profiles[index].liked?.includes(userProfile?.uid!)]) {
            // TODO: make alert modal
            Alert.alert("Мэтч!", `Поздравляю, у вас взаимная симпатия c пользователем ${profiles[index].name}! Вы можете написать ему/ей на странице с чатами. Удачи в общении!`)
            addChat(userProfile?.uid!,
                userProfile?.name!,
                userProfile?.photos[0]!,
                profiles[index].uid!,
                profiles[index].name,
                profiles[index].photos[0])
        }
        setProfiles(prevState => {
            prevState.splice(index, 1)
            if (prevState.length === 0) {
                setSwipedAll(true)
                ref.current!.forceUpdate(() => {
                    setCardLength(0)
                })
                return prevState
            }
            if (prevState.length === 1) {
                setShowBack(false)
            }
            setCardLength(prevState.length)
            setIndex(index % prevState.length)
            return prevState
        })
    }

    function handleNope(index: number) {
        // TODO: Maybe add table with all relationships and add response there + remove from search
    }


    const fetchData = async () => {
        const remoteProfiles = await getProfiles()
        const profile = await getUserProfile()
        setUserProfile(profile)
        setProfiles(prevState => [...remoteProfiles!])
        setCardLength(remoteProfiles!.length)
    }


    return <View style={styles.container}>
        <View style={{alignItems: "flex-start"}}>
            <Text style={{...loginHintsText, marginBottom: 10}}>
                Мэтчи по тегам
            </Text>
            {
                userProfile &&
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToEnd={false}
                            overScrollMode={"never"}>
                    <BulletList data={userProfile.problems}
                                containerStyle={{flexDirection: "row", flexWrap: undefined, marginBottom: 10}}/>
                </ScrollView>
            }

        </View>

        <View style={{flex: 9, alignSelf: "stretch"}}>
            {profiles.length !== 0 && !swipedAll &&
                <Swiper<ProfileData>
                    cards={profiles}
                    cardIndex={index}
                    key={cardLength}
                    containerStyle={{alignItems: "flex-start", justifyContent: "flex-start", padding: 0}}
                    cardStyle={{width: "100%", height: "100%"}}
                    cardVerticalMargin={0}
                    ref={ref}
                    backgroundColor={"#f2f2f2"}
                    cardHorizontalMargin={0}
                    verticalSwipe={false}
                    infinite={true}
                    keyExtractor={(item) => item.uid!}
                    renderCard={(item) => {
                        return (
                            <UserCard name={item.name} problems={item.problems}
                                      hobbies={item.hobbies} desc={item.desc}
                                      birthday={calculateAge(item.birthday!)} photos={item.photos}
                                      checked={userProfile?.problems} defaultMode={"light"}/>
                        )
                    }}
                    onSwipedLeft={(cardIndex) => {
                        handleNope(cardIndex)
                    }}
                    onSwipedRight={(cardIndex) => {
                        handleYup(cardIndex)
                    }}
                    onSwipedAll={() => {
                        setSwipedAll(true)
                        console.log('onSwipedAll')
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    showSecondCard={showBack}
                    overlayLabels={{
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    borderColor: "red",
                                    color: "red",
                                    borderWidth: 1,
                                    fontSize: 24
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 20,
                                    marginLeft: -20
                                }
                            }
                        },
                        right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    borderColor: "green",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "green",
                                    borderWidth: 1,
                                    fontSize: 24
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 20,
                                    marginLeft: 20
                                }
                            }
                        }
                    }}
                    stackSize={2}
                />
            }

        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: 20
    },
    like: {
        position: 'absolute',
        top: Dimensions.get('window').height * 0.8,
        right: 15,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: '#14aa00',
        zIndex: 12,
        padding: 12,
        borderRadius: 30,
    },
    nope: {
        position: 'absolute',
        top: Dimensions.get('window').height * 0.8,
        left: 15,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: '#a53c45',
        zIndex: 12,
        padding: 12,
        borderRadius: 30,
    },
    card: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }

})
