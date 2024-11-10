
const shortenTitle = item => {
    const breakWord = item.split(" ");
    const fixedWord = breakWord.slice(0, 2).join(" ");
    if (fixedWord.includes("-")) {
        const newWord = fixedWord.split(" ")
        return newWord.slice(0, 1)
    } else {
        return fixedWord;
    }
}


const SumTotal = item => {
    // if ( !item || item.length === 0  ) return 0;
    const totalCounter = item.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
    return totalCounter;
}
const SumProducts = item => {
    // if ( !item || item.length === 0  ) return 0;
    const sumProduct = item.reduce((acc, cur) => acc + cur.quantity, 0)
    return sumProduct;
}

const isInCard = (state, id) => {
    const isValid = state.selectedItems.some(item=> item.id === id)
    return isValid;
}

const quantityCounter = (state, id) => {
    const quantity = state.selectedItems.findIndex(item=> item.id === id);
    if(quantity !== -1) {
        return state.selectedItems[quantity].quantity;
    } else {
        return 0;
    }
}




export {
    shortenTitle,
    SumTotal,
    SumProducts,
    isInCard,
    quantityCounter
};