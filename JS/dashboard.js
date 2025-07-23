const addBlogButton = document.querySelector('.dashboard_header_blogs_management button');
const addBlogForm = document.querySelector('.dashboard_header_add_blog');
const overlay = document.querySelector('.overlay');
const blogName = document.querySelector('.blog_name');
const blogHeadline = document.querySelector('.blog_headline');
const blogDescription = document.querySelector('.dashboard_header_add_blog_form textarea');
const blogImage = document.querySelector('.dashboard_header_add_blog_form input[type="file"]');
const addBlogButtonForm = document.querySelector('.dashboard_header_add_blog_form button');
const blogsShow = document.querySelector('.blogs_show');

let editIndex = null;



// تحويل الصورة Base64
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
}

function getBlogsFromStorage() {
    return JSON.parse(localStorage.getItem('blogs')) || [];
}

function saveBlogsToStorage(blogs) {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function displayBlogs(blogs) {
    blogsShow.innerHTML = '';
    blogs.forEach((blog, index) => {
        const card = document.createElement('div');
        card.classList.add('blog_card');
        card.innerHTML = `
            <img src="${blog.image}" alt="${blog.name}">
            <div class="blog_card_info">
                <h3>${blog.name}</h3>
                <h4>${blog.headline}</h4>
                <p>${blog.description}</p>
            </div>
            <div class="buttons">
                <button onclick="editBlog(${index})">Edit</button>
                <button onclick="deleteBlog(${index})">Delete</button>
            </div>
        `;
        blogsShow.appendChild(card);
    });
}

window.onload = () => {
    addBlogForm.style.display = 'none';
    overlay.style.display = 'none';
    displayBlogs(getBlogsFromStorage());
};

overlay.addEventListener('click', () => {
    addBlogForm.style.display = 'none';
    overlay.style.display = 'none';
    resetForm();
});

addBlogButton.addEventListener('click', () => {
    addBlogForm.style.display = 'flex';
    overlay.style.display = 'block';
    resetForm();
});

function resetForm() {
    blogName.value = '';
    blogHeadline.value = '';
    blogDescription.value = '';
    blogImage.value = '';
    editIndex = null;
    addBlogButtonForm.textContent = "Add Blog";
}

addBlogButtonForm.addEventListener('click', (e) => {
    e.preventDefault();
    if (blogName.value === '' && blogHeadline.value === '' && blogDescription.value === '' && blogImage.value === '') {
        alert('Please fill in all fields');
        return;
    }
    const file = blogImage.files[0];

    const proceed = (imageData) => {
        const newBlog = {
            name: blogName.value,
            headline: blogHeadline.value,
            description: blogDescription.value,
            image: imageData || getBlogsFromStorage()[editIndex]?.image || ''
        };

        let blogs = getBlogsFromStorage();
        if (editIndex !== null) {
            blogs[editIndex] = newBlog;
        } else {
            blogs.push(newBlog);
        }

        saveBlogsToStorage(blogs);
        displayBlogs(blogs);
        resetForm();
        addBlogForm.style.display = 'none';
        overlay.style.display = 'none';
    };

    if (file) {
        convertImageToBase64(file, proceed);
    } else {
        proceed(null);
    }
});

window.editBlog = function(index) {
    const blog = getBlogsFromStorage()[index];
    blogName.value = blog.name;
    blogHeadline.value = blog.headline;
    blogDescription.value = blog.description;
    editIndex = index;
    addBlogButtonForm.textContent = "Update Blog";
    addBlogForm.style.display = 'flex';
    overlay.style.display = 'block';
};

window.deleteBlog = function(index) {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
        let blogs = getBlogsFromStorage();
        blogs.splice(index, 1);
        saveBlogsToStorage(blogs);
        displayBlogs(blogs);
    }
};
