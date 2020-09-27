const cn = (...args) => args.join(" ");
const getStatus = (num) => {
    const status = ["All", "Free", "Discount", "No Discount"];
    if (typeof num === "undefined") {
        return status;
    }
    return status[num];
}
export {
    cn,
    getStatus
} 