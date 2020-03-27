'use strict'
import images from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightBox: document.querySelector('.js-lightbox'),
    boxImage: document.querySelector('.lightbox__image'),
    modalCloseButton: document.querySelector('.lightbox__button'),
    currentImage: '',
    currentClick: '',
}


const gallery = {
    singlePrieviewBuilder({preview, original, description}){
        return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </li>
        `
    },
    galleryAssembler(arr){
        let result = '';
        arr.forEach(element => {
            result += gallery.singlePrieviewBuilder(element);
        });
        return result;
    },
    insertMarkup(arr){
        const markUp = gallery.galleryAssembler(arr);
        refs.gallery.insertAdjacentHTML('afterbegin', markUp);
    },
    imagePreviewHandler(e){
        e.preventDefault();
        const source = e.target.dataset.source;
        refs.currentClick = e.target.closest('li');
        refs.currentImage = source;
        gallery.showModal.bind(gallery)(source);
    
    },
    showModal(src){
        const modal = refs.lightBox;
        refs.boxImage.setAttribute('src', src)
        modal.classList.add('is-open');
        modal.addEventListener('click', gallery.closeModal);
        window.addEventListener('keydown', gallery.keyFunction);
    
    },
    closeModal(e){ 
        if(e.target === refs.boxImage){
            return;
        };
        const modal = refs.lightBox;
        modal.classList.remove('is-open');
        e.target.removeEventListener('click', gallery.closeModal);
        console.log(e.target);
    },
    keyFunction(e){
        console.log(e.keyCode);
        if(e.keyCode === 27){
            refs.lightBox.classList.remove('is-open');
        }else if(e.keyCode === 39){
            // refs.boxImage.setAttribute('src', src)
            let nextItem = refs.currentClick.nextElementSibling;
            if(refs.currentClick.nextElementSibling === null){
                console.log('right end');
                nextItem = refs.currentClick.parentNode.firstElementChild;
                console.log(nextItem);
                refs.currentClick = refs.currentClick.parentNode.firstElementChild
            }
            
            const nextImage = nextItem.querySelector('.gallery__image').dataset.source;
            console.log(nextImage);
            refs.currentClick = refs.currentClick.nextElementSibling;
            refs.boxImage.setAttribute('src', nextImage);
        }else if(e.keyCode === 37){
            // refs.boxImage.setAttribute('src', src)
            let nextItem = refs.currentClick.previousElementSibling;
            if(refs.currentClick.previousElementSibling === null){
                console.log('left end');
                nextItem = refs.currentClick.parentNode.lastElementChild;
                console.log(nextItem);
                refs.currentClick = refs.currentClick.parentNode.lastElementChild
            }
    
    
            const nextImage = nextItem.querySelector('.gallery__image').dataset.source;
            console.log(nextImage);
            refs.boxImage.setAttribute('src', nextImage);
            refs.currentClick = refs.currentClick.previousElementSibling;
        }
    }
    

}

// function singlePrieviewBuilder({preview, original, description}){
//     return `
//     <li class="gallery__item">
//         <a
//             class="gallery__link"
//             href="${original}"
//         >
//             <img
//             class="gallery__image"
//             src="${preview}"
//             data-source="${original}"
//             alt="${description}"
//             />
//         </a>
//     </li>
//     `
// }


// function galleryAssembler(arr){
//     let result = '';
//     arr.forEach(element => {
//         result += gallery.singlePrieviewBuilder(element);
//     });
//     return result;
// };

// function insertMarkup(arr){
//     const markUp = gallery.galleryAssembler(arr);
//     refs.gallery.insertAdjacentHTML('afterbegin', markUp);
// }

gallery.insertMarkup(images);

// EVENT DELIGATION
refs.gallery.addEventListener('click', gallery.imagePreviewHandler);

// function imagePreviewHandler(e){
//     e.preventDefault();
//     const source = e.target.dataset.source;
//     refs.currentClick = e.target.closest('li');
//     refs.currentImage = source;
//     // console.log(source);
//     showModal(source);

// }


// function showModal(src){
//     const modal = refs.lightBox;
//     refs.boxImage.setAttribute('src', src)
//     modal.classList.add('is-open');
//     modal.addEventListener('click', closeModal);
//     window.addEventListener('keydown', keyFunction);

// }

// function closeModal(e){ 
//     if(e.target === refs.boxImage){
//         return;
//     };
//     const modal = refs.lightBox;
//     modal.classList.remove('is-open');
//     e.target.removeEventListener('click', closeModal);
//     console.log(e.target);
// }

// function keyFunction(e){
//     console.log(e.keyCode);
//     if(e.keyCode === 27){
//         refs.lightBox.classList.remove('is-open');
//     }else if(e.keyCode === 39){
//         // refs.boxImage.setAttribute('src', src)
//         let nextItem = refs.currentClick.nextElementSibling;
//         if(refs.currentClick.nextElementSibling === null){
//             console.log('right end');
//             nextItem = refs.currentClick.parentNode.firstElementChild;
//             console.log(nextItem);
//             refs.currentClick = refs.currentClick.parentNode.firstElementChild
//         }
        
//         const nextImage = nextItem.querySelector('.gallery__image').dataset.source;
//         console.log(nextImage);
//         refs.currentClick = refs.currentClick.nextElementSibling;
//         refs.boxImage.setAttribute('src', nextImage);
//     }else if(e.keyCode === 37){
//         // refs.boxImage.setAttribute('src', src)
//         let nextItem = refs.currentClick.previousElementSibling;
//         if(refs.currentClick.previousElementSibling === null){
//             console.log('left end');
//             nextItem = refs.currentClick.parentNode.lastElementChild;
//             console.log(nextItem);
//             refs.currentClick = refs.currentClick.parentNode.lastElementChild
//         }


//         const nextImage = nextItem.querySelector('.gallery__image').dataset.source;
//         console.log(nextImage);
//         refs.boxImage.setAttribute('src', nextImage);
//         refs.currentClick = refs.currentClick.previousElementSibling;
//     }
// }
