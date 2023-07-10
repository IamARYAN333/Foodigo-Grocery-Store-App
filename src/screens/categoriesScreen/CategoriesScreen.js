import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BoxItemCategoryTiles from "../../components/BoxItemCategoryTiles";
import Gap from "../../components/Gap";
import Header from '../../components/Header';
import {
  colors,
  fonts,
  IC_Bakery,
  IC_Bakery2,
  IC_Drinks,
  IC_Vegetables,
  IL_Cauliflawer_PNG,
  IL_Grapes_PNG,
  IL_Greentea_PNG,
  IL_Tomato_PNG,
  banana,
  kiwi,
  mango,
  muskmelon,
  papaya,
  watermelon,
  Guava,
  brinjal,
  potato,
  carrot,
  raddish,
  onion,
  capsicum,
  cake,
  pastry,
  patties,
  bread,
  muffins,
  cookies,
  creamroll,
  doughnuts,
  milk,
  Dahi,
  buttermilk,
  cheese,
  cream,
  icecream,
  yoghurt,
  butter,
  laddu,
  rasgulla,
  raskadam,
  jalebi,
  gulabjamun,
  rasmalai,
  barfi,
  rajbhog,
} from '../../res';
import VideoCom from '../../components/Video';
import { db } from "../../firebase/firebaseConfig/firebase-config";
import { v4 as uuid } from 'uuid';

const fruitsList = [{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Grapes',
  icon: IL_Grapes_PNG,
  type: 'fruit',
  bgColor: 'rgba(227,206,243,0.5)',
  price: 50,
  description: "Fresh, succulent grapes straight from the vine! These delectable fruits come in a variety of vibrant colors and are bursting with flavor. Our grapes are carefully cultivated and handpicked to ensure the highest quality and taste.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Banana',
  icon:   banana, 
  type: 'fruit',
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 30,
  description: "Each banana is hand-selected for its exceptional quality, ensuring a consistent taste and texture. When you peel back the skin, you'll reveal the soft, velvety flesh that practically melts in your mouth. The sweet, tropical flavor of our bananas is a true delight for the taste buds, making them a favorite choice for people of all ages.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Kiwi',
  type: 'fruit',
  icon: kiwi,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 80,
  description: "Introducing our exquisite kiwis, a taste of tropical paradise! These small, oval-shaped fruits are known for their unique appearance, vibrant green flesh, and delightful tangy-sweet flavor. Grown with precision and care, our kiwis are handpicked at the peak of ripeness to ensure a burst of flavor with every bite",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Mango',
  type: 'fruit',
  icon: mango,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 100,
  description: "Introducing our succulent mangoes, the epitome of tropical bliss! These luscious fruits are renowned for their heavenly aroma, vibrant colors, and irresistible sweetness. Handpicked at the perfect moment of ripeness, our mangoes are a tantalizing treat for your senses.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Watermelon',
  type: 'fruit',
  icon: watermelon,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 50,
  description: "Introducing our refreshing watermelons, the epitome of summertime delight! These juicy fruits are synonymous with sunshine, picnics, and pure refreshment. Grown with care and picked at the perfect ripeness, our watermelons are a true testament to nature's sweetness.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Musk melon',
  type: 'fruit',
  icon: muskmelon,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 60,
  description: "Introducing our exquisite musk melons, a true delight for the senses! These aromatic fruits, also known as cantaloupes, are a celebration of sweetness and juiciness. Grown with meticulous care and harvested at the peak of perfection, our musk melons offer a taste experience that is unparalleled.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Papaya',
  type: 'fruit',
  icon: papaya,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 40,
  description: "Papayas are not only a delight for your taste buds but also a nutritional powerhouse. They are packed with essential vitamins, including vitamin C and vitamin A, as well as dietary fiber and antioxidants. Incorporating papayas into your diet can support immune health, aid digestion, and promote healthy skin.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Guava',
  type: 'fruit',
  icon: Guava,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 50,
  description: "Introducing our exquisite guavas, a tropical treasure for your taste buds! These small, round or pear-shaped fruits are renowned for their intoxicating aroma, vibrant colors, and unique flavor. Grown with care and handpicked at peak ripeness, our guavas offer a taste experience that is both delightful and refreshing.",
}
]

