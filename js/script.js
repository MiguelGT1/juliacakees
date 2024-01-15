let searchBtn = document.querySelector('#search-btn');
let searchForm = document.querySelector('.header .search-form');
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');
let slides = document.querySelectorAll('.home .slide');
let index = 0;

let cartCount = 0;
let cartIcon = document.querySelector('.fas.fa-shopping-cart');
let cartItems = [];
let isCartOpen = false;

function toggleCartModal() {
    let cartModal = document.getElementById('cartModal');

    // Verifica se o modal está atualmente visível
    if (cartModal.style.display === 'none') {
        // Se estiver invisível, torna-o visível
        displayCartDetails();
    } else {
        // Se estiver visível, torna-o invisível
        closeCart();
    }
}

let productsData = {
    'torta-limao': {
        image: 'images/limao1.jpg',
        description: 'Torta de Limão',
        price: 60.00
    },
    'cheesecake-frutas-vermelhas': {
        image: 'images/torta.png',
        description: 'Cheesecake Frutas Vermelhas',
        price: 65.00
    },
    'cheesecake-morango': {
        image: 'images/cheesecake-de-morango-facil.jpeg',
        description: 'Cheesecake de Morango',
        price: 65.00
    },
    'torta-holandesa': {
        image: 'images/tortaholandesa.jpeg',
        description: 'Torta holandesa',
        price: 60.00
    },
    'surpresa-morango': {
        image: 'images/sobreeisso.png',
        description: 'Surpresa de morango',
        price: 90.00
    },
    'surpresa-uva': {
        image: 'images/chocola1.jpg',
        description: 'Surpresa de Uva',
        price: 80.00
    },
    'guirlanda': {
        image: 'images/guirlanda-de-brownie.webp',
        description: 'Guirlanda Brownie',
        price: 100.00
    },
    'paodemel': {
        image: 'images/paodemel-1.jpeg',
        description: 'Pão de Mel',
        price: 14.00
    },
    'BoloChocolateBrigadeiro': {
        image: 'images/bolo1.png',
        description: 'Bolo Chocolate c/Brigadeiro',
        price: 90.00
    },
    'BoloAbacaxi': {
        image: 'images/bolo2.jpg',
        description: 'Bolo de Abacaxi com Coco',
        price: 90.00
    },
    'BoloMorango': {
        image: 'images/bolo3.png',
        description: 'Bolo de Morango',
        price: 90.00
    },
    'BoloCoco': {
        image: 'images/bolo4.png',
        description: 'Bolo de Coco',
        price: 90.00
    },

    // Adicione mais produtos conforme necessário
};

function updateCartCount() {
    document.getElementById('cartCount').textContent = cartCount;
}

function calculateTotal() {
    let total = 0;
    cartItems.forEach(itemKey => {
        let productInfo = productsData[itemKey];
        if (productInfo) {
            total += productInfo.price;
        }
    });
    return total;
}

function removeCartItem(itemKey) {
    // Remove o item do carrinho
    let itemIndex = cartItems.indexOf(itemKey);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        cartCount--;

        // Atualiza a exibição do carrinho
        if (isCartOpen) {
            displayCartDetails();
        } else {
            updateCartCount();
        }
    }
}

function closeCart() {
    let cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
        isCartOpen = false;
    }
}

function createOrderMessage() {
    let message = "Olá, vi seus doces no site e gostaria de encomendar os seguintes itens:";
    cartItems.forEach(itemKey => {
        let productInfo = productsData[itemKey];
        if (productInfo) {
            message += `\n- ${productInfo.description} (R$ ${productInfo.price.toFixed(2)})`;
        }
    });
    message += `\n\nValor Total: R$ ${calculateTotal().toFixed(2)}`;

    return message;
}

