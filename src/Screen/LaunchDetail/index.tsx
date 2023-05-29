import React, { useCallback, useState } from 'react';
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useStyles } from "osmicsx";
import { Image } from 'expo-image';
import { RouteProp, useRoute } from '@react-navigation/native';
import { commonStylesa, Launch } from '../../preDefine';
import YoutubePlayer from "react-native-youtube-iframe";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from '../../Navigation/MainStackNavigation';
import { parseISODate } from '../../util';

type LaunchDetailProps = NativeStackScreenProps<MainStackParamList, "LaunchDetail">;

const LaunchDetail: React.FunctionComponent = ({ route, navigation }: LaunchDetailProps) => {
  const { apply } = useStyles();
  const launch = route.params.launch

  const imageUrl = launch.links.flickr.original[0]  // 发射图片地址
  return (
    <View style={{flex:1}}>
      {
        launch.links.youtube_id   // 根据youtube_id是否为空判断显示图片或视频
          ? <YoutubePlayer
              height={230}
              play={false}
              videoId={launch.links.youtube_id}
            />
          : <Image
              style={styles.image}
              source={imageUrl ? imageUrl : require('../../../assets/imagePlaceholder.png')}
              contentFit="cover"
              transition={1000}
            />
      }
      {/* 发射时间 */}
      <Text style={apply(commonStylesa.textS)}>{parseISODate(launch.date_utc)}</Text>
      {/* 发射名称 */}
      <Text style={apply(commonStylesa.textL)}>{launch.name}</Text>
      {/* 详细信息 */}
      <Text style={apply(commonStylesa.textS)}>{launch.details ? launch.details : '没有详细信息'}</Text>
      {/* 返回按钮 */}
      <TouchableOpacity style={apply(commonStylesa.button)} onPress={()=>navigation.goBack()}>
          <Text>返回</Text>
        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  image:{
    width:100,
    height:100
  }
})


export default LaunchDetail;