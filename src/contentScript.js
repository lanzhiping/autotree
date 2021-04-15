const { waitElement, waitDisappearElement } = require('@1natsu/wait-element');
const {
    convertToTree,
    renderTree,
    renderHeader,
    renderTreeRoot,
    renderSidePanel
} = require('./tree');

const render = (root) => {
    const fileLinks = document.querySelectorAll('#files div.file-info a');
    if (fileLinks.length === 0) {
        document.body.classList.remove('autotree-show');
        root.classList.add('hide');
        return;
    }

    const tree = convertToTree(fileLinks);
    const treeEle = renderTree(tree);

    const header = renderHeader();
    const treeRoot = renderTreeRoot(treeEle);
    root.appendChild(header);
    root.appendChild(treeRoot);
};

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
        }
    });
};

const initRendering = (root) => {
    waitElement('#files')
        .then(() => waitDisappearElement('#files include-fragment.diff-progressive-loader'))
        .then(() => render(root));

    const filesTab = document.querySelector('#repo-content-pjax-container nav a[href$="files"]');
    if (filesTab) {
        filesTab.addEventListener('click', () => {
            waitElement('#files')
                .then(() => waitDisappearElement('#files include-fragment.diff-progressive-loader'))
                .then(() => render(root));
        });
    }
};

const originOnload = window.onload;
window.onload = () => {
    originOnload && originOnload();

    const root = renderSidePanel();
    initRendering(root);
    eventListener(root);
};