const vegetableList = [{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Potato',
  type: 'vegetable',
  icon: potato,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 30,
  description: "Introducing our versatile and delicious potatoes, a kitchen staple that's always in high demand! These humble tubers have been a culinary favorite for centuries, loved for their comforting taste and endless possibilities. Grown with care and harvested at the peak of maturity, our potatoes offer exceptional flavor and texture.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Tomato',
  type: 'vegetable',
  icon: IL_Tomato_PNG,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 40,
  description: "Introducing our succulent tomatoes, the epitome of garden-fresh goodness! These vibrant and versatile fruits are a staple in countless cuisines, loved for their rich flavor and juicy texture. Grown with care and handpicked at the peak of ripeness, our tomatoes are a true testament to nature's bountiful offerings.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Brinjal',
  type: 'vegetable',
  icon: brinjal,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 40,
  description: "Introducing our exquisite brinjals, also known as eggplants, a vegetable that's both versatile and delicious! These glossy, deep purple beauties are a culinary delight, loved for their rich flavor and smooth texture. Grown with care and harvested at the perfect maturity, our brinjals are a true testament to the wonders of nature.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Cauliflower',
  type: 'vegetable',
  icon: IL_Cauliflawer_PNG,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 50,
  description: "Introducing our exquisite cauliflowers, a versatile and nutritious vegetable that's as beautiful as it is delicious! These compact and pristine white heads are a true delight for the senses, loved for their mild flavor and delicate texture. Grown with care and harvested at the peak of perfection, our cauliflowers are a testament to nature's bounty.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Capsicum',
  type: 'vegetable',
  icon: capsicum,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 20,
  description: "The exterior of our capsicums showcases their vibrant colors, making them visually appealing and a delightful addition to any plate. Each bell pepper has a crisp and glossy skin, adding to its freshness and appeal. Cut open a capsicum, and you'll discover its thick, juicy flesh and the crunchy, seed-filled core.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Onion',
  type: 'vegetable',
  icon: onion,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 20,
  description: "Introducing our aromatic and versatile onions, a kitchen staple that adds depth and flavor to your culinary creations! These bulbous vegetables are renowned for their distinctive pungent aroma and savory taste. Grown with care and harvested at the perfect maturity, our onions are a true testament to nature's bounty.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Carrot',
  type: 'vegetable',
  icon: carrot,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 100,
  description: "Introducing our vibrant and nutritious carrots, a versatile root vegetable that's as delicious as it is eye-catching! These elongated beauties come in various shades of orange, with a crisp texture and a subtly sweet flavor. Grown with care and harvested at the peak of freshness, our carrots are a true testament to nature's bounty.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Raddish',
  type: 'vegetable',
  icon: raddish,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 80,
  description: "Introducing our crisp and flavorful radishes, a versatile root vegetable that adds a delightful crunch and a touch of spice to your culinary adventures! These vibrant orbs come in various colors, including red, pink, white, and even black. Grown with care and harvested at the peak of freshness, our radishes are a true testament to nature's bounty.",
}
]


const bakeryList = [{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Bread',
  type: 'Bakery',
  icon: bread,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 30,
  description: "Introducing our freshly baked bread, a staple that embodies comfort, nourishment, and the art of artisanal baking. Our bread is crafted with care, using the finest ingredients and traditional techniques, resulting in a product that delights the senses and satisfies the soul.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Cake',
  type: 'Bakery',
  icon: cake,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 200,
  description: "Indulge your senses with our decadent cakes, a delightful fusion of flavors, textures, and artistry that will elevate any occasion or celebration. Crafted with passion and precision, our cakes are a testament to the art of pastry-making, designed to captivate both the eyes and the taste buds.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Muffins',
  type: 'Bakery',
  icon: muffins,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 30,
  description: "As you set your eyes upon our muffins, you'll be enticed by their enticing appearance. Each muffin is perfectly domed, with a golden-brown crust that promises a tender and moist interior. Whether adorned with a sprinkle of sugar, a drizzle of glaze, or a scattering of tempting toppings, our muffins are a visual delight that beckons you to take a bite.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Pastry',
  type: 'Bakery',
  icon: pastry,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 20,
  description: "Indulge in the exquisite world of our artisan pastries, a harmonious marriage of delicate flavors, flaky textures, and artistic craftsmanship. Each pastry is a testament to the skill and passion of our pastry chefs, who pour their creativity and expertise into every creation.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Cookies',
  type: 'Bakery',
  icon: cookies,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 40,
  description: "At first glance, our cookies entice you with their golden-brown edges, delicate crinkles, and enticing aroma. Each cookie is perfectly shaped, whether it's a classic round, a charming heart, or a whimsical shape that sparks imagination. Their inviting appearance is just the beginning of the sensory experience they offer.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Doughnuts',
  type: 'Bakery',
  icon: doughnuts,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 50,
  description: "The moment you lay your eyes on our doughnuts, you'll be captivated by their irresistible appearance. Each doughnut is perfectly formed, with a golden-brown exterior that tempts you with its slightly crisp surface. From classic glazed to vibrant sprinkles, each doughnut is adorned with a mouthwatering array of toppings that make them visually irresistible.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Cream Roll',
  type: 'Bakery',
  icon: creamroll,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 20,
  description: "Introducing our heavenly cream rolls, a divine combination of delicate pastry and luscious cream that will transport your taste buds to dessert paradise. Our cream rolls are meticulously crafted with the utmost care, ensuring a luxurious treat that will leave you craving for more.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Patties',
  type: 'Bakery',
  icon: patties,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 20,
  description: "Welcome to a world of savory delight with our irresistible patties. Each bite is a mouthwatering combination of flavorful fillings enclosed in a golden, flaky crust, promising a satisfying culinary experience that will keep you coming back for more",
}
]


