const { saveSetting } = require("../../common/chromeService");

const eventListener = (root) => {
    root.addEventListener('click', (event) => {
        event.stopPropagation();

        const isPathClicked = event.target && event.target.getAttribute('data-folder-id');
        if (isPathClicked) {
            event.target.parentElement.classList.toggle('show');
            return;
        }

        const isFileClicked = event.target.tagName === 'A';
        if (isFileClicked) {
            const currentSelected = event.currentTarget.querySelector('.autotree-file.clicked');
            if (currentSelected) {
                currentSelected.classList.remove('clicked');
            }

            event.target.parentElement.classList.add('clicked');
            return;
        }

        const isToggleClicked = event.target.tagName === 'BUTTON';
        if (isToggleClicked) {
            document.body.classList.toggle('autotree-show');
            root.classList.toggle('hide');
            return;
        }

        const isIntegrateOctotreeClicked = event.target.id === 'integrate-octotree-label';
        if (isIntegrateOctotreeClicked) {
            setTimeout(() => {
                const integrated = event.target.previousElementSibling.checked;
                saveSetting(integrated);
            }, 100);
            return;
        }
    });
};

module.exports = eventListener;