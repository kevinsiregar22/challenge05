import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import axios from 'axios';
import {colors} from '../../utils';
import {API} from '../../config/API';
import React, {useEffect} from 'react';
import {SetRecommend} from './redux/action';
import {ms} from 'react-native-size-matters';
import Loading from '../../components/Loading';
import Poppins from '../../components/Poppins';
import FastImage from 'react-native-fast-image';
import {navigate} from '../../helpers/navigate';
import {setLoading} from '../../store/globalAction';
import {useDispatch, useSelector} from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();

  const {recommend} = useSelector(state => state.home);
  const {isLoading} = useSelector(state => state.Global);
  const {token, name} = useSelector(state => state.login);

  useEffect(() => {
    recommended();
  }, []);

  const recommended = async () => {
    try {
      dispatch(setLoading(true));

      const res = await axios.get(API.BASE_API.concat('/books'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      console.log(res.data.results, 'result');
      dispatch(SetRecommend(res.data.results));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Poppins textAlign="left" marginBottom={5} marginTop={4}>
        Selamat Datang, {name}
      </Poppins>
      <Poppins type="Bold" size={20} textAlign="left">
        Recommenhded
      </Poppins>
      <FlatList
        keyExtractor={item => item.id}
        data={recommend}
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
      <Poppins type="Bold" size={30} textAlign="left">
        Popular Book
      </Poppins>
      <FlatList
        keyExtractor={item => item.id}
        numColumns={3}
        data={recommend}
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
              <Poppins textAlign="left" marginLeft={2}>
                {item.title}
              </Poppins>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
  },

  romended: {
    left: ms(8),
    margin: ms(5),
    width: ms(130),
    height: ms(320),
    borderRadius: 10,
  },

  imageRecomen: {
    width: ms(130),
    height: ms(180),
    borderRadius: 10,
  },

  popular: {
    left: 10,
    margin: 5,
    width: ms(115),
    height: ms(240),
    borderRadius: 10,
    marginBottom: ms(20),
    backgroundColor: colors.cart.color,
  },

  imagesPopular: {
    width: ms(115),
    height: ms(160),
    borderRadius: 10,
    justifyContent: 'space-between',
  },
});
