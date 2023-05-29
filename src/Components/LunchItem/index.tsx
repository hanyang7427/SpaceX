import axios from 'axios';
import { useStyles } from 'osmicsx';
import { FlatList, ActivityIndicator, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LaunchStatus, Launch, commonStylesa } from '../../preDefine';
import { bodyGenerator, parseISODate } from '../../util';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../Navigation/MainStackNavigation';


type LaunchItemProps = {
  launch:Launch,
  navigation: NativeStackNavigationProp<MainStackParamList, "Launches">
};

const LaunchItem:React.FC<LaunchItemProps> = ({
  launch,
  navigation
}) => {
  const { apply } = useStyles();
  const imageUrl = launch.links.flickr.original[0]    // 图片地址
  return (
    <View>
      {/* 发射图片 */}
      <Image
        style={{height:200,width:"100%"}}
        source={imageUrl ? imageUrl : require('../../../assets/imagePlaceholder.png')}
        contentFit="cover"
        transition={1000}
      />
      {/* 发射时间 */}
      <Text style={apply(commonStylesa.textS)}>{parseISODate(launch.date_utc)}</Text>
      {/* 发射名称 */}
      <Text style={apply(commonStylesa.textM)}>{launch.name}</Text>
      {/* 查看详情按钮 */}
      <TouchableOpacity
        style={apply(commonStylesa.button,"self-center")} 
        onPress={ ()=>navigation.navigate('LaunchDetail',{launch:launch}) }
      >
        <Text>查看详情</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LaunchItem;
