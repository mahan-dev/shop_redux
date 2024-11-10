import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, checkout, decrement, Delete, increment, selectItemsCounter, selectProduct, selectProductPrice, selectSelectedItems, selectShopState } from '../../features/shopSlice';
import { isInCard, quantityCounter, shortenTitle } from '../../helper/function';
import styles from "../../styles/shopCard.module.css"
const ShopCard = () => {
    const shopState = useSelector(selectShopState);
    const totalPrice = useSelector(selectProductPrice);
    const itemsCounter = useSelector(selectItemsCounter);


    const dispatch = useDispatch();

    return (
        <section className='flex p-6'>
            <section className={`${styles.shoCardContainer} flex w-full gap-4 justify-between`}>


                <section className={` flex w-full h-fit py-2 px-6 rounded-lg flex-col gap-2`} style={{ boxShadow: "rgba(0,0,0,0.1) 0px 2px 14px " }}>
                    {
                        shopState && shopState.selectedItems.map(product => (

                            <section className="flex justify-between gap-2 py-2" key={product.id} >
                                <section className={`${styles.contentImageContainer} flex gap-4`}>

                                    <img className={`${styles.contentImageContainer_image} rounded-lg order-1`} src={product.image} alt="" style={{ width: "100px", height: "100px" }} />



                                    <section className={`${styles.contentTitleButton} flex justify-between flex-col gap-2`}>

                                        <p className='text-right'> {shortenTitle(product.title)} </p>

                                        <section className='flex mb-2 items-center  gap-2'>

                                            {
                                                quantityCounter(shopState, product.id) > 1 &&
                                                <button className=' bg-slate-300 rounded-lg w-[30px] h-[30px]' onClick={() => dispatch(decrement(product))}>-</button>
                                            }
                                            {
                                                quantityCounter(shopState, product.id) === 1 &&
                                                <button onClick={() => dispatch(Delete(product))} className='bg-slate-300 rounded-lg p-1'>delete</button>
                                            }
                                            {quantityCounter(shopState, product.id) > 0 &&
                                                quantityCounter(shopState, product.id)}
                                            {
                                                isInCard(shopState, product.id) ?
                                                    (<button className=' bg-slate-300 rounded-lg  w-[30px] h-[30px]' onClick={() => dispatch(increment(product))}>+</button>) :
                                                    (<button onClick={() => dispatch(add(product))}>Add</button>)
                                            }
                                        </section>
                                    </section>

                                </section>
                                <section className='flex items-end p-2 -order-1'>
                                    {`price:${product.price}$`}
                                </section>

                            </section>

                        ))

                    }
                    {
                        ( !itemsCounter && !shopState.checkout) && (
                            <div className='flex justify-center  h-fit'>this is nothing to show </div>
                        )
                    }
                    {
                        itemsCounter > 0  &&(

                            
                            <button 
                            onClick={()=> dispatch(checkout(shopState))}
                            style={{
                                boxShadow: "rgba(0,0,0,0.1) 0px 2px 14px "
                            }}
                            className={`${styles.checkOut} w-fit p-1 rounded-lg cursor-pointer`}
                            
                            >
                        checkout
                    </button>
                        )
                        }

                    {
                        shopState.checkout && (
                            <div>
                                checkout Successfully
                            </div>
                        )
                    }
                </section>


                <aside className='bg-slate-500 w-[200px] text-white flex flex-col h-fit p-4 rounded-lg -order-1'>


                    <p className='flex'>{`total: ${totalPrice}$`}</p>
                    <p className='flex'>{`products: ${itemsCounter}`}</p>
                    {

                    }

                </aside>
            </section>
        </section>
    );
};

export default ShopCard;