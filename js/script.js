// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initVideoPlayer();
    initImageGallery();
    initScrollAnimations();
});

// 初始化导航菜单
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // 切换菜单显示/隐藏
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 点击导航项后关闭菜单（移动端）
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// 初始化视频播放器
function initVideoPlayer() {
    const video = document.getElementById('main-video');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const volumeBtn = document.querySelector('.volume-btn');
    const volumeSlider = document.querySelector('.volume-slider');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const videoPlayer = document.querySelector('.custom-video-player');

    // 播放/暂停功能
    function togglePlayPause() {
        if (video.paused || video.ended) {
            video.play();
            playPauseBtn.classList.add('playing');
        } else {
            video.pause();
            playPauseBtn.classList.remove('playing');
        }
    }

    // 格式化时间
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 更新进度条
    function updateProgress() {
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(video.currentTime);
    }

    // 设置视频时长
    function setDuration() {
        durationEl.textContent = formatTime(video.duration);
    }

    // 点击进度条跳转
    function seek(e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    }

    // 切换音量
    function toggleMute() {
        if (video.muted) {
            video.muted = false;
            volumeBtn.classList.remove('muted');
            volumeSlider.value = video.volume;
        } else {
            video.muted = true;
            volumeBtn.classList.add('muted');
            volumeSlider.value = 0;
        }
    }

    // 调节音量
    function adjustVolume() {
        video.volume = volumeSlider.value;
        if (video.volume > 0) {
            video.muted = false;
            volumeBtn.classList.remove('muted');
        } else {
            video.muted = true;
            volumeBtn.classList.add('muted');
        }
    }

    // 切换全屏
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            videoPlayer.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            fullscreenBtn.classList.add('fullscreen');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenBtn.classList.remove('fullscreen');
            }
        }
    }

    // 监听全屏变化
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            fullscreenBtn.classList.remove('fullscreen');
        }
    });

    // 添加事件监听器
    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setDuration);
    progressBar.addEventListener('click', seek);
    volumeBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', adjustVolume);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
}

// 初始化图片画廊
function initImageGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const imageViewer = document.getElementById('imageViewer');
    const viewerImage = document.querySelector('.viewer-image');
    const viewerCaption = document.querySelector('.viewer-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // 图片数据（实际项目中可以从服务器获取）
    const images = [
        { src: 'assets/images/21film-photo-01-vrchat.png', alt: '21号胶片作品 01' },
        { src: 'assets/images/21film-photo-02-vrchat.png', alt: '21号胶片作品 02' },
        { src: 'assets/images/21film-photo-03-vrchat.png', alt: '21号胶片作品 03' },
        { src: 'assets/images/21film-photo-04-vrchat.png', alt: '21号胶片作品 04' },
        { src: 'assets/images/21film-photo-05-vrchat.png', alt: '21号胶片作品 05' },
        { src: 'assets/images/21film-photo-06-vrchat.png', alt: '21号胶片作品 06' },
        { src: 'assets/images/21film-photo-07-vrchat.png', alt: '21号胶片作品 07' },
        { src: 'assets/images/21film-photo-08-vrchat.png', alt: '21号胶片作品 08' },
        { src: 'assets/images/21film-photo-09-vrchat.png', alt: '21号胶片作品 09' },
        { src: 'assets/images/21film-photo-10-vrchat.png', alt: '21号胶片作品 10' },
        { src: 'assets/images/21film-photo-11-vrchat.png', alt: '21号胶片作品 11' },
        { src: 'assets/images/21film-photo-12-vrchat.png', alt: '21号胶片作品 12' },
        { src: 'assets/images/21film-photo-13-vrchat.png', alt: '21号胶片作品 13' },
        { src: 'assets/images/21film-photo-14-vrchat.png', alt: '21号胶片作品 14' },
        { src: 'assets/images/21film-photo-15-vrchat.png', alt: '21号胶片作品 15' },
        { src: 'assets/images/21film-photo-16-vrchat.png', alt: '21号胶片作品 16' },
        { src: 'assets/images/21film-photo-17-vrchat.png', alt: '21号胶片作品 17' },
        { src: 'assets/images/21film-photo-18-vrchat.png', alt: '21号胶片作品 18' },
        { src: 'assets/images/21film-photo-19-vrchat.png', alt: '21号胶片作品 19' }
    ];

    let currentImageIndex = 0;

    // 动态生成图片画廊
    function generateImageGallery() {
        galleryGrid.innerHTML = '';
        
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item fade-in';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
            `;
            
            // 添加点击事件，打开图片查看器
            galleryItem.addEventListener('click', () => {
                openImageViewer(index);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }

    // 打开图片查看器
    function openImageViewer(index) {
        currentImageIndex = index;
        const image = images[index];
        viewerImage.src = image.src;
        viewerImage.alt = image.alt;
        viewerCaption.textContent = image.alt;
        imageViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭图片查看器
    function closeImageViewer() {
        imageViewer.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 显示上一张图片
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const image = images[currentImageIndex];
        viewerImage.src = image.src;
        viewerImage.alt = image.alt;
        viewerCaption.textContent = image.alt;
    }

    // 显示下一张图片
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const image = images[currentImageIndex];
        viewerImage.src = image.src;
        viewerImage.alt = image.alt;
        viewerCaption.textContent = image.alt;
    }

    // 添加键盘事件支持
    function handleKeyPress(e) {
        if (imageViewer.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeImageViewer();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    }

    // 添加事件监听器
    closeBtn.addEventListener('click', closeImageViewer);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    document.addEventListener('keydown', handleKeyPress);

    // 点击模态框背景关闭查看器
    imageViewer.addEventListener('click', function(e) {
        if (e.target === this) {
            closeImageViewer();
        }
    });

    // 生成图片画廊
    generateImageGallery();
}

// 初始化滚动动画
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    // 初始检查
    checkFadeElements();
    
    // 滚动时检查
    window.addEventListener('scroll', checkFadeElements);
}

// 平滑滚动到锚点（如果浏览器不支持原生scroll-behavior）
function smoothScrollToAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 添加窗口大小变化事件监听器
window.addEventListener('resize', function() {
    // 可以在这里添加响应式调整逻辑
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // 当窗口从移动端切换到桌面端时，确保菜单是关闭状态
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 可以在这里添加页面完全加载后的逻辑
    console.log('页面加载完成');
});