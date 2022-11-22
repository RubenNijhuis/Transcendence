const hexInputCheck = (hex: string) => {
    if (hex.length != 7) return false;
    if (!/^[#0-9a-f]+$/.test(hex)) return false;
    return true;
};

export default hexInputCheck;
