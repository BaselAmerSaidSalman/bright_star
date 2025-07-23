const header = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
header.addEventListener("mouseenter", () => {
    header.classList.add('scrolled');
});
header.addEventListener("mouseleave", () => {
    if (window.scrollY === 0) {
        header.classList.remove('scrolled');
    }
});

// ######################################################################################################################################
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuBtnSpan = mobileMenuBtn.querySelectorAll('span');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
// ######################################################################################################################################

// document.addEventListener("DOMContentLoaded", function () {
//   const products = JSON.parse(localStorage.getItem("products")) || [];
//   const shopContainer = document.querySelector(".shop_content");

//   if (!shopContainer) {
//     console.warn("❌ shop_content not found");
//     return;
//   }

//   if (products.length === 0) {
//     shopContainer.innerHTML = "<p>No products available.</p>";
//     return;
//   }

//   shopContainer.innerHTML = '';

//   products.forEach((product, index) => {
//     const imagePath = product.image && product.image.trim() !== ""
//       ? product.image
//       : "Images/default-product.jpg"; // fallback فقط لو مفيش صورة

//     const item = document.createElement("div");
//     item.className = "shop_item";
//     item.setAttribute("data-aos", "zoom-in");

//     item.innerHTML = `
//       <img src="${imagePath}" alt="${product.name}" 
//         onerror="console.warn('[Image Error]', this.src); this.style.display='none';"
//         style="width: 100%; height: 160px; object-fit: cover; border-radius: 10px;">
      
//       <h3>${product.name}</h3>
//       <p>${product.description}</p>
//       <span><strong>$${product.price}</strong></span>
//       <div class="shop_item_buttons">
//         <button class="add-to-cart" data-index="${index}">Add to Cart</button>
//         <button class="buy-now" data-index="${index}">Buy Now</button>
//       </div>
//     `;

//     shopContainer.appendChild(item);
//     });

//     // Add event listeners after elements are added
//     document.querySelectorAll('.add-to-cart').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const idx = e.target.dataset.index;
//         const products = JSON.parse(localStorage.getItem('products')) || [];
//         const product = products[idx];
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];

//         // Check if item already in cart
//         const existing = cart.find(item => item.id === (product.id || `product-${idx}`));
//         if (existing) {
//           existing.quantity += 1;
//         } else {
//           // Add with quantity property and fixed image path
//           cart.push({
//             id: product.id || `product-${idx}`,
//             name: product.name,
//             price: Number(product.price), // ensure number
//             image: 'Images/' + product.image.split('/').pop(), // always use Images/filename.jpg
//             quantity: 1
//           });
//         }
//         localStorage.setItem('cart', JSON.stringify(cart));
//         alert('✅ Added to Cart!');
//       });
//     });
  
//     document.querySelectorAll('.buy-now').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         const idx = e.target.dataset.index;
//         localStorage.setItem('checkout', JSON.stringify([products[idx]]));
//         window.location.href = 'checkout.html';
//       });
//     });
// });


// ####################################################################################################
// Ensure all products have a unique id
// function ensureBlogsIds() {
//   let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
//   let changed = false;
//   blogs = blogs.map((blog, idx) => {
//     if (!blog.id) {
//       changed = true;
//       return { ...blog, id: `blog-${idx}` };
//     }
//     return blog;
//   });
//   if (changed) {
//     localStorage.setItem('blogs', JSON.stringify(blogs));
//     console.log('Blog ids assigned:', blogs);
//   }
// }

// // Run this on page load
// ensureBlogsIds();