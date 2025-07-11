export const formatPrice = (amount:number|string):string|number=>{
    if(typeof amount !== 'number') return amount;
    return new Intl.NumberFormat("en-IN",{
        style : "currency",
        currency : "INR",
        maximumFractionDigits :0,
    }).format(amount)
}

export const formatValue = (value:number):string|number=>{
    return new Intl.NumberFormat("en-IN").format(value);
}