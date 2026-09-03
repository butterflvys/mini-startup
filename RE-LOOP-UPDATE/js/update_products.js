const fs = require('fs');

const newProducts = [
    { name: 'Samsung Galaxy S24 Ultra', price: 'Rp 21.999.000', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Nike Air Max 97', price: 'Rp 2.450.000', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
    { name: 'Sony PlayStation 5', price: 'Rp 8.999.000', img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80' },
    { name: 'Apple MacBook Pro M3', price: 'Rp 28.500.000', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
    { name: 'Dyson V15 Detect', price: 'Rp 14.500.000', img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80' },
    { name: 'DJI Mini 4 Pro', price: 'Rp 12.300.000', img: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=600&q=80' },
    { name: 'Logitech G Pro X', price: 'Rp 2.150.000', img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80' },
    { name: 'Kindle Paperwhite', price: 'Rp 2.750.000', img: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bose QuietComfort Ultra', price: 'Rp 5.999.000', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Nintendo Switch OLED', price: 'Rp 4.850.000', img: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=600&q=80' }
];

function updateFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Split by the card div opening
    // This regex splits on <div class="top-product-card"...>
    const regex = /(<div class="top-product-card".*?>)/;
    const cards = content.split(regex);
    
    if (cards.length < 21) {
        console.log(`Failed to find 10 cards in ${filepath}. Found ${Math.floor((cards.length - 1) / 2)}`);
        return;
    }

    let out = cards[0];
    for (let i = 0; i < 10; i++) {
        let header = cards[1 + i * 2];
        let body = cards[2 + i * 2];
        let prod = newProducts[i];
        
        body = body.replace(/src="[^"]+"/, `src="${prod.img}"`);
        body = body.replace(/alt="[^"]+"/, `alt="${prod.name}"`);
        body = body.replace(/title="[^"]+"/, `title="${prod.name}"`);
        body = body.replace(/(<h3 class="top-card-name"[^>]*>).*?(<\/h3>)/s, `$1${prod.name}$2`);
        body = body.replace(/(<span class="top-card-price">).*?(<\/span>)/s, `$1${prod.price}$2`);
        
        out += header + body;
    }
    
    for (let i = 21; i < cards.length; i++) {
        out += cards[i];
    }
    
    fs.writeFileSync(filepath, out, 'utf8');
    console.log(`Updated ${filepath}`);
}

updateFile('RE-LOOP/index.html');
updateFile('RE-LOOP/top-products.html');
