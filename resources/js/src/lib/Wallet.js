export const formatMoneyValue = (val) => {
    if (!val || isNaN(val)) val = 0;
    return Number(val).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
};
