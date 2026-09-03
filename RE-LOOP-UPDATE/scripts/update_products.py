import re

new_products = [
    {'name': 'Samsung Galaxy S24 Ultra', 'price': 'Rp 21.999.000', 'img': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80'},
    {'name': 'Nike Air Max 97', 'price': 'Rp 2.450.000', 'img': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'},
    {'name': 'Sony PlayStation 5', 'price': 'Rp 8.999.000', 'img': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80'},
    {'name': 'Apple MacBook Pro M3', 'price': 'Rp 28.500.000', 'img': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'},
    {'name': 'Dyson V15 Detect', 'price': 'Rp 14.500.000', 'img': 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80'},
    {'name': 'DJI Mini 4 Pro', 'price': 'Rp 12.300.000', 'img': 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=600&q=80'},
    {'name': 'Logitech G Pro X', 'price': 'Rp 2.150.000', 'img': 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80'},
    {'name': 'Kindle Paperwhite', 'price': 'Rp 2.750.000', 'img': 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&w=600&q=80'},
    {'name': 'Bose QuietComfort Ultra', 'price': 'Rp 5.999.000', 'img': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'},
    {'name': 'Nintendo Switch OLED', 'price': 'Rp 4.850.000', 'img': 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=600&q=80'}
]

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by the card div opening
    cards = re.split(r'(<div class="top-product-card".*?>)', content)
    
    if len(cards) < 21:
        print(f"Failed to find 10 cards in {filepath}. Found {(len(cards)-1)//2}")
        return

    out = [cards[0]]
    for i in range(10):
        header = cards[1 + i*2]
        body = cards[2 + i*2]
        prod = new_products[i]
        
        # Replace image src
        body = re.sub(r'src="[^"]+"', f'src="{prod["img"]}"', body, count=1)
        # Replace alt
        body = re.sub(r'alt="[^"]+"', f'alt="{prod["name"]}"', body)
        # Replace title (for h3)
        body = re.sub(r'title="[^"]+"', f'title="{prod["name"]}"', body)
        # Replace actual text name (in h3 tag)
        body = re.sub(r'(<h3 class="top-card-name"[^>]*>).*?(</h3>)', rf'\g<1>{prod["name"]}\g<2>', body, flags=re.DOTALL)
        # Replace price
        body = re.sub(r'(<span class="top-card-price">).*?(</span>)', rf'\g<1>{prod["price"]}\g<2>', body)
        
        out.append(header)
        out.append(body)
        
    out.extend(cards[21:])
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(''.join(out))
    print(f"Updated {filepath}")

update_file('RE-LOOP/index.html')
update_file('RE-LOOP/top-products.html')
