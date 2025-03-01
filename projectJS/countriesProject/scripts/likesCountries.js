
const saveLikedCountries = (countries) => {
    localStorage.setItem("likedCounties", JSON.stringify(countries));
}

const getLikedCountries = () => {
    return JSON.parse(localStorage.getItem("likedCounties")) || [];
}



export { saveLikedCountries, getLikedCountries };