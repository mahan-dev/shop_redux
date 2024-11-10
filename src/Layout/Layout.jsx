import React from 'react';

const Layout = ({children}) => {
    return (
        <section className=' max-w-[1400px]' style={{margin: "0 auto"}}>

            {children}
            
        </section>
    );
};

export default Layout;