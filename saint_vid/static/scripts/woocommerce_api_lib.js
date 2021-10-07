const clientKey = 'ck_00000000000000000000000000';
const clientSecret = 'cs_00000000000000000000000000';
const wooUrl = 'https://api.hectordiaz.pro/saint-vid/wp-json/wc/v3/products';

function basicAuth(key, secret) {
    let hash = btoa(key + ':' + secret);
    return "Basic " + hash;
}


async function getProducts() {
    try {
        const response = await fetch(wooUrl + 'products', {
            headers: {"Authorization": basicAuth(clientKey, clientSecret)}
        });
        return await response.json();
    }
    catch (error) {
        // catches errors both in fetch and response.json
        console.log(error);
    }
}
