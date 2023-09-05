import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useState} from "react";
import {SvgXml} from "react-native-svg";
import * as SliderAssets from "../../assets/sliderAssets"
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useDispatch} from "react-redux";
import {addAgeRange} from "../../redux/action-creators/ProfileActionCreators";

export default function AgeRangeScreen() {

    const Thumb = () => <SvgXml style={{flex: 1}} xml={SliderAssets.thumb}/>
    const [
        sliderValue,
        setSliderValue,
    ] = useState([18, 99]);
    const dispatch = useDispatch()


    return <View style={styles.container}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{...loginHintsText}}>Важен ли тебе возраст?</Text>
        </View>
        <View style={{flex: 8, alignItems: "center", justifyContent: "center"}}>
            <View style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                alignSelf: "stretch",
            }}>
                <Text style={{...loginHintsText, marginBottom: 0}}>Возраст</Text>
                <Text style={{color: "grey", fontWeight: "500"}}>{sliderValue[0]}-{sliderValue[1]}</Text>
            </View>
            <MultiSlider
                values={[
                    sliderValue[0],
                    sliderValue[1]
                ]}
                selectedStyle={{backgroundColor: "black"}}
                onValuesChange={(values) => setSliderValue(values)}
                min={18}
                max={99}
                step={1}
                customMarker={Thumb}
            />
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            <ButtonActive text={"Далее"} onClick={() => {
                dispatch(addAgeRange(sliderValue[0], sliderValue[1]))
            }}/>
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
})