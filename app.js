// Azaran Tahrir - JavaScript Core Logic

// Product Database
const products = [
    {
        id: 1,
        title: "دفترچه یادداشت چرمی لوکس آذران",
        category: "notebook",
        categoryFarsi: "دفترچه و سالنامه",
        price: 340000,
        rating: 4.9,
        image: "assets/notebook.png",
        isNew: true,
        desc: "این دفترچه یادداشت دست‌دوز با جلد چرم طبیعی و طراحی کلاسیک، بهترین همدم برای یادداشت‌های روزانه و افکار ارزشمند شماست. کاغذ کرافت ضخیم و باکیفیت مانع از پخش شدن جوهر خودنویس می‌شود.",
        specs: {
            "نوع جلد": "چرم طبیعی گاوی دست‌دوز",
            "نوع کاغذ": "کرافت نخودی ۱۰۰ گرم سوپرفاین",
            "تعداد برگ": "۱۲۰ برگ (۲۴۰ صفحه)",
            "ابعاد": "۱۵ × ۲۱ سانتی‌متر (A5)"
        }
    },
    {
        id: 2,
        title: "ست خودنویس نفیس با روکش طلای ۲۴ عیار",
        category: "pen",
        categoryFarsi: "قلم و خودنویس",
        price: 1890000,
        rating: 5.0,
        image: "assets/fountain_pen.png",
        isNew: true,
        desc: "شکوه نگارش را با این ست قلم منحصر‌به‌فرد تجربه کنید. قلم دارای نوک با آلیاژ طلا بوده و جریان جوهر بسیار روانی دارد. بدنه فلزی سنگین و با ابهت، حس ممتاز بودن را به نویسنده القا می‌کند.",
        specs: {
            "نوک قلم": "آلیاژ طلا عیار ۱۴ آلمانی",
            "جنس بدنه": "برنج با روکش طلای ۲۴ عیار",
            "مکانیزم شارژ": "پمپ پیستونی و کارتریج جوهر استاندارد",
            "متعلقات": "جعبه هدیه چوبی نفیس و شیشه جوهر اختصاصی"
        }
    },
    {
        id: 3,
        title: "ست آبرنگ حرفه‌ای ۳۶ رنگ سن‌پترزبورگ",
        category: "art",
        categoryFarsi: "لوازم هنری و نقاشی",
        price: 780000,
        rating: 4.8,
        image: "assets/watercolor_set.png",
        isNew: false,
        desc: "مجموعه آبرنگ ۳۶ رنگ با قرص‌های غنی از پیگمنت‌های خالص که درخشش و شفافیت بی‌نظیری به آثار نقاشی شما می‌بخشند. ترکیب‌ پذیری رنگ‌ها فوق‌العاده بالا بوده و ثبات نوری بسیار طولانی مدتی دارند.",
        specs: {
            "تعداد رنگ": "۳۶ رنگ حرفه‌ای در جعبه فلزی",
            "کیفیت رنگدانه": "پیگمنت‌های خالص و ارگانیک با غلظت بالا",
            "پالت همراه": "دارای ۲ پالت تاشو ترکیب رنگ در درب جعبه",
            "کشور سازنده": "روسیه (برند اورجینال White Nights)"
        }
    },
    {
        id: 4,
        title: "مدادرنگی طراحی حرفه‌ای ۷۲ رنگ جعبه فلزی",
        category: "pencil",
        categoryFarsi: "مداد طراحی و نقاشی",
        price: 590000,
        rating: 4.7,
        image: "assets/colored_pencils.png",
        isNew: false,
        desc: "مدادهای رنگی با مغزی بسیار نرم بر پایه موم که به هنرمند امکان می‌دهد به سادگی لایه‌گذاری رنگ‌ها را انجام دهد و سایه‌روشن‌های لطیفی ایجاد کند. چوب بدنه از سدر باکیفیت تهیه شده که تراشیدن آن را آسان می‌کند.",
        specs: {
            "تعداد رنگ": "۷۲ رنگ غنی چیده شده در ۲ طبقه",
            "قطر مغزی": "۳.۸ میلی‌متر بسیار مقاوم در برابر شکستن",
            "جنس بدنه": "چوب سدر طبیعی با درجه سختی نرم (Wax-based)",
            "نوع بسته‌بندی": "جعبه فلزی مستحکم با طراحی مدرن"
        }
    }
];

