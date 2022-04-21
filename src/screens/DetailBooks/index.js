import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Poppins from '../../components/Poppins';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';
import Share from 'react-native-share';
import {setLoading} from '../../store/globalAction';
import {SetBookDetail} from './redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {BOOKS_API} from '../../helpers/baseAPI';
import axios from 'axios';

const Index = ({route, navigation}) => {
  const {bookdetail} = useSelector(state => state.bookdetail);
  const {isLoading} = useSelector(state => state.Global);
  const {token} = useSelector(state => state.login);
  const id = route.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    detailBook();
  }, []);

  const rupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const ShareOption = async () => {
    const shareOptions = {
      message: `Title : "${bookdetail.title}"`,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (err) {
      console.log('error: ', err);
    }
  };

  const detailBook = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${BOOKS_API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(SetBookDetail(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={ms(120)} />
      </View>
    );
  }

  const price = rupiah(bookdetail.price);
  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="arrow-back-circle-sharp" size={35} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconShare}
        onPress={ShareOption}
        title="Share">
        <Icon name="ios-share-social-sharp" size={33} color="gray" />
      </TouchableOpacity>

      <View style={styles.cardcontainer}>
        <FastImage
          style={styles.images}
          source={{uri: bookdetail.cover_image}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.text}>Title : {bookdetail.title}</Text>
        <Text style={styles.text}>Author : {bookdetail.author}</Text>
        <Text style={styles.text}>Publisher : {bookdetail.publisher}</Text>
      </View>

      <View style={styles.rowContainer}>
        <View>
          <Poppins type="Bold">Rating</Poppins>
          <Poppins>{bookdetail.average_rating}</Poppins>
        </View>
        <View>
          <Poppins type="Bold">Total Sale</Poppins>
          <Poppins>{bookdetail.total_sale}</Poppins>
        </View>
        <TouchableOpacity style={styles.buyText}>
          <Poppins type="Bold">Buy Rp.{price}</Poppins>
        </TouchableOpacity>
      </View>

      <View>
        <Poppins type="Bold" size={16}>
          Overview
        </Poppins>

        <Poppins>{bookdetail.synopsis}</Poppins>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  cardcontainer: {
    backgroundColor: 'lightblue',
    width: ms(300),
    height: ms(180),
    marginTop: ms(-10),
    marginLeft: ms(25),
    borderRadius: 10,
  },
  images: {
    width: ms(120),
    height: ms(180),
    borderRadius: 10,
    marginLeft: ms(10),
  },
  text: {
    top: ms(-160),
    left: ms(140),
    width: ms(150),
    borderRadius: ms(10),
    justifyContent: 'space-between',
    padding: 6,
    alignContent: 'space-between',
  },
  buyText: {
    backgroundColor: 'lightblue',
    width: ms(120),
    height: ms(50),
    alignItems: 'center',
    borderRadius: ms(10),
    justifyContent: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#1111',
    marginTop: ms(30),
    height: ms(80),
    marginBottom: ms(20),
  },

  backIcon: {
    left: ms(30),
    top: ms(15),
  },
  iconShare: {
    left: ms(290),
    top: ms(-20),
  },
});
