// ========================================
// DOMContentLoaded - ページ読み込み時の初期化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initFAQ();
    initScrollToTop();
    initContactForm();
    initHeaderScroll();
    initAnimations();
});

// ========================================
// スムーススクロール
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 空のハッシュやページトップのみの場合はスキップ
            if (href === '#' || href === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// FAQアコーディオン
// ========================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // すべてのFAQを閉じる
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // クリックされたFAQが閉じていた場合は開く
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ========================================
// スクロールトップボタン
// ========================================
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    // スクロール時の表示/非表示
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // クリック時のスクロール
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// お問い合わせフォーム
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // フォームデータの取得
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            message: document.getElementById('message').value
        };

        // バリデーション
        if (!validateForm(formData)) {
            return;
        }

        // 送信処理（実際のプロジェクトではバックエンドAPIを呼び出す）
        console.log('フォームデータ:', formData);

        // 成功メッセージの表示
        showMessage('お問い合わせありがとうございます。\n担当者より2営業日以内にご連絡いたします。', 'success');

        // フォームのリセット
        contactForm.reset();
    });
}

// ========================================
// フォームバリデーション
// ========================================
function validateForm(formData) {
    // 名前のチェック
    if (!formData.name || formData.name.trim() === '') {
        showMessage('お名前を入力してください。', 'error');
        return false;
    }

    // メールアドレスのチェック
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
        showMessage('有効なメールアドレスを入力してください。', 'error');
        return false;
    }

    // お墓の場所のチェック
    if (!formData.location || formData.location.trim() === '') {
        showMessage('お墓の場所を入力してください。', 'error');
        return false;
    }

    // お問い合わせ内容のチェック
    if (!formData.message || formData.message.trim() === '') {
        showMessage('お問い合わせ内容を入力してください。', 'error');
        return false;
    }

    return true;
}

// ========================================
// メッセージ表示
// ========================================
function showMessage(message, type) {
    // 既存のメッセージがあれば削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // メッセージ要素の作成
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;

    // スタイルの設定
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginTop = '1rem';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.fontWeight = '600';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.animation = 'fadeIn 0.3s ease';

    if (type === 'success') {
        messageDiv.style.backgroundColor = '#e8f5e9';
        messageDiv.style.color = '#2d7a4f';
        messageDiv.style.border = '2px solid #2d7a4f';
    } else {
        messageDiv.style.backgroundColor = '#ffebee';
        messageDiv.style.color = '#c62828';
        messageDiv.style.border = '2px solid #c62828';
    }

    // フォームの後に挿入
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(messageDiv);

    // 5秒後に自動的に削除
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

// ========================================
// ヘッダーのスクロール時の動作
// ========================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // スクロールダウン時
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            // スクロールアップ時
            header.style.transform = 'translateY(0)';
        }

        // スクロール位置によってヘッダーに影を追加
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// スクロールアニメーション
// ========================================
function initAnimations() {
    // Intersection Observer の設定
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象の要素
    const animateElements = document.querySelectorAll(
        '.problem-card, .feature-card, .flow-step, .pricing-card, .testimonial-card, .faq-item'
    );

    animateElements.forEach((element, index) => {
        // 初期状態の設定
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        // 監視開始
        observer.observe(element);
    });
}

// ========================================
// アニメーション用のCSSキーフレーム（動的追加）
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }

    .header {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);

// ========================================
// ユーティリティ関数
// ========================================

// デバウンス関数（パフォーマンス最適化用）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スロットル関数（パフォーマンス最適化用）
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// コンソールメッセージ
// ========================================
console.log('%c茨城・お墓参り代行サービス', 'color: #2d7a4f; font-size: 20px; font-weight: bold;');
console.log('%cWebサイトが正常に読み込まれました', 'color: #4a9d6f; font-size: 14px;');
