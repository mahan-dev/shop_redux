import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { increment, decrement, selectNumber, selectShopState, selectProduct, fetchProduct, selectItemsCounter } from '../features/shopSlice';
import ProductCard from './ProductCard';
import Header from './Header/Header';
import ShopCard from './ShopCard/ShopCard';
import styles from "../styles/home.module.css";
import filterIcon from "../assets/homeIcon/filter-list.svg";
import closeIcon from '../assets/homeIcon/xmark.svg';
const Home = () => {

    const [activeList, setActiveList] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector(selectProduct);
    const [search, setSearch] = useState(["all"]);



    const productsToRender = search.includes("all") ?
        products : products.filter(item => search.includes(item.category));
    console.log(productsToRender)



    useEffect(() => {
        dispatch(fetchProduct())
    }, [])



    return (
        <section className={`${styles.homeWrapper} w-full my-6 flex flex-col gap-6 justify-center  px-6`}>
            <Header />
            <section className='flex gap-4 justify-end'>



                <section className='flex justify-center flex-wrap gap-6'>

                    {
                        productsToRender &&
                        productsToRender.map(item =>
                            (<ProductCard data={item} key={item.id} />)
                        )
                    }

                </section>
                <aside className={`${styles.home_aside} relative`} style={{}} >
                    <section className={`${activeList ? styles.active_aside_content : styles.aside_content}`}>
                        <section>

                            <p className='cursor-pointer' onClick={() => { setSearch(["all"]), setActiveList(false) }}>all</p>
                            <p className='cursor-pointer' onClick={() => { setSearch(["electronics"]), setActiveList(false) }}>electronics</p>
                            <p className='cursor-pointer' onClick={() => { setSearch(["women's clothing", "men's clothing"]), setActiveList(false) }} >clothing</p>
                        </section>
                    </section>

                    <section className={`${styles.aside_filterIcon}`}>
                        <section className='cursor-pointer' onClick={() => setActiveList(true)}>

                            <img src={filterIcon} alt="" width={30} height={30} />
                        </section>
                    </section>
                    <section
                        className={`${activeList ? "flex z-10 fixed top-[20px] right-[25px] cursor-pointer" : 'hidden'}`}
                        onClick={() => setActiveList(false)}
                    >
                        <img src={closeIcon} alt="" width={30} height={30} />
                    </section>

                </aside>
            </section>
        </section>
    );
};

export default Home;