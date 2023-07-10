import React from "react";
import { Text,View, ScrollView, StyleSheet } from "react-native";

const AboutApp = () => {
    return (
        <ScrollView>
        <Text style={{alignSelf:"center", fontSize:30,fontWeight:"bold", textDecorationLine:"underline"}}> About Foodigo</Text>
         <Text>    </Text>
        <Text style={{textAlign:"justify", margin:10}}>Introducing Foodigo, your ultimate grocery store app that brings convenience and ease to your shopping experience. With Foodigo, you can explore a wide range of products, order your groceries online, and have them delivered right to your doorstep.</Text>

        <Text style={{textAlign:"justify", margin:10}}> Shop with ease: Foodigo provides a user-friendly interface that allows you to browse through a vast selection of grocery items. From fresh produce and pantry essentials to household products and specialty items, our app has it all. Easily navigate through categories, search for specific items, and add them to your virtual cart with just a few taps. </Text>
        
        <Text style={{textAlign:"justify", margin:10}}> Personalized recommendations: Foodigo understands your preferences and offers personalized recommendations based on your shopping history. Discover new products and promotions tailored to your taste and lifestyle, making your grocery shopping experience more enjoyable and efficient. </Text>
        
        <Text style={{textAlign:"justify", margin:10}}>Seamless ordering and delivery: With Foodigo, placing an order is a breeze. Simply select the items you need, choose your preferred delivery slot, and proceed to checkout. Our reliable delivery partners ensure that your groceries are carefully packed and delivered to your doorstep, saving you time and effort. </Text>
        
         <Text style={{textAlign:"justify", margin:10}}>Savings and deals: Foodigo helps you save money with its exclusive deals, discounts, and loyalty programs. Stay informed about ongoing promotions, compare prices, and make smart choices while shopping. Enjoy the benefits of competitive pricing and special offers, ensuring that you get the best value for your money. </Text>
        
        <Text style={{textAlign:"justify", margin:10}}>Secure and flexible payment options: Foodigo offers a secure and seamless payment process. Choose from various payment options, including credit/debit cards, digital wallets, and cash on delivery. Rest assured that your transactions are safe and protected. </Text>
        
        <Text style={{textAlign:"justify", margin:10}}> Convenience at your fingertips: With Foodigo, you can shop anytime, anywhere. Whether you're at home, work, or on the go, our app ensures that you have access to your favorite groceries at your convenience. Save your favorite items, create shopping lists, and easily reorder your essentials with just a few taps. </Text>
        
        <Text style={{textAlign:"justify", margin:10}}> Stay connected: Foodigo keeps you informed about the latest updates, order status, and exclusive offers through notifications. Get real-time updates on your deliveries and have peace of mind knowing when your groceries will arrive. </Text>
        
        <Text style={{textAlign:"justify", margin:10}}> Foodigo is redefining the way you shop for groceries. Experience the convenience, variety, and savings that our app brings, and make grocery shopping an effortless and enjoyable experience. Coming soon to your device, Foodigo is your go-to grocery store app for all your shopping needs. Stay tuned for an exceptional shopping experience like no other! </Text>
        <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:20}}>THANK YOU</Text>
        </ScrollView>
    )
}


export default AboutApp