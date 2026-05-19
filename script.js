// Google Sheets API Configuration
const SHEET_ID = '1LxTe-oUFgT6R2OBOwcBlQAvg_RYRdVNov9Inf8uIeXI';
const API_KEY = 'AIzaSyDummyKey'; // Dummy key - will use CORS proxy instead
const SHEET_RANGE = 'Sheet1!A1:E1000';

// CORS proxy to avoid CORS issues
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

let allProducts = [];
let categories = new Set();
let updateInterval;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadProductsFromSheet();
    startAutoRefresh();
});

function initializeEventListeners() {
    // Category buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.getAttribute('data-category');
            filterProducts(category);
        }
    });

    // Product cards
    document.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('.product-name').textContent;
            const product = allProducts.find(p => p.name === productName);
            if (product) {
                openModal(product);
            }
        }
    });

    // Modal close
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') closeModal();
    });
}

function startAutoRefresh() {
    updateInterval = setInterval(() => {
        loadProductsFromSheet();
    }, 30000); // 30 seconds
}

async function loadProductsFromSheet() {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');

    try {
        // Use alternative method: direct CSV export from Google Sheets
        const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
        
        const response = await fetch(csvUrl);
        
        if (!response.ok) {
            throw new Error('CSV fetch failed');
        }
        
        const csvText = await response.text();
        parseCSV(csvText);
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback: Try with CORS proxy
        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`)}`;
            const response = await fetch(proxyUrl);
            const csvText = await response.text();
            parseCSV(csvText);
        } catch (proxyError) {
            console.error('Proxy also failed:', proxyError);
            showErrorMessage();
        }
    } finally {
        loading.classList.add('hidden');
    }
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
        console.error('CSV format invalid');
        return;
    }

    // Parse header
    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
    const categoryIndex = headers.indexOf('kategori');
    const productIndex = headers.indexOf('ürün');
    const descriptionIndex = headers.indexOf('açıklama');
    const priceIndex = headers.indexOf('fiyat');
    const imageIndex = headers.indexOf('resim');

    // Reset
    allProducts = [];
    categories.clear();

    // Parse products
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        
        if (values.length > Math.max(categoryIndex, productIndex, descriptionIndex, priceIndex, imageIndex)) {
            const category = sanitizeHTML(values[categoryIndex]?.trim() || '');
            const name = sanitizeHTML(values[productIndex]?.trim() || '');
            const description = sanitizeHTML(values[descriptionIndex]?.trim() || '');
            const price = sanitizeHTML(values[priceIndex]?.trim() || '');
            const image = values[imageIndex]?.trim() || '';

            if (category && name && price) {
                allProducts.push({
                    category,
                    name,
                    description,
                    price,
                    image
                });
                categories.add(category);
            }
        }
    }

    // Update UI
    updateCategoryButtons();
    displayProducts(allProducts);
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function updateCategoryButtons() {
    const container = document.getElementById('category-buttons');
    container.innerHTML = '';

    const sortedCategories = Array.from(categories).sort();
    
    sortedCategories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.setAttribute('data-category', category);
        btn.innerHTML = `<i class="fas fa-folder"></i> ${category}`;
        container.appendChild(btn);
    });
}

function filterProducts(category) {
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Ürün bulunamadı</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/280x200?text=Görsel+Yok'">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price} ₺</span>
                    <button class="product-btn"><i class="fas fa-info-circle"></i> Detay</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(product) {
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-image').onerror = function() {
        this.src = 'https://via.placeholder.com/600x400?text=Görsel+Yok';
    };
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = `${product.price} ₺`;
    document.getElementById('product-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showErrorMessage() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #c41e3a; margin-bottom: 20px; display: block;"></i>
            <p style="color: #999; font-size: 16px;">Google Sheets bağlantısı sağlanamadı. Lütfen daha sonra tekrar deneyin.</p>
            <p style="color: #999; font-size: 14px; margin-top: 10px;">Sayfanız açıksa ve CSV olarak paylaşılıyorsa, komut dosyası otomatik olarak yeniden deneyecektir.</p>
        </div>
    `;
}