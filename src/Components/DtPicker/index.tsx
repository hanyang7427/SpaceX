import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useStyles } from "osmicsx";
import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity,StyleSheet } from "react-native";
import { DtPickMode, DtPickTarget, commonStylesa } from "../../preDefine";
import { parseDate } from "../../util";


type DtPickerProps = {
  setSelectedStartDate?:((newDate:Date) => void) ,
  setSelectedEndDate?:((newData:Date) => void),
  currentDate:Date,
  target:DtPickTarget
};

const DtPicker:React.FC<DtPickerProps> = ({
  setSelectedStartDate,
  setSelectedEndDate,
  currentDate,
  target
}) => {
  const { apply } = useStyles();

  const onChange = (event, selectedDate:Date) => {
    if (event.type === "set") {
      switch (target) {
        case DtPickTarget.START_DT:
          setSelectedStartDate(selectedDate);break
        case DtPickTarget.END_DT:
          setSelectedEndDate(selectedDate);break
      }
    }
  };

  const showMode = (currentMode:DtPickMode) => {
    DateTimePickerAndroid.open({
      value: currentDate ? currentDate : new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode(DtPickMode.DATE);
  };

  const showTimepicker = () => {
    showMode(DtPickMode.TIME);
  };

  return (
    <View>
      <TouchableOpacity style={apply(commonStylesa.fliterButton)} onPress={showDatepicker}>
        <Text style={apply(commonStylesa.textS)}>{currentDate ? parseDate(currentDate) : '空'}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default DtPicker;