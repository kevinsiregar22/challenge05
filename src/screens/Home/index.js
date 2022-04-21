import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {ms} from 'react-native-size-matters';
import axios from 'axios';
import {SetRecommendeds} from './redux/action';
import FastImage from 'react-native-fast-image';
import {setLoading} from '../../store/globalAction';
import {BOOKS_API} from '../../helpers/baseAPI';
import Poppins from '../../components/Poppins';
import {navigate} from '../../helpers/navigate';
import {useDispatch, useSelector} from 'react-redux';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  // isConnection
  const {recommendeds} = useSelector(state => state.home);
  const {refreshing, isLoading} = useSelector(state => state.Global);
  const {token, name} = useSelector(state => state.login);

  useEffect(() => {
    recommended();
  }, []);

  const recommended = async () => {
    try {
      dispatch(setLoading(true));
      // dispatch(SetRefreshing(true));
      const res = await axios.get(`${BOOKS_API}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);

      dispatch(SetRecommendeds(res.data.results));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      // dispatch(SetRefreshing(false));
    }
  };

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={ms(120)} />
      </View>
    );
  }

  return (
    <View>
      <Poppins>Selamat Datang, {name}</Poppins>
      <Poppins type="Bold" size={16}>
        Recommended
      </Poppins>
      <FlatList
        keyExtractor={item => item.id}
        data={recommendeds}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigate('DetailBooks', {id: item.id})}>
            <View style={styles.romended}>
              <FastImage
                style={styles.imageRecomen}
                source={{uri: item.cover_image}}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </TouchableOpacity>
        )}
        horizontal={true}
      />
      <Poppins type="Bold" size={16}>
        Popular Book
      </Poppins>
      <FlatList
        keyExtractor={item => item.id}
        numColumns={3}
        data={recommendeds}
        horizontal={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigate('DetailBooks', {id: item.id})}>
            <View style={styles.popular}>
              <FastImage
                style={styles.imagesPopular}
                source={{uri: item.cover_image}}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Poppins>{item.title}</Poppins>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  romended: {
    margin: ms(5),
    left: ms(8),
    backgroundColor: 'white',
    height: ms(240),
    width: ms(110),
    borderRadius: 10,
  },

  imageRecomen: {
    height: ms(180),
    width: ms(110),
    borderRadius: 10,
  },

  popular: {
    width: ms(100),
    height: ms(240),
    marginBottom: ms(20),
    backgroundColor: '#D6EAFF',
    margin: ms(5),
    borderRadius: 10,
    alignItems: 'flex-end',
    left: ms(30),
  },

  text: {
    textAlign: 'center',
    top: ms(20),
  },
  imagesPopular: {
    height: ms(160),
    width: ms(100),
    borderRadius: 10,
  },
});