const milkProductsList = [{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Milk',
  type: 'Milk',
  icon: milk,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 60,
  description: "Amul Milk stands as a symbol of trust and quality. Each drop of milk undergoes rigorous testing and quality checks to ensure that it meets the highest standards of purity and hygiene. From the moment you open the pack, you can be assured of its freshness and uncompromised quality.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Dahi',
  type: 'Milk',
  icon: Dahi,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 80,
  description: "Amul Dahi is a versatile addition to your kitchen, perfect for enjoying on its own, using as a dip, or incorporating into a variety of recipes. Its smooth and velvety texture provides a satisfying mouthfeel, while the tangy and refreshing taste enlivens your palate.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Butter',
  type: 'Milk',
  icon: butter,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 80,
  description: "Amul Butter stands as a symbol of trust and tradition. With its irresistible creamy texture and rich flavor, it adds a touch of luxury to every meal and recipe. Spread it on warm toast, melt it over steaming vegetables, or use it to make decadent sauces and baked goods – Amul Butter enhances the taste of any dish it graces.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Buttermilk',
  type: 'Milk',
  icon: buttermilk,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 20,
  description: "Introducing Amul Buttermilk, a refreshing and invigorating beverage that is a perfect companion for hot summer days or any time you need a revitalizing drink. Made from the finest curd and blended with a touch of traditional spices, Amul Buttermilk offers a delightful combination of taste, nutrition, and hydration."
  // customeReview: 
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Cheese',
  type: 'Milk',
  icon: cheese,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 100,
  description: "Amul Cheese is known for its exceptional taste and superior quality. From its creamy and melt-in-your-mouth varieties to the sharp and tangy options, there is a cheese to suit every palate. Whether you're looking for a cheese to enjoy on its own, melt over your favorite dishes, or add a delightful twist to your recipes, Amul Cheese delivers unparalleled satisfaction.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Ice Cream',
  type: 'Milk',
  icon: icecream,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 70,
  description: "Amul Ice Cream is known for its exceptional taste and quality. Each scoop is a heavenly combination of rich and creamy textures, along with a burst of delightful flavors. Whether you crave the classic indulgence of chocolate and vanilla or desire the exotic essence of fruity delights, Amul Ice Cream has something to satisfy every craving.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Yoghurt',
  type: 'Milk',
  icon: yoghurt,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 120,
  description: "Amul Yogurt is known for its exceptional taste and superior quality. With its velvety texture and tangy flavor, it provides a delightful sensory experience with every spoonful. Each bite of Amul Yogurt is a testament to our commitment to providing you with the best in taste and satisfaction.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Cream',
  type: 'Milk',
  icon: cream,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 150,
  description: "Amul Cream is known for its exceptional taste and superior quality. With its creamy texture and heavenly flavor, it elevates the taste and texture of a wide range of culinary delights. Whether you're looking to create creamy curries, delectable sauces, luscious desserts, or simply enhance the flavor of your beverages, Amul Cream is the perfect choice.",
}
]


