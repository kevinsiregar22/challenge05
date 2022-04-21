import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import 'intl';
import axios from 'axios';
import {colors} from '../../utils';
import 'intl/locale-data/jsonp/en';
import {API} from '../../config/API';
import Share from 'react-native-share';
import React, {useEffect} from 'react';
import {ms} from 'react-native-size-matters';
import {SetBookDetail} from './redux/action';
import Loading from '../../components/Loading';
import Poppins from '../../components/Poppins';
import FastImage from 'react-native-fast-image';
import {BOOKS_API} from '../../helpers/baseAPI';
import {setLoading} from '../../store/globalAction';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

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
      // const res = await axios.get(API.BASE_API.concat('/books/').concat('id'), {
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
    return <Loading />;
  }

  const price = rupiah(bookdetail.price);
  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.cardContainer}>
        <FastImage
          style={styles.images}
          source={{uri: bookdetail.cover_image}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Poppins marginLeft={150} marginTop={-170} textAlign="left">
          {bookdetail.title}
        </Poppins>
        <Poppins marginLeft={80}>author : {bookdetail.author}</Poppins>
        <Poppins marginLeft={90}>publisher : {bookdetail.publisher}</Poppins>
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
        <Poppins type="Bold" size={20} textAlign="left">
          Overview
        </Poppins>

        <Poppins textAlign="justify" marginRight={15}>
          {bookdetail.synopsis}
        </Poppins>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
  },
  backIcon: {
    top: ms(15),
    left: ms(30),
  },
  iconShare: {
    top: ms(-20),
    left: ms(290),
  },
  cardContainer: {
    backgroundColor: colors.cart.color,
    width: ms(365),
    height: ms(180),
    borderRadius: 10,
    marginTop: ms(-10),
    marginLeft: ms(10),
    marginBottom: ms(10),
  },
  images: {
    width: ms(120),
    height: ms(180),
    borderRadius: 10,
    marginLeft: ms(10),
  },

  buyText: {
    backgroundColor: colors.button.background,
    width: ms(120),
    height: ms(60),
    alignItems: 'center',
    borderRadius: ms(10),
    justifyContent: 'center',
  },

  rowContainer: {
    height: ms(80),
    margin: ms(10),
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.cart.color,
  },
});
