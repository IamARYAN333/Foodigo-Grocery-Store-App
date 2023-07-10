import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Share
} from 'react-native';
import { connect } from 'react-redux';
import BoxRelatedItems from '../../components/BoxRelatedItem';
import Button from '../../components/Button';
import Gap from '../../components/Gap'
import Header from '../../components/Header';

import {
  colors,
  fonts,
} from '../../res';
import { IC_Share } from '../../res';
import { addToCart, removeFromCart } from '../../store/actions/Action';
import { db } from '../../firebase/firebaseConfig/firebase-config';
import { Rating } from 'react-native-elements';


class Detail extends React.Component {
  // const[totalItem, setTotalItem] = useState(1);
  constructor(props) {
    super(props);
    this.props = props;
    this.state = ({
      fruitsAndVeggies: [],
      dairyAndBakeryProducts: []
    });
  }

  componentDidMount() {
    const dataParams = this.props.route.params.item;
    const listData = this.props.route.params.data;
    const navigateFrom = this.props.route.params.navigateFrom;
    console.log('dataparams', dataParams, 'listdata', listData, navigateFrom)
    if (navigateFrom === 'Categories1' || navigateFrom === 'Details1' || navigateFrom === 'Dashboard') {
      console.log('listData.filter(item => item.id !== dataParams.id)', listData.filter(item => item.id !== dataParams.id))
      this.setState({
        fruitsAndVeggies: listData.filter(item => item.id !== dataParams.id)
      })
    } else if (navigateFrom === 'Categories2' || navigateFrom === 'Details2') {
      this.setState({
        dairyAndBakeryProducts: listData.filter(item => item.id !== dataParams.id)
      })
    }
    //  else if(navigateFrom === Dashboard)
    // db.ref("FruitsAndVeggies")
    //   .once("value")
    //   .then((item) => {
    //     let data = [];
    //     item.forEach((childSnapshot) => {
    //       data.push(childSnapshot.val());
    //     });
    //     this.setState({ fruitsAndVeggies: data });
    //   })

    // db.ref("DairyAndBakeryProducts")
    //   .once("value")
    //   .then((item) => {
    //     let dairyData = [];
    //     item.forEach((childSnapshot) => {
    //       dairyData.push(childSnapshot.val());
    //     });
    //     this.setState({ dairyAndBakeryProducts: dairyData });
    //   })

  }


  render() {

    const dataParams = this.props.route.params.item;

    const bgColor = this.props.route.params.bgColor;



    const addProductToCart = (product) => {
      this.props.dispatchAddToFav(product);
    }

    const shareMessage = () => {
      const shareMessage = 'Product : ' + dataParams.title + ', Price : ' + dataParams.price + '/kg';
      Share.share({
        message: shareMessage.toString(),
      })
    }
    console.log('Data in the details Screen',this.state.fruitsAndVeggies)

    return (
    
      <SafeAreaView style={styles.flex1(bgColor)} >
        {/* Scrollview */}

        <ScrollView>
          <Header onPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />
          <View style={styles.wrapperImg}>
            {!dataParams.image ? <Image source={dataParams.icon} style={styles.image} /> : <Image source={{ uri: dataParams.image }} style={styles.image} />}
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.wrapperTopContent}>
              <View style={styles.rowTopContent}>
                <Text style={styles.name}>{dataParams.title}</Text>
                <View style={styles.star}>
                  <Rating />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    shareMessage();
                  }}
                >
                  <Image style={styles.shareIcon} source={IC_Share} />
                </TouchableOpacity>
              </View>
              <Text style={styles.price}>{dataParams.price} / kg</Text>
            </View>
            {/* <ScrollView style={styles.descScrollable} showsVerticalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }} > */}
              <Text style={styles.desc}>{dataParams.description}</Text>
            {/* </ScrollView> */}
            <View style={styles.wrapperRelatedItems}>
              <Text style={styles.titleRelatedItems}>Related Items</Text>
                <View style={styles.wrapperBoxRelatedItems}>
                  {(dataParams.type == 'vegetable' || dataParams.type == 'fruit') ?
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={this.state.fruitsAndVeggies}
                      extraData={this.state}
                      renderItem={({ item,index }) => <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                          this.props.navigation.navigate('Detail', { item: item, navigateFrom: 'Detail1', data: this.state.fruitsAndVeggies })
                        }}
                      >
                        <BoxRelatedItems
                          key={index}
                          image={item.icon}
                          name={item.title}
                          price={item.price}
                          bgColor={item.bgColor}
                          item={item}
                        />
                      </TouchableOpacity>}
                      keyExtractor={item => item.id}
                    /> :
                    <FlatList
                      data={this.state.dairyAndBakeryProducts}
                      extraData={this.state}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item,index }) => <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Detail', { item: item, navigateFrom: 'Detail2', data: this.state.dairyAndBakeryProducts })
                        }}
                      >
                        <BoxRelatedItems
                          key={index}
                          image={item.icon}
                          name={item.title}
                          price={item.price}
                          bgColor={item.bgColor}
                          item={item}
                        />
                      </TouchableOpacity>}
                      keyExtractor={item => item.id}
                    />
                  }
                </View>
            </View>
            {/* button add to cart */}
            <Gap height={30} />
            <Image style={{ height: 500, width: '100%', marginBottom: 10 }} source={require('../../assets/images/review.png')} resizeMode={'contain'}/> 
            <Button
              onPress={() => addProductToCart(dataParams)}
              text="Add to cart" />
          </ScrollView>

        </ScrollView>
      </SafeAreaView >
    );
  }
};

const styles = StyleSheet.create({
  flex1: bgColor => ({
    flex: 1,
    backgroundColor: bgColor,
  }),

  shareIcon: {
    height: 30,
    width: 30
  },
  wrapperImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descScrollable: {
    height: 50,
    width: '100%',
    flex: 1
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 20
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 30,
    paddingTop: 34,
  },
  wrapperTopContent: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  rowTopContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fonts.SemiBold,
    fontSize: 20,
  },
  price: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.black,
  },
  desc: {
    paddingHorizontal: 20,
  },
  wrapperRelatedItems: {
    marginTop: 25,
  },
  titleRelatedItems: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: colors.primary,
    paddingHorizontal: 20,
  },
  wrapperBoxRelatedItems: {
    // flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
    // borderWidth:1,
    // height: 100,
  },
});

const mapDispatchToProps = {
  dispatchAddToFav: product => addToCart(product),
  dispatchRemoveFromFav: product => removeFromCart(product)
}

const mapStateToProps = state => ({
  productCart: state.CartReducer.productCart,
})

// export default connect(mapStateToProps, mapDispatchToProps)(Detail);
export default connect(mapStateToProps, mapDispatchToProps)(Detail)

