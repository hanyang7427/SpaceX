import axios from 'axios';
import { useStyles } from 'osmicsx';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ActivityIndicator, View, Text, TextInput, TouchableOpacity,StyleSheet, SafeAreaView } from 'react-native';

import Filter from '../../Components/Filter';
import { LaunchStatus, Launch, commonStylesa } from '../../preDefine';
import { bodyGenerator } from '../../util';
import LaunchItem from '../../Components/LunchItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../Navigation/MainStackNavigation';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ScrollView } from 'react-native-gesture-handler';

type LaunchesProps = NativeStackScreenProps<MainStackParamList, "Launches">;

const Launches = ({ route, navigation }: LaunchesProps) => {
  const { apply } = useStyles();
  const { switchTheme } = useStyles();

  const [lunches, setLunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(2);

  const [searchText,setSearchText] = useState("")
  const [selectedStartDate,setSelectedStartDate] = useState<Date>(null)
  const [selectedEndDate,setSelectedEndDate] = useState<Date>(null)
  const [launchStatus,setLaunchStatus] = useState<LaunchStatus>({launchSucc:true,launchFail:true})
  const [launchOrderDesc,setLaunchOrderDesc] = useState<boolean>(true)


  const flatListRef = useRef(null);

  useEffect(() => {
    fetchLaunches(true);
  }, []);

  const fetchLaunches = async (isNewRequest:boolean) => {
    setLoading(true);
    try {
      const body = bodyGenerator(
        searchText,
        currentPage,
        isNewRequest,
        launchStatus,
        selectedStartDate,
        selectedEndDate,
        launchOrderDesc
      )
      console.log(JSON.stringify(body))
      const response = await axios.post("https://api.spacexdata.com/v5/launches/query",body)
      console.log(JSON.stringify(response.data))
      isNewRequest
        ? setLunches(response.data.docs)
        : setLunches([...lunches,...response.data.docs])
      setCurrentPage(response.data.page)
      setHasNextPage(response.data.hasNextPage)
    } catch (error) {
      console.error('Error fetching lunches:', error);
    }
    setLoading(false);
  };

  const handleEndReached = () => {
    if (!loading && hasNextPage) {
      fetchLaunches(false);
    }
  };

  const handleScrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  const renderFooter = () => {
    return (
      loading
        ? <View style={apply(stylea.loading)}>
            <ActivityIndicator size="small" color="red" />
          </View>
        : <View style={apply(stylea.loading)}>
            <Text>{!hasNextPage ? "没有了" : null}</Text>
          </View>
    );
  }

  const sortLaunches = (order:string):Launch[] => {
    if (order === 'asc') {
      return lunches.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (order === 'desc') {
      return lunches.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  const onApply = () => {
    setLunches([])
    fetchLaunches(true)
  }

  return (
    <SafeAreaView style={apply(stylea.container)}>
      {/* 过滤选项 */}
      <Filter
        currentSearchText={searchText}
        currentStartDt={selectedStartDate}
        currentEndDt={selectedEndDate}
        currentLaunchStatus={launchStatus}
        currentLaunchOrderDesc = {launchOrderDesc}
        setSearchText={setSearchText}
        setSelectedStartDate={setSelectedStartDate}
        setSelectedEndDate={setSelectedEndDate}
        setLaunchStatus={setLaunchStatus}
        setLaunchOrderDesc={setLaunchOrderDesc}
        sortLaunches={sortLaunches}
        setLunches={setLunches}
        navigation={navigation}
      />
      
      {/* 按钮 */}
      <View style={apply(commonStylesa.flexRow)}>
        <TouchableOpacity style={apply(commonStylesa.button)} onPress={onApply}>
          <Text>应用</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={apply(commonStylesa.button,'ml-auto')} onPress={()=>switchTheme('dark')}>
          <Text>dark</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={apply(commonStylesa.button)} onPress={()=>switchTheme('light')}>
          <Text>light</Text>
        </TouchableOpacity>
      </View>
    
      {/* launches列表 */}
      <FlatList
        ref={flatListRef}
        data={lunches}
        keyExtractor={(item,index)=>item.name}
        renderItem={({ item }) => <LaunchItem launch={item} navigation={navigation}/>}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.05}
        ListFooterComponent={renderFooter}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
      />

      {/* 回到顶部按钮 */}
      <TouchableOpacity style={apply(stylea.upArrow)} onPress={handleScrollToTop}>
        <FontAwesomeIcon icon={['fas', 'arrow-up']} size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export const stylea = {
  container:'flex flex-1 dark:bg-gray-400',
  scrollView:'flex flex-1',
  loading:'flex flex-1 row justify-center align-center h-50',
  upArrow:'absolute bottom-10 right-10 rounded-full w-45 h-45 bg-blue-500 bg-opacity-60 justify-center items-center z-200'
}

export default Launches;
