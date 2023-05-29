
import { useStyles } from 'osmicsx';
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Checkbox from 'expo-checkbox';

import DtPicker from '../DtPicker';
import { DtPickTarget, Launch, LaunchStatus, commonStylesa } from '../../preDefine';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../Navigation/MainStackNavigation';

type FilterProps = {
  currentSearchText:string,
  currentStartDt:Date,
  currentEndDt:Date,
  currentLaunchStatus:LaunchStatus,
  currentLaunchOrderDesc:boolean,
  setSearchText: (newSeachText:string) => void,
  setSelectedStartDate:(newDate:Date) => void,
  setSelectedEndDate:(newData:Date) => void,
  setLaunchStatus:(newLunchStatus:LaunchStatus) => void,
  setLaunchOrderDesc:(isLaunchOrder:boolean) => void
  sortLaunches:(order:string) => Launch[],
  setLunches:(newLaunches:Launch[]) => void,
  navigation: NativeStackNavigationProp<MainStackParamList, "Launches">
};


const Filter:React.FC<FilterProps> = ({
  currentSearchText,
  currentStartDt,
  currentEndDt,
  currentLaunchStatus,
  currentLaunchOrderDesc,
  setSearchText,
  setSelectedStartDate,
  setSelectedEndDate,
  setLaunchStatus,
  setLaunchOrderDesc,
  sortLaunches,
  setLunches,
  navigation
}) => {
  const { apply } = useStyles();
  return (
    <View style={apply(stylesa.container)}>
      {/* 发射搜索输入框 */}
      <View>
        <TextInput
          value={currentSearchText}
          onChangeText={(newSearchText)=>setSearchText(newSearchText)}
          placeholder="输入launch名称以搜索"
          style={styles.textInput}
        />
      </View>
      {/* 开始时间选择 */}
      <View style={apply(commonStylesa.flexRow)}>
        <Text style={apply(commonStylesa.textL,'w%35')}>开始时间:</Text>
        <DtPicker
          setSelectedStartDate={setSelectedStartDate}
          target={DtPickTarget.START_DT}
          currentDate={currentStartDt}
        />
      </View>
      {/* 结束时间选择 */}
      <View style={apply(commonStylesa.flexRow)}>
        <Text style={apply(commonStylesa.textL,'w%35')}>结束时间:</Text>
        <DtPicker
          setSelectedEndDate={setSelectedEndDate}
          target={DtPickTarget.END_DT}
          currentDate={currentEndDt}
        />
      </View>
      {/* 是否发射成功选择 */}
      <View style={apply(commonStylesa.flexRow)}>
        <Text style={apply(commonStylesa.textL,'w%35')}>是否发射成功:</Text>
        <TouchableOpacity style={apply(commonStylesa.flexRow)} onPress={()=>setLaunchStatus({...currentLaunchStatus,launchSucc:!currentLaunchStatus.launchSucc})}>
          <Text style={apply(commonStylesa.textS)}>发射成功</Text>
          <Checkbox disabled={true} value={currentLaunchStatus.launchSucc} />
        </TouchableOpacity>
        <View style={{width:20}}></View>
        <TouchableOpacity style={apply(commonStylesa.flexRow)} onPress={()=>setLaunchStatus({...currentLaunchStatus,launchFail:!currentLaunchStatus.launchFail})}>
          <Text style={apply(commonStylesa.textS)}>发射失败</Text>
          <Checkbox disabled={true} value={currentLaunchStatus.launchFail} />
        </TouchableOpacity>
      </View>
      {/* 排序选择 */}
      <View style={apply(commonStylesa.flexRow)}>
        <Text style={apply(commonStylesa.textL,'w%35')}>排序:</Text>
        <TouchableOpacity
          onPress={()=>{
            setLaunchOrderDesc(!currentLaunchOrderDesc)
            setLunches(sortLaunches(currentLaunchOrderDesc ? 'desc' : 'asc'))
          }}
        >
          <Text style={apply(commonStylesa.textS)}>{currentLaunchOrderDesc ? '显示最新' : '显示最老'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stylesa = {
  container:'bg-blue-300 bg-gray-400'
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'lightblue'
  },
  textInput:{
    borderColor:'khaki',
    fontSize:18,
    borderWidth:2
  }
})

export default Filter;