const sweetsList = [{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Laddu',
  type: 'Sweet',
  icon: laddu,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 220,
  description: `Laddu or laddoo is a spherical sweet from the Indian subcontinent made of various ingredients and sugar syrup or jaggery. It has been described as "perhaps the most universal and ancient of Indian sweets.".`,
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Rasgulla',
  type: 'Sweet',
  icon: rasgulla,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 300,
  description: "Rasgulla is a syrupy dessert popular in the eastern part of South Asia. It is made from ball-shaped dumplings of chhena and semolina dough, cooked in light sugar syrup made of sugar. This is done until the syrup permeates the dumplings.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Roshkodom',
  type: 'Sweet',
  icon: raskadam,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 500,
  description: "Roshkodom is a sweet of Malda. Popular in West Bengal and other East Indian states and Bangladesh. It consists of a small ball of Rasgulla covered in a layer of khoya/mava which is further covered on the outer surface by poppy seeds",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Jalebi',
  type: 'Sweet',
  icon: jalebi,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 150,
  description: "Jalebi is one of the most popular desserts in India and is enjoyed equally across Indian states. This crispy and crunchy dessert is dipped in sugar syrup and is loaded with flavours.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Gulab Jamun',
  type: 'Sweet',
  icon: gulabjamun,
  bgColor: 'rgba(227,206,243,0.5)',
  price: 250,
  description: "Gulab jamun (also spelled gulaab jamun; lit. 'Rose water berry' or 'Rose berry') is a sweet confectionery or dessert, originating in the Indian subcontinent and a type of mithai popular in India, Pakistan, Nepal, the Maldives (where it is known as gulab ki janu), and Bangladesh, as well as Myanmar",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Rasmalai',
  type: 'Sweet',
  icon: rasmalai,
  bgColor: 'rgba(255, 234, 232, 0.5)',
  price: 300,
  description: "Ras malai, originally known as rosomalai, or roshmalai, is a dessert from the Indian subcontinent. The dessert is called roshmalai/rosmalai in Bengali, ras malai in Hindi, and rasa malei in Odia.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Barfi',
  type: 'Sweet',
  icon: barfi,
  bgColor: 'rgba(187, 208, 136, 0.5)',
  price: 250,
  description: "A classical milk-based fudge or dessert recipe made with evaporated milk solids and milk powder. It is a perfect dessert sweet snack for the festival season and can be easily shared with friends and family. Generally, milk-based barfi is made by just evaporating full cream milk, but to hasten the cooking process I have used milk powder which should add more texture to the sweetness.",
},
{
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  title: 'Rajbhog',
  type: 'Sweet',
  icon: rajbhog,
  bgColor: 'rgba(140, 250, 145,0.5)',
  price: 350,
  description: "Rajbhog is a popular Bengali sweet, similar to Rasgulla. Rajbhog is made during festivals and celebrations time. Rajbhog is made with soft fresh paneer, saffron and stuffed with mix dry fruit, these are soaked in a sugar syrup and served chilled or at room temperature.",
}
]

class Categories extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({
      fruitsAndVeggies: [],
      dairyAndBakeryProducts: []
    });
  }

  componentDidMount() {
    const _categoryTitle = this.props.route.params
    switch (_categoryTitle) {
      case 'Fruits': this.setState({ fruitsAndVeggies: fruitsList })
        break;
      case 'Vegetables': this.setState({ fruitsAndVeggies: vegetableList })
        break;
      case 'Bakery': this.setState({ dairyAndBakeryProducts: bakeryList })
        break;
      case 'Milk Products': this.setState({ dairyAndBakeryProducts: milkProductsList })
        break
      case 'Sweets': this.setState({ dairyAndBakeryProducts: sweetsList })
        break;
    }
  }

  // componentDidMount() {
  //   db.ref("FruitsAndVeggies")
  //     .once("value")
  //     .then((item) => {
  //       let data = [];
  //       item.forEach((childSnapshot) => {
  //         data.push(childSnapshot.val());
  //       });
  //       this.setState({ fruitsAndVeggies: data });
  //     })

  //   db.ref("DairyAndBakeryProducts")
  //     .once("value")
  //     .then((item) => {
  //       let dairyData = [];
  //       item.forEach((childSnapshot) => {
  //         dairyData.push(childSnapshot.val());
  //       });
  //       this.setState({ dairyAndBakeryProducts: dairyData });
  //     })

  // }
  render() {
    return (
      <SafeAreaView style={styles.flex1} >

        <View style={styles.flex1}>
          <Header back cart onPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />

          <View style={styles.wrapperTittle}>
            <Text style={styles.tittle}>{this.props.route.params}</Text>
          </View>

          <Gap height={10} />

          {/* Content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.sectionBoxTopProduct}>
              {(this.props.route.params == 'Fruits' || this.props.route.params == 'Vegetables') ?
                this.state.fruitsAndVeggies.map((item, index) => {
                  return (
                    <BoxItemCategoryTiles
                      key={index}
                      bgColor={item.bgColor}
                      icon={item.icon}
                      // customerReview={item.customerReview}
                      text={item.title}
                      price={item.price}
                      onPress={() => this.props.navigation.navigate('Detail', { item: item, navigateFrom: 'Categories1', data: this.state.fruitsAndVeggies })}
                    />
                  );
                })
                :
                this.state.dairyAndBakeryProducts.map((item, index) => {
                  return (
                    <BoxItemCategoryTiles
                      key={index}
                      bgColor={item.bgColor}
                      icon={item.icon}
                      // customerReview={item.customerReview}
                      text={item.title}
                      price={item.price}
                      onPress={() => this.props.navigation.navigate('Detail', { item: item, navigateFrom: 'Categories2', data: this.state.dairyAndBakeryProducts })}
                    />
                  );
                })

              }
            </View>
          </ScrollView>

        </View>
      </SafeAreaView>
    );
  }
};

export default Categories;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  wrapperTittle: {
    paddingHorizontal: 20,
  },
  tittle: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  sectionBoxTopProduct: {
    flex1: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});