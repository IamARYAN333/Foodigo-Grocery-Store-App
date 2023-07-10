import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,

} from "react-native";
import Carousel from '../../components/Carousel';
import BoxItemCategories from "../../components/BoxItemCategories";
import BoxItemTrendingProduct from "../../components/BoxItemTrending";
import Gap from "../../components/Gap";
import {
    colors,
    fonts,
    IC_Bakery,
    IC_Bakery2,
    IC_Drinks,
    milk,
    mango,
    watermelon,
    kiwi,
    pastry,
    cake,
    laddu,
    IC_Vegetables,
    IL_Cauliflawer_PNG,
    IL_Grapes_PNG,
    IL_Greentea_PNG,
    IL_Tomato_PNG,
} from '../../res';
import VideoCom from '../../components/Video';


const dataTrendingProducts = [
    {
        id: 0,
        title: 'Grapes',
        type: 'fruit',
        icon: IL_Grapes_PNG,
        bgColor: 'rgba(227,206,243,0.5)',
        price: 50,
        description: "Fresh, succulent grapes straight from the vine! These delectable fruits come in a variety of vibrant colors and are bursting with flavor. Our grapes are carefully cultivated and handpicked to ensure the highest quality and taste.",
    },
    {
        id: 1,
        title: 'Milk',
        type: 'Milk',
        icon: milk,
        bgColor: 'rgba(255, 234, 232, 0.5)',
        price: 60,
        description: "Amul Milk stands as a symbol of trust and quality. Each drop of milk undergoes rigorous testing and quality checks to ensure that it meets the highest standards of purity and hygiene. From the moment you open the pack, you can be assured of its freshness and uncompromised quality.",
    },
    {
        id: 2,
        title: 'Drinks',
        type: 'Milk',
        icon: IL_Greentea_PNG,
        bgColor: 'rgba(187, 208, 136, 0.5)',
        price: 60,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: 3,
        title: 'Pastry',
        type: 'Bakery',
        icon: pastry,
        bgColor: 'rgba(140, 250, 145,0.5)',
        price: 20,
        description: "Indulge in the exquisite world of our artisan pastries, a harmonious marriage of delicate flavors, flaky textures, and artistic craftsmanship. Each pastry is a testament to the skill and passion of our pastry chefs, who pour their creativity and expertise into every creation.",
    },
    {
        id:4,
        title: 'Laddu',
        type: 'Sweet',
        icon: laddu,
        bgColor: 'rgba(227,206,243,0.5)',
        price: 220,
        description: "Introducing the mouthwatering delight: Laddu, the irresistible Indian sweet that's sure to captivate your taste buds! Bursting with aromatic flavors and melt-in-your-mouth texture, Laddu is a delicacy that has been cherished for generations.Picture this: a golden sphere of pure bliss, handcrafted with love and infused with the finest ingredients. Each Laddu is meticulously prepared, ensuring an unparalleled taste experience that leaves you craving for more. Its heavenly aroma wafts through the air, beckoning you to indulge in a moment of pure indulgence.",
    },
    {
        id: 5,
        title: 'Cake',
        type: 'Bakery',
        icon: cake,
        bgColor: 'rgba(255, 234, 232, 0.5)',
        price: 200,
        description: "Indulge your senses with our decadent cakes, a delightful fusion of flavors, textures, and artistry that will elevate any occasion or celebration. Crafted with passion and precision, our cakes are a testament to the art of pastry-making, designed to captivate both the eyes and the taste buds.",
    },
    {   
        id: 6,
        title: 'Kiwi',
        type: 'fruit',
        icon: kiwi,
        bgColor: 'rgba(187, 208, 136, 0.5)',
        price: 80,
        description: "Introducing our exquisite kiwis, a taste of tropical paradise! These small, oval-shaped fruits are known for their unique appearance, vibrant green flesh, and delightful tangy-sweet flavor. Grown with precision and care, our kiwis are handpicked at the peak of ripeness to ensure a burst of flavor with every bite",
    },
    {
        id: 7,
        title: 'Mango',
        type: 'fruit',
        icon: mango,
        bgColor: 'rgba(140, 250, 145,0.5)',
        price: 100,
        description: "Introducing our succulent mangoes, the epitome of tropical bliss! These luscious fruits are renowned for their heavenly aroma, vibrant colors, and irresistible sweetness. Handpicked at the perfect moment of ripeness, our mangoes are a tantalizing treat for your senses.",
    },
];
const fruits = require('../../assets/images/healthy-food.png')
const Vegetables = require('../../assets/images/vegetable.png')
const bakery = require('../../assets/images/bakery.png')
const milkproducts = require('../../assets/images/dairy-products.png')
const sweets = require('../../assets/images/ladoo.png');
// const bakery1 = require('../../res/images/Icons/ic_bakery2.png')

