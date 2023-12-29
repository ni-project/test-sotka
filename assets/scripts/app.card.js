
class AppCard {
    constructor() {
        this.bindEvents();
    }

    //-----------------------------------------------------
    // Variables
    //-----------------------------------------------------

    $body = document.querySelector('body');
    $container = this.$body.querySelectorAll('.card');

    //-----------------------------------------------------
    // Bind events
    //-----------------------------------------------------

    bindEvents = () => {
        for (let index = 0; index < this.$container.length; index++) {
            const container = this.$container[index];
            const tagButton = container.querySelector('.js-card-tags-handle');

            tagButton.addEventListener('click', this.handleClickTagButton);

            this.galleryInit(container);
        }
    };

    //-----------------------------------------------------
    // Methods
    //-----------------------------------------------------

    galleryInit = (container) => {
        const gallery = container.querySelector('.card__gallery-container');
        const galleryThumb = container.querySelector('.card__gallery-thumb');

        const swiperThumb = new Swiper(galleryThumb, {
            spaceBetween: 6,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
        });

        const swiperGallery = new Swiper(gallery, {
            spaceBetween: 6,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiperThumb,
            }
        });
    };

    handleClickTagButton() {
        const container = this.closest('.js-card-tags');
        const wrapper = container.querySelector('.js-card-tags-wrapper');

        wrapper.style.maxHeight = '600px';
        this.remove();
    };
}

new AppCard();
