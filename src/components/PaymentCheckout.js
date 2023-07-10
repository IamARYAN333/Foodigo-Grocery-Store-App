import RazorpayCheckout from 'react-native-razorpay';

  export const makePayment =() => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.dribbble.com/users/3707525/screenshots/6813874/apple-02_4x.jpg',
      currency: 'INR',
      key: 'rzp_test_lC8atUnKom5ALs',
      amount: '5000',
      name: 'Apple',
      prefill: {
        email: 'vinaykumar@gmail.com',
        contact: '8955806560',
        name: 'Vinay kumar'
      },
      theme: {color: '#F37254'}
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