// import sweets from './sweets.jpeg';
// import milkproducts from './milk-products.jpg';
// import bakery from './bakery.avif';

class Dashboard extends React.Component {

    render() {
        return (
            <View style={styles.DashboardView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Carousel />
                    <Gap height={15} />
                    <VideoCom />
                    <View style={{ paddingRight: 20 }}>
                        <Text style={styles.titleCategories}>Categories</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.scrollViewCategories}>
                            <BoxItemCategories
                                imageuri={fruits}
                                color="rgba(169, 178, 169, 0.5)"
                                text="Fruits"
                                onPress={() => this.props.navigation.navigate('Categories', 'Fruits')}
                            />
                            <BoxItemCategories
                                imageuri={Vegetables}
                                color="rgba(233, 255, 210, 0.5)"
                                text="Vegetables"
                                onPress={() => this.props.navigation.navigate('Categories', 'Vegetables')}
                            />
                            <BoxItemCategories
                                imageuri={bakery}
                                color="rgba(214, 255, 218, 0.5)"
                                text="Bakery"
                                onPress={() => this.props.navigation.navigate('Categories', 'Bakery')}
                            />
                            <BoxItemCategories
                                imageuri={milkproducts}
                                color="rgba(169, 178, 169, 0.5)"
                                text="Milk Products"
                                onPress={() => this.props.navigation.navigate('Categories', 'Milk Products')}
                            />
                            <BoxItemCategories
                                imageuri={sweets}
                                color="rgba(233, 255, 210, 0.5)"
                                text="Sweets"
                                onPress={() => this.props.navigation.navigate('Categories', 'Sweets')}
                            />

                        </ScrollView>
                    </View>
                    <Gap height={24} />
                    {/* Trending products */}
                    <View>
                        <View style={styles.wrapperHeadTopProducts}>
                            <Text style={styles.tittleTopProducts}>Trending Products</Text>
                        </View>
                        <View style={styles.sectionBoxTopProduct}>
                            {dataTrendingProducts.map((item, index) => {
                                return (
                                    <BoxItemTrendingProduct
                                        key={index}
                                        bgColor={item.bgColor}
                                        icon={item.icon}
                                        text={item.title}
                                        price={item.price}
                                        onPress={() => this.props.navigation.navigate('Detail', { item : item, navigateFrom: 'Dashboard',data: dataTrendingProducts } )}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}
export default Dashboard;

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },

    titleCategories: {
        fontSize: 20,
        fontWeight:"bold",
        fontFamily: fonts.SemiBold,
        color: colors.primary,
        padding: 20,
    },
    scrollViewCategories: {
        paddingLeft: 20,
        // marginRight: 20,
        paddingRight: 20 
    },
    wrapperHeadTopProducts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    tittleTopProducts: {
        color: colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 20,
        fontWeight:"bold",
    },
    textSeeAll: {
        color: colors.black,
        fontFamily: fonts.Medium,
        fontSize: 12,
    },
    sectionBoxTopProduct: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    DashboardView:{
        flex: 1, justifyContent: 'center', alignItems: 'center' 
    }

});