function openWhatsApp() {
    let orderMessage = createOrderMessage();
    let whatsappURL = `https://api.whatsapp.com/send?phone=5511966389440&text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappURL, '_blank');
}

function displayCartDetails() {
    let cartModal = document.getElementById('cartModal');
    let cartContent = document.getElementById('cartContent');

    // Verifica se os elementos existem, senão, cria-os
    if (!cartModal) {
        cartModal = document.createElement('div');
        cartModal.id = 'cartModal';
        document.body.appendChild(cartModal);

        // Adiciona estilos CSS para posicionar à direita
        cartModal.style.position = 'fixed';
        cartModal.style.top = '0';
        cartModal.style.right = '0';
        cartModal.style.width = '300px'; // Defina a largura desejada
        cartModal.style.height = '100%';
        cartModal.style.background = '#fff'; // Cor de fundo desejada
        cartModal.style.borderLeft = '1px solid #ccc'; // Borda à esquerda
        cartModal.style.overflowY = 'auto';
        // Adiciona rolagem quando necessário
    }

    if (!cartContent) {
        cartContent = document.createElement('div');
        cartContent.id = 'cartContent';
        cartModal.appendChild(cartContent);
    }

    // Limpa o conteúdo anterior
    cartContent.innerHTML = '';

    if (cartItems.length === 0) {
        cartContent.textContent = 'Seu carrinho está vazio.';
    } else {
        cartItems.forEach(itemKey => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item-details');

            let productInfo = productsData[itemKey];

            if (productInfo) {
                let productImage = document.createElement('img');
                productImage.src = productInfo.image;
                productImage.alt = productInfo.description;
                productImage.style.width = '100px'; // Defina o tamanho desejado
                productImage.style.height = '100px'; // Defina o tamanho desejado

                let productDescription = document.createElement('p');
                productDescription.textContent = productInfo.description;

                let productPrice = document.createElement('p');
                productPrice.textContent = `R$ ${productInfo.price.toFixed(2)}`;

                let removeButton = document.createElement('buttonThree');
                removeButton.textContent = 'X';
                removeButton.style.backgroundColor = "red"
                removeButton.style.padding = "0px 10px"
                removeButton.style.borderRadius = "10px"
                removeButton.style.color = "white"
                removeButton.classList.add('remove-item-button');
                removeButton.addEventListener('click', function () {
                    // Remove o item correspondente ao botão "X" clicado
                    removeCartItem(itemKey);
                });

                cartItem.appendChild(productImage);
                cartItem.appendChild(productDescription);
                cartItem.appendChild(productPrice);
                cartItem.appendChild(removeButton);

                cartContent.appendChild(cartItem);
            }
        });

        let totalAmount = document.createElement('p');
        totalAmount.textContent = `Total: R$ ${calculateTotal().toFixed(2)}`;
        totalAmount.style.fontSize = "15px";
        totalAmount.style.display = "flex";
        totalAmount.style.justifyContent = "center";
        totalAmount.style.color = "red";
        cartContent.appendChild(totalAmount);
    }

    // Adiciona um botão para fechar o carrinho
    let closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar Carrinho';
    closeButton.style.margin = "0 auto";
    closeButton.style.display = "flex";
    closeButton.addEventListener('click', function () {
        closeCart();
    });

    cartContent.appendChild(closeButton);

    // Define a posição absoluta
    cartModal.style.position = 'fixed';

    // Exibe o modal do carrinho
    cartModal.style.display = 'block';

    // Atualiza o status do carrinho
    isCartOpen = true;
    updateCartCount();

    let orderButton = document.createElement('buttonTwo');
    orderButton.style.display = "flex";
    orderButton.style.justifyContent = "center";
    orderButton.style.backgroundColor = "red";
    orderButton.style.fontSize = "20px";
    orderButton.style.borderRadius = "40px";
    orderButton.style.color = "white";
    orderButton.textContent = 'PEDIR';
    orderButton.addEventListener('click', function () {
        openWhatsApp();
        closeCart(); // Fecha o carrinho após clicar em PEDIR
    });

    cartContent.appendChild(orderButton);
}

function displayCart() {
    let cartModal = document.getElementById('cartModal');
    let cartContent = document.getElementById('cartContent');

    if (!cartModal) {
        console.error("Elemento cartModal não encontrado.");
        return;
    }

    if (cartItems.length === 0) {
        cartContent.textContent = 'Seu carrinho está vazio.';
    } else {
        cartItems.forEach(itemKey => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            let productInfo = productsData[itemKey];

            if (productInfo) {
                let productImage = document.createElement('img');
                productImage.src = productInfo.image;
                productImage.alt = productInfo.description;

                let productDescription = document.createElement('p');
                productDescription.textContent = productInfo.description;

                let productPrice = document.createElement('p');
                productPrice.textContent = `R$ ${productInfo.price.toFixed(2)}`;

                cartItem.appendChild(productImage);
                cartItem.appendChild(productDescription);
                cartItem.appendChild(productPrice);

                cartContent.appendChild(cartItem);
            }
        });

        let totalAmount = document.createElement('p');
        totalAmount.textContent = `Total: R$ ${calculateTotal().toFixed(2)}`;
        totalAmount.style.fontSize = "15px";
        totalAmount.style.display = "flex";
        totalAmount.style.justifyContent = "center";
        totalAmount.style.color = "red";
        cartContent.appendChild(totalAmount);
    }

    // Limpa o conteúdo anterior e adiciona o novo conteúdo ao modal
    while (cartModal.firstChild) {
        cartModal.removeChild(cartModal.firstChild);
    }
    cartModal.appendChild(cartContent);

    // Exibe o modal do carrinho
    cartModal.style.display = 'block';
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (event) {
        // Verifica se o botão clicado tem um ID válido de produto
        let itemKey = this.id;
        if (itemKey && productsData[itemKey]) {
            cartItems.push(itemKey);
            cartCount++;
            if (isCartOpen) {
                displayCartDetails();
            } else {
                updateCartCount();
            }
            event.preventDefault();
        }
    });
});

cartIcon.addEventListener('click', function () {
    if (!isCartOpen) {
        displayCartDetails();
    } else {
        closeCart();
    }
});

searchBtn.onclick = () => {
    searchBtn.classList.toggle('fa-times');
    searchForm.classList.toggle('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    searchBtn.classList.remove('fa-times');
    searchForm.classList.remove('active');
};

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchForm.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}
