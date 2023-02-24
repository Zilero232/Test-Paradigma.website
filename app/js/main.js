const html = document.querySelector('html')

//open map//
const mapMain = document.querySelector('.map-icon-2')

if (mapMain) {
    const btn = document.querySelector('button'),
        close = document.querySelector('.map-icon-2__close')

    btn.addEventListener('click', () => mapMain.classList.add('open-map'))
    close.addEventListener('click', () => mapMain.classList.remove('open-map'))
}

//modal form//
const form = document.querySelector('.modal__block-form'),
    orderBtn = document.querySelector('.header__top-items_order'),
    btnCloses = document.querySelectorAll('.modal__block-close'),
    modalBlock = document.querySelectorAll('.modal__block')

const classesModal = ['open-form', 'open-succefull']

function closeModal(idx) {
    if (idx) html.classList.remove(closeModal[idx])
    else classesModal.forEach(item => html.classList.remove(item))
}

if (btnCloses.length) {
    btnCloses.forEach(btn => {
        btn.addEventListener('click', () => closeModal())
    })
}

if (orderBtn) {
    orderBtn.addEventListener('click', () => {
        html.classList.add('open-form')

        window.addEventListener('click', (e) => {
            modalBlock.forEach((block, idx) => {
                if (!block.contains(e.target) && !orderBtn.contains(e.target)) {
                    closeModal(idx)
                }
            })
        })
    })
}

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        closeModal()
        html.classList.add('open-succefull')
    })
}

//phone mask//
const phones = document.querySelectorAll('.phone')

if (phones) {
    phones.forEach(item => {
        IMask(
            item, {
            mask: '+{7}(000)000-00-00'
        });
    })
}

//open header mobile//
const bar = document.querySelector('.bar')

if (bar) {
    bar.addEventListener('click', () => {
        html.classList.toggle('mobile-open')
    })
}