// App State
let cart = JSON.parse(localStorage.getItem('azaran_cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('azaran_user')) || null;
let activePage = 'home';
let activeCategory = 'all';
let maxPriceFilter = 2000000;
let currentSort = 'default';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
    renderPage(activePage);
    updateCartUI();
    updateUserUI();
    lucide.createIcons();
});

// Helper: Convert English numbers to Persian digits
function toPersianDigits(num) {
    if (num === null || num === undefined) return '';
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, function (w) {
        return id[+w];
    });
}

// Helper: Format Price with Persian digits and commas
function formatPrice(price) {
    const formatted = price.toLocaleString('fa-IR'); // Formats with commas
    return `${formatted} تومان`;
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('azaran_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('azaran_theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const darkIcon = document.querySelector('.theme-icon-dark');
    const lightIcon = document.querySelector('.theme-icon-light');
    if (theme === 'light') {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    } else {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    }
}

// Router & Rendering Views
function renderPage(page) {
    activePage = page;
    const mainContent = document.getElementById('main-content');
    
    // Update active nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-page') === page);
    });
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-page') === page);
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home') {
        mainContent.innerHTML = getHomeHTML();
        setupHomeEvents();
    } else if (page === 'products') {
        mainContent.innerHTML = getProductsHTML();
        setupProductsEvents();
        renderProductGrid();
    } else if (page === 'about') {
        mainContent.innerHTML = getAboutHTML();
    } else if (page === 'login') {
        mainContent.innerHTML = getLoginHTML();
        setupLoginEvents();
    }
    
    lucide.createIcons();
}

