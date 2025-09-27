const generateHash = () => {
    const hash = Math.random().toString(36).substring(2, 8); 
    return hash;
}

export default generateHash