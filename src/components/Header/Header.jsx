import React from 'react';
import { useSelector } from 'react-redux';
import { selectItemsCounter } from '../../features/shopSlice';
import { Link } from 'react-router-dom';
import cartIcon from "../../assets/headerIcons/cart-shopping.svg";

const Header = () => {

    const itemsCounter = useSelector(selectItemsCounter);
    return (
        <section className=' w-full flex px-3 py-5 rounded-lg justify-between bg-slate-500 text-white'>
            <p>shop</p>
            <Link className='inline-block' to={`/product/shopCard`}>
                <section className='relative'>

                    <p className='absolute top-[-13px] right-[-7px] bg-white rounded-full text-black text-center w-[23px] '>{itemsCounter}</p>
                    <img src={cartIcon} alt="" width={30} height={30} />
                </section>
            </Link>
        </section>
    );
};

export default Header;