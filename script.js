// Show modal when product image is clicked
document.querySelectorAll('.product-image').forEach(img => {
  img.addEventListener('click', function() {
    document.getElementById('modal-product-name').value = this.getAttribute('data-name');
    document.getElementById('modal-product-price').value = this.getAttribute('data-price');
    document.getElementById('product-quantity').value = 1;
    document.getElementById('product-size').value = "";
    var productOptionsModal = new bootstrap.Modal(document.getElementById('productOptionsModal'));
    productOptionsModal.show();
  });
});

// Add to cart from modal
document.getElementById('modal-add-to-cart').addEventListener('click', function() {
  const name = document.getElementById('modal-product-name').value;
  const price = parseFloat(document.getElementById('modal-product-price').value);
  const quantity = parseInt(document.getElementById('product-quantity').value, 10);
  const size = document.getElementById('product-size').value;

  if (!size) {
    alert('Please select a size.');
    return;
  }

  for (let i = 0; i < quantity; i++) {
    cartItems.push({ name: name + " (" + size + ")", price });
  }

  // Update cart UI
  for (let i = 0; i < quantity; i++) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `${name} (${size}) - $${price.toFixed(2)}`;
    cartItemsList.appendChild(listItem);
  }

  // Update total
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total.toFixed(2);

  // Update cart count
  cartCount.textContent = cartItems.length;

  // Hide modal
  bootstrap.Modal.getInstance(document.getElementById('productOptionsModal')).hide();
});

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Nice, you triggered this alert message!', 'success')
  })
}