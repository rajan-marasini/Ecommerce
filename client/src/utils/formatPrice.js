export const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};
