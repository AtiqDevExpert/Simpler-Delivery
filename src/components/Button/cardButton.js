import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const CardButton=({ disabled, text, marginBottom, fontWeight, fontSize, marginHorizontal, backgroundColor, onPress, marginTop, color, elevation, flex, height, width, borderWidth, Icon }) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{ marginBottom: marginBottom, marginHorizontal: marginHorizontal, flex: flex, alignSelf: 'center', backgroundColor: backgroundColor, borderWidth: borderWidth, height: height, width: width, borderRadius: 10, justifyContent: 'center', marginTop: marginTop, elevation: elevation, borderColor: '#4AB5E3' }}>
            <View style={{flexDirection: 'row',justifyContent:'center',alignItems: 'center'}}>
               <Text>{Icon} </Text>
                <Text style={{ color: color, fontSize: fontSize, textAlign: 'center', fontWeight: fontWeight }}> {text}</Text>

            </View>

        </TouchableOpacity>
    )
}


export default CardButton;
