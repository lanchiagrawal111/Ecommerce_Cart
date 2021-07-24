import React from 'react';

const CartItem = ( props ) => {


   
        const  { title, price , qty , img } = props.product;
        const  { product,onIncreaseQuantity,onDecreaseQuantity ,onDeleteProduct  } =  props;

        return(

            <div className="cart-item">
                <div className="left-block">
                    <img  style= { styles.image} alt="" src= {img}/>

                </div>
                <div className="right-block">
                    <div style= {{ fontSize:25 }}> {title} </div>
                    <div style= {{ color: 'lightgray'}}> Price: { price } </div>
                    <div style= {{ color:'lightgray'}}> Qty: {qty} </div>
                    <div className="cart-item-actions">
                        <img alt="increase"
                         className="action-icons" 
                         src="https://image.flaticon.com/icons/png/512/992/992651.png"
                         onClick={ ()=> onIncreaseQuantity(product)} 
                         />
                        <img alt="decrease"
                         className="action-icons" 
                         src="https://image.flaticon.com/icons/png/512/992/992683.png"
                         onClick= { () => onDecreaseQuantity(product)}
                         />
                        <img alt="delete" 
                        className="action-icons"  
                        src="https://image.flaticon.com/icons/png/512/3096/3096673.png"
                        onClick = { ()=> onDeleteProduct(product.id) }
                        />
                    </div>
                </div>
            </div>

        );


    
}
const styles={
    image:{
        height:110,
        width:110,
        borderRadius:4,
        background:'#ccc'
    }
}
export default CartItem;