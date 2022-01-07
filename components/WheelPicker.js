import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker'

var PickerItem = Picker.Item;

const WheelPicker = ({ pages, currentProgress, pickerRef, parentCallback }) => {

    // State the determines where the wheelpicker starts
    const [selectedItem, setSelectedItem] = useState(currentProgress);

    // Loops over pages, which are passed down as prop, push it to pageSet, which is subsequently set to the itemList, which determines
    //how many pages there should be
    const pageSet = [];
    for (let i = 1; i <= pages; i++) {
        pageSet.push(i.toString())
    }

    const [itemList, setItemList] = useState(pageSet);

    // Associates the pickerRef (sent from ProgressScreen) with the updateWheel function.
    // When we call pickerRef.current from ProgressScreen, we are actually calling updateWheel
    pickerRef.current = updateWheel;
    function updateWheel() {
        setSelectedItem(currentProgress);
        setItemList(pageSet);
        parentCallback(selectedItem);
    }

    return (
        <View>
            <Text>
                <Picker style={{ width: 150, height: 180 }}
                    // I might need to custumize this - but lets see what Jonas finds
                    lineColor="#000000" //to set top and bottom lissdssdsdne color (Without gradients)
                    lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
                    lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
                    selectedValue={selectedItem}
                    itemStyle={{ color: "white", fontSize: 26 }}
                    onValueChange={(index) => setSelectedItem(index)}>
                    {itemList.map((value, i) => (
                        <PickerItem label={value} value={i} key={i} />
                    ))}
                </Picker>
            </Text>
        </View>
    );
};

export default WheelPicker;