// Page HTML Templates
function getHomeHTML() {
    // Generate featured product cards dynamically for home page
    const featuredHTML = products.map(prod => `
        <div class="product-card" data-id="${prod.id}">
            <div class="product-card-img-wrapper" onclick="openProductModal(${prod.id})">
                ${prod.isNew ? '<span class="badge-new">جدید</span>' : ''}
                <img src="${prod.image}" alt="${prod.title}" class="product-card-img" onerror="this.src='https://via.placeholder.com/300'">
            </div>
            <div class="product-card-info">
                <span class="product-card-category">${prod.categoryFarsi}</span>
                <h3 class="product-card-title" onclick="openProductModal(${prod.id})">${prod.title}</h3>
                <div class="product-rating">
                    <i data-lucide="star" style="fill: var(--primary); stroke: none; width: 14px; height: 14px;"></i>
                    <span>${toPersianDigits(prod.rating.toFixed(1))}</span>
                </div>
                <div class="product-card-footer">
                    <div class="product-card-price">
                        <span class="price-amount">${toPersianDigits(prod.price.toLocaleString())}</span>
                        <span class="price-unit">تومان</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${prod.id})" title="افزودن به سبد خرید">
                        <i data-lucide="plus" style="width: 18px; height: 18px;"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <!-- Hero Section -->
        <section class="hero container">
            <div class="hero-grid">
                <div class="hero-content">
                    <span class="hero-badge">لوکس‌ترین نوشت‌افزار ایرانی و خارجی</span>
                    <h1 class="hero-title">خلاقیت خود را با <br><span>آذران تحریر</span> بنویسید</h1>
                    <p class="hero-desc">ما گلچینی از نفیس‌ترین دفترچه‌های چرمی دست‌دوز، قلم‌ها و خودنویس‌های شیک و ابزارهای طراحی تراز اول جهان را برای اهل ذوق گرد آورده‌ایم تا هر ضربه قلم شما اثری جاودانه خلق کند.</p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary" onclick="renderPage('products')">
                            <span>مشاهده فروشگاه</span>
                            <i data-lucide="arrow-left"></i>
                        </button>
                        <button class="btn btn-secondary" onclick="renderPage('about')">درباره گالری</button>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-num">${toPersianDigits('۱۰k')}+</span>
                            <span class="stat-label">مشتری راضی</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-num">${toPersianDigits('۵۰۰')}+</span>
                            <span class="stat-label">محصول اورجینال</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-num">${toPersianDigits('۲۴')}/${toPersianDigits('۷')}</span>
                            <span class="stat-label">پشتیبانی آنلاین</span>
                        </div>
                    </div>
                </div>
                <div class="hero-image-wrapper">
                    <div class="hero-image-bg"></div>
                    <img src="assets/fountain_pen.png" alt="ست خودنویس لوکس آذران تحریر" class="hero-img" onerror="this.src='https://via.placeholder.com/400'">
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="categories container">
            <div class="section-header">
                <h2 class="section-title">دسته‌بندی محصولات آذران</h2>
                <p class="section-subtitle">شروعی الهام‌بخش برای خلق ایده‌های شما با ابزارهای استاندارد</p>
            </div>
            <div class="categories-grid">
                <div class="category-card" onclick="filterByCategory('notebook')">
                    <div class="category-icon-box">
                        <i data-lucide="book-open" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>دفترچه و سالنامه لوکس</h3>
                    <p>دفترچه‌های چرمی، یادداشت و طراحی</p>
                </div>
                <div class="category-card" onclick="filterByCategory('pen')">
                    <div class="category-icon-box">
                        <i data-lucide="pen-tool" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>قلم و خودنویس نفیس</h3>
                    <p>خودنویس، روان‌نویس و قلم‌های خوشنویسی</p>
                </div>
                <div class="category-card" onclick="filterByCategory('art')">
                    <div class="category-icon-box">
                        <i data-lucide="palette" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>لوازم نقاشی و آبرنگ</h3>
                    <p>آبرنگ حرفه‌ای، گواش، قلمو و کاغذ آبرنگ</p>
                </div>
                <div class="category-card" onclick="filterByCategory('pencil')">
                    <div class="category-icon-box">
                        <i data-lucide="pencil" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>مداد و نوشت‌افزار طراحی</h3>
                    <p>مدادرنگی‌های تخصصی و اتودهای فلزی</p>
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="featured-products container" style="padding: 4rem 0;">
            <div class="section-header">
                <h2 class="section-title">پیشنهادهای ویژه و نفیس</h2>
                <p class="section-subtitle">آثار برگزیده و پرفروش گالری آذران تحریر</p>
            </div>
            <div class="products-grid">
                ${featuredHTML}
            </div>
        </section>

        <!-- Why Choose Us -->
        <section class="why-us container">
            <div class="section-header">
                <h2 class="section-title">چرا آذران تحریر؟</h2>
                <p class="section-subtitle">اصول کاری ما برای جلب رضایت و همراهی هنردوستان</p>
            </div>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">
                        <i data-lucide="shield-check" style="width: 32px; height: 32px;"></i>
                    </div>
                    <div class="feature-text">
                        <h3>تضمین اصالت کالا</h3>
                        <p>تمامی کالاها و برندهای موجود در آذران تحریر با ضمانت ۱۰۰٪ اورجینال و تست کیفی عرضه می‌شوند.</p>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i data-lucide="truck" style="width: 32px; height: 32px;"></i>
                    </div>
                    <div class="feature-text">
                        <h3>ارسال سریع و مطمئن</h3>
                        <p>سفارشات شما با بسته‌بندی ضدضربه و مجهز در کوتاه‌ترین زمان به سراسر ایران ارسال خواهند شد.</p>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i data-lucide="sparkles" style="width: 32px; height: 32px;"></i>
                    </div>
                    <div class="feature-text">
                        <h3>بسته‌بندی هدیه نفیس</h3>
                        <p>در صورت تمایل، خریدهای شما در قالب پک‌های کادویی لوکس و عطرآگین بسته‌بندی و آماده اهدا می‌شوند.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function getProductsHTML() {
    return `
        <div class="product-section container">
            <div class="section-header">
                <h2 class="section-title">گالری محصولات آذران تحریر</h2>
                <p class="section-subtitle">در میان دنیایی از ابزارهای متمایز و حرفه‌ای جستجو کنید</p>
            </div>
            <div class="catalog-layout">
                <!-- Filters Sidebar -->
                <aside class="filters-sidebar">
                    <div class="filter-group">
                        <h4>دسته‌بندی‌ها</h4>
                        <div class="category-filter-list">
                            <div class="category-filter-btn active" data-category="all">
                                <span>همه محصولات</span>
                                <span class="count">${toPersianDigits(products.length)}</span>
                            </div>
                            <div class="category-filter-btn" data-category="notebook">
                                <span>دفترچه و سالنامه</span>
                                <span class="count">${toPersianDigits(products.filter(p => p.category === 'notebook').length)}</span>
                            </div>
                            <div class="category-filter-btn" data-category="pen">
                                <span>قلم و خودنویس</span>
                                <span class="count">${toPersianDigits(products.filter(p => p.category === 'pen').length)}</span>
                            </div>
                            <div class="category-filter-btn" data-category="art">
                                <span>لوازم نقاشی</span>
                                <span class="count">${toPersianDigits(products.filter(p => p.category === 'art').length)}</span>
                            </div>
                            <div class="category-filter-btn" data-category="pencil">
                                <span>مدادهای طراحی</span>
                                <span class="count">${toPersianDigits(products.filter(p => p.category === 'pencil').length)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="filter-group">
                        <h4>فیلتر قیمت</h4>
                        <div class="price-range-container">
                            <input type="range" class="price-slider" id="price-range-slider" min="200000" max="2000000" step="50000" value="2000000">
                            <div class="price-display">
                                <span>حداکثر قیمت:</span>
                                <div>
                                    <span class="price-val" id="price-slider-value">${toPersianDigits('۲,۰۰۰,۰۰۰')}</span>
                                    <span>تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Catalog Contents -->
                <div class="catalog-content">
                    <div class="catalog-header">
                        <div class="results-count">
                            <span>نمایش </span>
                            <span class="num" id="filtered-count">${toPersianDigits(products.length)}</span>
                            <span> محصول</span>
                        </div>
                        <div class="sort-wrapper">
                            <label for="sort-select" style="font-size: 0.85rem; color: var(--text-secondary); margin-left: 0.5rem;">مرتب‌سازی:</label>
                            <select id="sort-select" class="sort-select">
                                <option value="default">پیش‌فرض (بر اساس محبوبیت)</option>
                                <option value="price-asc">قیمت: کم به زیاد</option>
                                <option value="price-desc">قیمت: زیاد به کم</option>
                                <option value="rating">بیشترین امتیاز</option>
                            </select>
                        </div>
                    </div>

                    <div class="products-grid" id="catalog-products-grid">
                        <!-- Dynamic items -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getAboutHTML() {
    return `
        <section class="about-section container">
            <div class="about-grid">
                <div class="about-content">
                    <h2>داستان گالری آذران تحریر</h2>
                    <p>گالری آذران تحریر در سال ۱۳۹۸ با یک هدف ساده شروع به کار کرد: احیای لذت نوشتن روی کاغذ مرغوب و طراحی با ابزارهای متمایز. ما معتقدیم در عصر دیجیتال، فیزیکِ نوشتن و لمس چرمِ جلد یک دفترچه، یا شنیدن خش‌خش ملایم نوک خودنویس بر تاروپود کاغذ، نوعی مراقبه و بیان اصیل هویت هنری است.</p>
                    <p>تمام تلاش تیم ما واردات و توزیع نوشت‌افزارهای لوکس از برترین تولیدکنندگان جهان (نظیر آلمان، روسیه و ژاپن) در کنار حمایت از کارگاه‌های دستی ایرانی است که چرم‌های طبیعی را با هنر دست ترکیب کرده و دفترهای کم‌نظیری می‌آفرینند.</p>
                    <p>شعبه حضوری ما همواره پذیرای قدم‌های گرم شما هنرمندان و نویسندگان عزیز است تا بتوانید قلم دلخواه خود را پیش از خرید تست کنید و از معاشرت در فضای عطرآگین آذران لذت ببرید.</p>
                </div>
                <div class="about-img-box">
                    <img src="assets/notebook.png" alt="فضای داخلی گالری آذران تحریر" onerror="this.src='https://via.placeholder.com/500'">
                </div>
            </div>
        </section>
    `;
}

function getLoginHTML() {
    return `
        <section class="auth-section container">
            <div class="auth-container">
                <!-- Login Box -->
                <div class="auth-card glass-card" id="login-card">
                    <div class="auth-header">
                        <div class="auth-logo">
                            <i data-lucide="user-check" style="width: 24px; height: 24px;"></i>
                        </div>
                        <h2>خوش آمدید</h2>
                        <p>برای ورود به حساب کاربری آذران تحریر اطلاعات خود را وارد کنید</p>
                    </div>

                    <form id="login-form" class="auth-form">
                        <div class="form-group">
                            <label for="login-email">ایمیل یا شماره موبایل</label>
                            <div class="input-with-icon">
                                <input type="text" id="login-email" required placeholder="example@domain.com">
                                <i data-lucide="mail" class="input-icon"></i>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="login-password">رمز عبور</label>
                            <div class="input-with-icon">
                                <input type="password" id="login-password" required placeholder="••••••••">
                                <i data-lucide="lock" class="input-icon"></i>
                                <span class="password-toggle-btn" onclick="togglePasswordVisibility('login-password', this)">
                                    <i data-lucide="eye" style="width:16px;height:16px;"></i>
                                </span>
                            </div>
                        </div>

                        <div class="auth-footer-links">
                            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                                <input type="checkbox" style="accent-color: var(--primary);"> مرا به خاطر بسپار
                            </label>
                            <a href="#" style="color: var(--primary);">فراموشی رمز عبور؟</a>
                        </div>

                        <button type="submit" class="btn btn-primary w-full">ورود به حساب</button>
                    </form>

                    <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-secondary);">
                        حساب کاربری ندارید؟ 
                        <span class="auth-toggle-link" onclick="toggleAuthCard('register')">ثبت‌نام کنید</span>
                    </div>
                </div>

                <!-- Register Box (Hidden Initially) -->
                <div class="auth-card glass-card hidden" id="register-card">
                    <div class="auth-header">
                        <div class="auth-logo">
                            <i data-lucide="user-plus" style="width: 24px; height: 24px;"></i>
                        </div>
                        <h2>ایجاد حساب کاربری</h2>
                        <p>عضو باشگاه مشتریان آذران تحریر شوید</p>
                    </div>

                    <form id="register-form" class="auth-form">
                        <div class="form-group">
                            <label for="reg-name">نام و نام خانوادگی</label>
                            <div class="input-with-icon">
                                <input type="text" id="reg-name" required placeholder="مثال: علی رضایی">
                                <i data-lucide="user" class="input-icon"></i>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reg-email">آدرس ایمیل</label>
                            <div class="input-with-icon">
                                <input type="email" id="reg-email" required placeholder="name@domain.com">
                                <i data-lucide="mail" class="input-icon"></i>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reg-password">رمز عبور</label>
                            <div class="input-with-icon">
                                <input type="password" id="reg-password" required placeholder="حداقل ۶ کاراکتر">
                                <i data-lucide="lock" class="input-icon"></i>
                                <span class="password-toggle-btn" onclick="togglePasswordVisibility('reg-password', this)">
                                    <i data-lucide="eye" style="width:16px;height:16px;"></i>
                                </span>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary w-full">ثبت‌نام و عضویت</button>
                    </form>

                    <div style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: var(--text-secondary);">
                        قبلاً ثبت‌نام کرده‌اید؟ 
                        <span class="auth-toggle-link" onclick="toggleAuthCard('login')">ورود کاربران</span>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Interactive Events setups
function setupEventListeners() {
    // Navigation routing
    document.querySelectorAll('[data-page]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const page = el.getAttribute('data-page');
            renderPage(page);
            closeMobileDrawer();
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileDrawerClose = document.getElementById('mobile-drawer-close');
    
    menuToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('active');
    });
    
    mobileDrawerClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
    });

    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Cart Drawer actions
    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartShopNow = document.getElementById('cart-shop-now');

    const openCart = () => {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
    };
    
    const closeCart = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    cartShopNow.addEventListener('click', () => {
        closeCart();
        renderPage('products');
    });

    // Modal Close
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        document.getElementById('product-modal').classList.remove('active');
    });

    // Checkout Trigger
    document.getElementById('checkout-btn-action').addEventListener('click', () => {
        closeCart();
        openCheckoutModal();
    });

    document.getElementById('checkout-modal-close').addEventListener('click', () => {
        document.getElementById('checkout-modal').classList.remove('active');
    });

    // Search bar live filter / Autocomplete
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-results');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
            searchDropdown.classList.add('hidden');
            return;
        }

        const matches = products.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.desc.toLowerCase().includes(query) || 
            p.categoryFarsi.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            searchDropdown.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">محصولی یافت نشد.</div>`;
        } else {
            searchDropdown.innerHTML = matches.map(p => `
                <div class="search-result-item" onclick="handleSearchResultClick(${p.id})">
                    <img src="${p.image}" class="search-result-img" alt="">
                    <div class="search-result-details">
                        <span class="search-result-title">${p.title}</span>
                        <span class="search-result-price">${toPersianDigits(p.price.toLocaleString())} تومان</span>
                    </div>
                </div>
            `).join('');
        }
        searchDropdown.classList.remove('hidden');
    });

    // Hide search result dropdown on blur
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            searchDropdown.classList.add('hidden');
        }
    });

    // Checkout Form Submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    // Sync bank card preview inputs
    const cardNumInput = document.getElementById('card-number');
    const cardHolderInput = document.getElementById('checkout-name');

    cardNumInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, ''); // Non digits removal
        let formatted = '';
        for (let i = 0; i < val.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += ' ';
            }
            formatted += val[i];
        }
        e.target.value = formatted;
        
        let digits = toPersianDigits(formatted);
        document.getElementById('card-number-preview').innerText = digits || '•••• •••• •••• ••••';
    });

    cardHolderInput.addEventListener('input', (e) => {
        document.getElementById('card-holder-preview').innerText = e.target.value || 'نام شما';
    });

    // Payment method switch card section display
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            const radio = opt.querySelector('input[type="radio"]');
            radio.checked = true;
            
            const cardSection = document.getElementById('card-simulation-section');
            if (radio.value === 'online') {
                cardSection.style.display = 'flex';
                document.getElementById('card-number').required = true;
                document.getElementById('card-cvv2').required = true;
            } else {
                cardSection.style.display = 'none';
                document.getElementById('card-number').required = false;
                document.getElementById('card-cvv2').required = false;
            }
        });
    });
}

