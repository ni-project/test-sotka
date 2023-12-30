
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
            const tagsWrapper = container.querySelector('.card__tags-wrapper');
            const tags = tagsWrapper.querySelectorAll('.tag');
            const tagButton = container.querySelector('.js-card-tags-handle');
            let tagItems = [];

            if ( tags.length > 2 ) {
                for (let indexTag = 0; indexTag < tags.length; indexTag++) {
                    tagItems.push(tags[indexTag].innerHTML);
                }
            }

            window.addEventListener('resize', () => this.handleWindowResize(tagsWrapper, tagItems));

            tagButton.addEventListener('click', () => this.handleClickTagButton(tagsWrapper, tagItems));

            this.tagsInit(tagsWrapper, tagItems);
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

    tagsInit = (container, data) => {
        this.handleWindowResize(container, data);
    };

    handleWindowResize = (container, data) => {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        if ( windowWidth < 750 ) {
            if ( !container.closest('.js-card-tags').classList.contains('show') ) {
                const button = container.closest('.js-card-tags').querySelector('.js-card-tags-handle');
                let tagCount = container.querySelectorAll('.tag');

                container.closest('.js-card-tags').classList.add('active');

                for (let index = 0; index < tagCount.length; index++) {
                    tagCount[index].remove();
                }

                for (let index = 0; index < 2; index++) {
                    container.insertAdjacentHTML(`beforeend`, '<div class="tag">'+data[index]+'</div>')
                }

                button.innerText = 'Показать еще ' + String(data.length - 2);
            }
        } else {
            this.getTags(container, data);
        }
    };

    handleClickTagButton = (container, data) => {
        this.getTags(container, data);

        container.closest('.js-card-tags').classList.add('show');
    };

    getTags = (container, data) => {
        let tagCount = container.querySelectorAll('.tag');

        container.closest('.js-card-tags').classList.remove('active');

        for (let index = 0; index < tagCount.length; index++) {
            tagCount[index].remove();
        }

        for (let index = 0; index < data.length; index++) {
            container.insertAdjacentHTML(`beforeend`, '<div class="tag">'+data[index]+'</div>')
        }
    };
}

new AppCard();
