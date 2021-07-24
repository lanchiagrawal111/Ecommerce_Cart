


import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar'
import firebase from 'firebase'

class App extends React.Component {

  constructor(){
    super();

    this.state={

       products:[],
       loading :true
    }
    this.db= firebase.firestore();
    
}

componentDidMount(){
  //  firebase
  //   .firestore()
  //   .collection('products')
  //   .get()
  //   .then((snapshot)=>{
  //    snapshot.docs.map((doc)=>{
  //         console.log(snapshot);
  //         console.log(doc.data());
  //     })

  //     // get all products from firebase
  //   const products = snapshot.docs.map((doc)=>{
  //      const data = doc.data();
  //       data['id']=doc.id
  //        return data;
  //   })
  //     // and set state after getting products
  //     this.setState({
  //       products:products,
  //       loading :false
  //     })
  //   })

  firebase
  .firestore()
  .collection('products')
  .orderBy('price','desc')
  // .where('price','==',100)
  // .where('title','==','Watch')
  .onSnapshot((snapshot)=>{
    snapshot.docs.map((doc)=>{
        //  console.log(snapshot);
        //  console.log(doc.data());
     })
 
     // get all products from firebase
   const products = snapshot.docs.map((doc)=>{
      const data = doc.data();
       data['id']=doc.id
        return data;
   })
     // and set state after getting products
     this.setState({
       products:products,
       loading :false
     })
   })
   
}

handleIncreaseQuantity = (product) => {
  
  const { products } =this.state;
  console.log("________________________________________",products);
  const index= products.indexOf(product);
  // this increase qty and call setstate to update it in ui but after refresh qty takes its initila value
  // products[index].qty += 1;

  // this.setState({
  //    products:products
  // })

  // get permanent update in firebase, after refresh data not gone, after update in firebase , onsnapshot fun execute  that will set the state 
  //  and render it in UI

  const docRef = firebase.firestore().collection('products').doc(products[index].id);
  console.log(docRef);
  //after getting docRef update that document

  docRef
  .update({
    qty: products[index].qty+1
  })
  .then(()=>{
    console.log('Product updated successfully');
  })
  .catch((error)=>{
    console.log('error  ',error);
  })
}

handleDecreaseQuantity = (product) =>{
 
 const {products} = this.state;
 const index= products.indexOf(product);
//  if( products[index].qty > 0 ){
//     products[index].qty -=1;
//     this.setState({
//        products:products
//     })
//  }
  
if(products[index].qty > 0){
  const docRef = firebase.firestore().collection('products').doc(products[index].id);
  
  docRef
  .update({
   qty: products[index].qty-1
  })
  .then(()=>{
    console.log('Product updated successfully.........')
  })
  .catch((error)=>{
    console.log('error....',error)
  })
}
}

handleDeleteProduct = (id) => {
  const {products} =this.state;

  // const items= products.filter((item)=> item.id!==id )
  // this.setState({
  //    products:items
  // })

  //delete from firebase

  const docRef = this.db.collection('products').doc(id);

  docRef
  .delete()
  .then(()=>{
    console.log('Deleted Successfully');
  })
  .catch((error)=>{
    console.log('error...',error);
  })
}

 getCartCount = () => {

  const {products} =this.state;
  let count= 0;
  products.map((product)=>{
         count=count+product.qty  
  })
  return count;
 }

 getCartTotal = () => {
   const {products} =this.state;
   let CartTotal=0;
   products.forEach((product)=>{
      CartTotal= CartTotal+ product.qty * product.price;
   })
   return CartTotal;
 }

 addProduct = () => {
    firebase
    .firestore()
    .collection('products')
    .add({
      img : 'https://static7.depositphotos.com/1001877/779/i/600/depositphotos_7798364-stock-photo-closed-washing-machine.jpg',
      title : 'Washing Machine',
      price : 15000,
      qty : 5
    })
    .then((docRef)=>{
       console.log('Product has been added',docRef);
    })
    .catch((error)=>{
      console.log('error  ',error);
    })
 }

  render(){
    const {products,loading} = this.state;
  return (
    <div className="App">
      <Navbar
      count= {this.getCartCount()}
       />
      <button type="button" onClick={this.addProduct} style={{fontSize:20,float:'right',margin:10 ,backgroundColor:'black',color:'whitesmoke' }}  >Add Product </button> 
      <Cart 
       products={products}
      onIncreaseQuantity = { this.handleIncreaseQuantity }
      onDecreaseQuantity = { this.handleDecreaseQuantity }
      onDeleteProduct    = { this.handleDeleteProduct }
       />
       { loading && <h3>Loading Products...</h3> }
       <div style={ { fontSize:20, padding:10}}> PRICE: {this.getCartTotal()}</div>
    </div>
  );
  }
}

export default App;