function handleSearchResultClick(prodId) {
    document.getElementById('search-results').classList.add('hidden');
    document.getElementById('search-input').value = '';
    openProductModal(prodId);
}

function closeMobileDrawer() {
    document.getElementById('mobile-drawer').classList.remove('active');
}

// Category filter trigger (Home screen shortcuts)
function filterByCategory(category) {
    renderPage('products');
    setTimeout(() => {
        const catBtn = document.querySelector(`.category-filter-btn[data-category="${category}"]`);
        if (catBtn) catBtn.click();
    }, 100);
}

// Home specific events
function setupHomeEvents() {
    // Add page links in footer bottom redirecting
    document.querySelectorAll('.footer-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            renderPage(link.getAttribute('data-page'));
        });
    });
    
    document.querySelectorAll('.footer-category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterByCategory(link.getAttribute('data-category'));
        });
    });
}

// Products Catalog Page Event Setups
function setupProductsEvents() {
    // Category click handler
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            renderProductGrid();
        });
    });

    // Price range slider handler
    const priceSlider = document.getElementById('price-range-slider');
    const priceSliderVal = document.getElementById('price-slider-value');
    
    priceSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        maxPriceFilter = val;
        priceSliderVal.innerText = toPersianDigits(val.toLocaleString());
        renderProductGrid();
    });

    // Sorting selector
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProductGrid();
    });
}

