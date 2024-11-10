import React from 'react';
import { isInCard, quantityCounter, shortenTitle } from '../helper/function';
import { useDispatch, useSelector } from 'react-redux';
import { add, decrement, Delete, increment, selectProduct, selectShopState } from '../features/shopSlice';
import detailsIcon from "../assets/product_Info_Icon/detailIcon.svg";
import { Link } from 'react-router-dom';
import ProductDetails from './productDetailsPage/ProductDetails';
import ShopCard from './ShopCard/ShopCard';

const ProductCard = ({ data }) => {
    const { image, title, id } = data;
    const dispatch = useDispatch();
    const shopState = useSelector(selectShopState);




    const isInCardProduct = isInCard(shopState, data.id);
    const quantity = quantityCounter(shopState, data.id);


    return (
        <section className='flex flex-col w-[230px] gap-4 text-center py-6 px-4 rounded-xl ' style={{ boxShadow: "rgba(0,0,0,0.1) 0px 2px 14px" }}>
            <p> {shortenTitle(title)} </p>
            <img src={image} alt="" style={{ width: "200px", height: "200px" }} />


            <section className='flex mt-4 justify-center  items-center gap-4'>

                <Link className='p-1' to={`/product/${id}`} >
                    <img className='' src={detailsIcon} alt="" style={{ width: "30px", height: "30px" }} />
                </Link>
               
                
                {
                    quantity === 1 && (<button className='bg-slate-400 border-none p-1 rounded-lg text-white' onClick={() => dispatch(Delete(data))}>delete</button>)
                }
                {
                    quantity > 1 && (<button className='bg-slate-400 border-none p-1 rounded-lg text-white w-[30px] h-[30px]' onClick={() => dispatch(decrement(data))}>-</button>)
                }
                {
                    quantity > 0 && (<div className='bg-slate-300 border-none py-1 px-2 rounded-lg ' >{quantity}</div>)
                }
                {
                    isInCardProduct ? (<button className='bg-slate-400 border-none p-1 rounded-lg text-white w-[30px] h-[30px]' onClick={() => dispatch(increment(data))} >+</button>) :
                        (<button className='bg-slate-400 border-none px-8 py-1 p-1 rounded-lg text-white' onClick={() => dispatch(add(data))}> add </button>)
                }
            </section>
        </section>
    );
};

export default ProductCard;