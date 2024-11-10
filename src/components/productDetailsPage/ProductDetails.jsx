import React from 'react';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../features/shopSlice';
import { useParams } from 'react-router-dom';
import { shortenTitle } from '../../helper/function';

import labelIcon from "../../assets/product_Info_Icon/tags.svg";


const boxShadowStyle = {

    boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px"
}



const ProductDetails = (data) => {
    const { id } = useParams()
    const product = useSelector(selectProduct);
    const products = product[id - 1];

    const { title, image, description, category } = products;
    console.log(product)
    return (
        
        <section className='w-full  flex flex-col items-center px-5' >
            <section className='flex p-6 rounded-lg mt-[5rem] gap-4  flex-col items-center w-fit ' style={{ boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px " }}>

                <p className='font-bold' >
                    {shortenTitle(title)}
                </p>
                <img src={image} alt="" style={{ height: "200px", width: "200px" }} />
                <p className='w-full text-center md md:max-w-xl md:text-left tex-l ' >
                    {description}
                </p>
                <section style={boxShadowStyle} className= "flex self-start justify-start gap-2 p-1 rounded-lg" >

                    <img src={labelIcon} width={25} alt="" />
                    <p className={boxShadowStyle} >{category}</p>
                </section>
            </section>
        </section>
    );
};

export default ProductDetails;