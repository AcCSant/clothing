import './product-card.styles.scss';
import Button from '../button/button.component'

//here you have to pass the product data, with the name, id and price
const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    //destructurig off what is needed    

    return (   <div className='product-card-container'>
    <img src={imageUrl} alt={`${name}`}/>
    <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
    </div>
    <Button buttonType='inverted'>Add to card</Button>
    </div> );
};

export default ProductCard;