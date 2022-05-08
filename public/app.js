const toCurrency = price => {
    return new Intl.NumberFormat('ua-UA', {
        currency: 'uah',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(el => {
    el.textContent = toCurrency(el.textContent)
})

const $cart = document.querySelector('#cart');

if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;
            console.log(id)

            fetch('/cart/remove/' + id, {
                method: 'delete',

            }).then(res => res.json()).then(cart => {
                if (cart.courses.length) {
                    const html = cart.courses.map(c => {
                        return ` 
                        <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td><button class="btn btn-small js-remove" data-id="${c.id}">Remove</button></td>
                        </tr>`
                    }).join('')
                    $cart.querySelector('tbody').innerHTML = html;
                    $cart.querySelector('.price').textContent = toCurrency(cart.price);
                } else
                    $cart.innerHTML = '<p>The cart is empty</p>'
            })
        }
    })
}