// Product filtering and sorting engine
function renderProductGrid() {
    let filtered = products;

    // Filter by Category
    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by Price
    filtered = filtered.filter(p => p.price <= maxPriceFilter);

    // Sort
    if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    const grid = document.getElementById('catalog-products-grid');
    const countLabel = document.getElementById('filtered-count');
    
    if (countLabel) {
        countLabel.innerText = toPersianDigits(filtered.length);
    }

    if (!grid) return;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary); background: var(--glass-card); border: 1px solid var(--border-color); border-radius:20px;">
                <i data-lucide="info" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <p>هیچ محصولی با معیارهای انتخابی شما پیدا نشد.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    grid.innerHTML = filtered.map(prod => `
        <div class="product-card" data-id="${prod.id}">
            <div class="product-card-img-wrapper" onclick="openProductModal(${prod.id})">
                ${prod.isNew ? '<span class="badge-new">جدید</span>' : ''}
                <img src="${prod.image}" alt="${prod.title}" class="product-card-img" onerror="this.src='https://via.placeholder.com/300'">
            </div>
            <div class="product-card-info">
                <span class="product-card-category">${prod.categoryFarsi}</span>
                <h3 class="product-card-title" onclick="openProductModal(${prod.id})">${prod.title}</h3>
                <div class="product-rating">
                    <i data-lucide="star" style="fill: var(--primary); stroke: none; width: 14px; height: 14px;"></i>
                    <span>${toPersianDigits(prod.rating.toFixed(1))}</span>
                </div>
                <div class="product-card-footer">
                    <div class="product-card-price">
                        <span class="price-amount">${toPersianDigits(prod.price.toLocaleString())}</span>
                        <span class="price-unit">تومان</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${prod.id})" title="افزودن به سبد خرید">
                        <i data-lucide="plus" style="width: 18px; height: 18px;"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Product Quick View Modal Render
window.openProductModal = function(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    const container = document.getElementById('modal-detail-container');
    
    // Generate specs HTML rows
    const specsHTML = Object.entries(prod.specs).map(([label, val]) => `
        <div class="spec-item">
            <span class="spec-label">${label}: </span>
            <span class="spec-val">${toPersianDigits(val)}</span>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="modal-gallery">
            <img src="${prod.image}" alt="${prod.title}" onerror="this.src='https://via.placeholder.com/400'">
        </div>
        <div class="modal-details">
            <span class="modal-details-category">${prod.categoryFarsi}</span>
            <h2 class="modal-details-title">${prod.title}</h2>
            <div class="product-rating">
                <i data-lucide="star" style="fill: var(--primary); stroke: none; width: 16px; height: 16px;"></i>
                <span>${toPersianDigits(prod.rating.toFixed(1))} | نظر خریداران</span>
            </div>
            <div class="modal-details-price">${toPersianDigits(prod.price.toLocaleString())} تومان</div>
            <p class="modal-details-desc">${prod.desc}</p>
            
            <div class="modal-specs">
                ${specsHTML}
            </div>

            <button class="btn btn-primary w-full" style="margin-top: auto;" onclick="addToCartAndClose(${prod.id})">
                <i data-lucide="shopping-cart"></i>
                <span>افزودن به سبد خرید</span>
            </button>
        </div>
    `;

    document.getElementById('product-modal').classList.add('active');
    lucide.createIcons();
};

window.addToCartAndClose = function(id) {
    addToCart(id);
    document.getElementById('product-modal').classList.remove('active');
};

// Cart Engine Implementation
window.addToCart = function(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            image: prod.image,
            qty: 1
        });
    }

    localStorage.setItem('azaran_cart', JSON.stringify(cart));
    updateCartUI();
    
    // Add micro-animation effect to cart badge
    const badge = document.getElementById('cart-count');
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => badge.style.transform = 'scale(1)', 300);

    // Dynamic toast simulation instead of blocking alert
    showToastNotification(`«${prod.title}» به سبد خرید افزوده شد.`);
};

function showToastNotification(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(20, 24, 33, 0.95);
        color: #fff;
        border: 1px solid var(--primary);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 0.9rem;
        backdrop-filter: blur(8px);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    // Animate In
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 50);

    // Animate Out
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

window.updateQty = function(id, amt) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += amt;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    
    localStorage.setItem('azaran_cart', JSON.stringify(cart));
    updateCartUI();
};

window.removeItem = function(id) {
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('azaran_cart', JSON.stringify(cart));
    updateCartUI();
};

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-count');
    const footer = document.getElementById('cart-footer');
    const emptyState = document.getElementById('empty-cart-state');

    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    badge.innerText = toPersianDigits(totalQty);
    
    if (totalQty > 0) {
        badge.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');
        if (footer) footer.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
        if (footer) footer.classList.add('hidden');
        container.innerHTML = `
            <div class="empty-cart" id="empty-cart-state">
                <i data-lucide="shopping-bag" class="empty-cart-icon"></i>
                <p>سبد خرید شما در حال حاضر خالی است.</p>
                <button class="btn btn-primary" onclick="renderPage('products'); document.getElementById('cart-drawer').classList.remove('active'); document.getElementById('cart-overlay').classList.remove('active');">شروع خرید</button>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    // Render item rows
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-price">${toPersianDigits(item.price.toLocaleString())} تومان</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <span class="qty-val">${toPersianDigits(item.qty)}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            </div>
            <i data-lucide="trash-2" class="remove-cart-item" onclick="removeItem(${item.id})" style="width: 18px; height: 18px;"></i>
        </div>
    `).join('');

    // Summary calculations
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    document.getElementById('cart-subtotal').innerText = toPersianDigits(subtotal.toLocaleString()) + ' تومان';
    document.getElementById('cart-total').innerText = toPersianDigits(subtotal.toLocaleString()) + ' تومان';
    
    lucide.createIcons();
}

// Checkout Modal trigger
function openCheckoutModal() {
    if (cart.length === 0) return;
    
    document.getElementById('checkout-success-view').classList.add('hidden');
    document.getElementById('checkout-form-view').classList.remove('hidden');
    
    // Default form fills if user is logged in
    if (currentUser) {
        document.getElementById('checkout-name').value = currentUser.name;
        document.getElementById('card-holder-preview').innerText = currentUser.name;
    }
    
    document.getElementById('checkout-modal').classList.add('active');
}

// Checkout Form submission simulation
function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const checkoutFormView = document.getElementById('checkout-form-view');
    const successView = document.getElementById('checkout-success-view');
    
    const clientName = document.getElementById('checkout-name').value;
    const clientPhone = document.getElementById('checkout-phone').value;
    const clientAddress = document.getElementById('checkout-address').value;
    
    // Show loading spinner simulation on the button
    const submitBtn = e.target.querySelector('.submit-order-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span class="spinner" style="display:inline-block; width: 18px; height: 18px; border:2px solid #000; border-top-color:transparent; border-radius:50%; animation: spin 0.8s linear infinite;"></span>
        <span>در حال تراکنش بانکی شتاب...</span>
    `;

    // Inject simple spinner animation styling dynamically if not in css
    const style = document.createElement('style');
    style.innerHTML = `@keyframes spin { to { transform: rotate(-360deg); } }`;
    document.head.appendChild(style);

    setTimeout(() => {
        // Success state
        checkoutFormView.classList.add('hidden');
        successView.classList.remove('hidden');
        
        const orderId = toPersianDigits(Math.floor(100000 + Math.random() * 900000));
        const totalPaid = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        
        successView.innerHTML = `
            <i data-lucide="check-circle" class="checkout-success-icon"></i>
            <h2>سفارش شما با موفقیت ثبت شد!</h2>
            <p style="margin: 0.5rem 0 1.5rem 0;">مجموع پرداختی: <strong style="color:var(--primary); font-family: var(--font-en);">${toPersianDigits(totalPaid.toLocaleString())} تومان</strong></p>
            <div style="background: rgba(0,0,0,0.15); padding: 1.25rem; border-radius: 12px; font-size: 0.9rem; text-align: right; display:flex; flex-direction:column; gap:0.5rem;">
                <div><span style="color:var(--text-muted)">کد رهگیری سفارش:</span> <strong>${orderId}</strong></div>
                <div><span style="color:var(--text-muted)">گیرنده:</span> <strong>${clientName}</strong></div>
                <div><span style="color:var(--text-muted)">شماره تماس:</span> <strong style="font-family: var(--font-en);">${toPersianDigits(clientPhone)}</strong></div>
                <div><span style="color:var(--text-muted)">آدرس ارسال:</span> <strong>${clientAddress}</strong></div>
                <div><span style="color:var(--text-muted)">زمان تحویل تقریبی:</span> <strong style="color:#10b981">۲ الی ۳ روز کاری (پست سفارشی رایگان)</strong></div>
            </div>
            <button class="btn btn-primary" onclick="closeCheckoutAndResetCart()" style="margin-top: 1.5rem;">بستن و بازگشت به فروشگاه</button>
        `;
        
        lucide.createIcons();
    }, 2500);
}

window.closeCheckoutAndResetCart = function() {
    document.getElementById('checkout-modal').classList.remove('active');
    cart = [];
    localStorage.removeItem('azaran_cart');
    updateCartUI();
    renderPage('home');
};

// Authentication switching
function toggleAuthCard(mode) {
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');
    
    if (mode === 'register') {
        loginCard.classList.add('hidden');
        registerCard.classList.remove('hidden');
    } else {
        loginCard.classList.remove('hidden');
        registerCard.classList.add('hidden');
    }
    lucide.createIcons();
}

function togglePasswordVisibility(id, iconEl) {
    const input = document.getElementById(id);
    if (input.type === 'password') {
        input.type = 'text';
        iconEl.innerHTML = `<i data-lucide="eye-off" style="width:16px;height:16px;"></i>`;
    } else {
        input.type = 'password';
        iconEl.innerHTML = `<i data-lucide="eye" style="width:16px;height:16px;"></i>`;
    }
    lucide.createIcons();
}

// Authentication Forms Event setups
function setupLoginEvents() {
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            
            // Simulating successful login
            currentUser = {
                name: email.split('@')[0], // Extract username from email
                email: email
            };
            
            localStorage.setItem('azaran_user', JSON.stringify(currentUser));
            updateUserUI();
            showToastNotification(`خوش آمدید، ${currentUser.name}! ورود با موفقیت انجام شد.`);
            renderPage('home');
        });
    }

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            
            // Simulating registration
            currentUser = {
                name: name,
                email: email
            };
            
            localStorage.setItem('azaran_user', JSON.stringify(currentUser));
            updateUserUI();
            showToastNotification(`عضویت شما با موفقیت ثبت شد، ${name}!`);
            renderPage('home');
        });
    }
}

function updateUserUI() {
    const loginBtn = document.getElementById('login-nav-btn');
    const profileBadge = document.getElementById('user-profile');
    const userNameSpan = document.getElementById('user-display-name');
    const avatarDiv = document.getElementById('user-avatar');
    
    if (currentUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (profileBadge) profileBadge.classList.remove('hidden');
        if (userNameSpan) userNameSpan.innerText = currentUser.name;
        if (avatarDiv) avatarDiv.innerText = currentUser.name.charAt(0).toUpperCase();
        
        // Setup logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            currentUser = null;
            localStorage.removeItem('azaran_user');
            updateUserUI();
            showToastNotification("خروج از حساب کاربری انجام شد.");
            renderPage('home');
        });
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (profileBadge) profileBadge.classList.add('hidden');
    }
}
