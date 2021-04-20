const { waitElement, waitDisappearElement } = require('@1natsu/wait-element');
const { getSetting } = require('../common/chromeService');
const integrateOctotreeSidePanel = require('./integrateOctotree');
const {
    convertToTree,
    renderTree,
    renderHeader,
    renderTreeRoot,
    renderSidePanel,
    renderSetting,
    eventListener
} = require('./tree');


const hideAutoTree = (root) => {
    document.body.classList.remove('autotree-show');
    root.classList.add('hide');
};

const render = (root) => {
    const fileLinks = document.querySelectorAll('#files div.file-info a');
    if (fileLinks.length === 0) {
        hideAutoTree(root);
        return;
    }

    const tree = convertToTree(fileLinks);
    const treeEle = renderTree(tree);

    const header = renderHeader();
    const treeRoot = renderTreeRoot(treeEle);
    const setting = renderSetting();
    root.appendChild(header);
    root.appendChild(treeRoot);
    root.appendChild(setting);

    getSetting().then(({ integrateOctotree }) => {
        const setting = root.querySelector('#integrate-octotree');
        setting.checked = integrateOctotree;
    });
};

const waitAndRender = (root, integrateOctotree) => {
    waitElement('#files')
        .then(() => waitDisappearElement('#files include-fragment.diff-progressive-loader'))
        .then(() => {
            render(root);
            if (integrateOctotree) {
                hideAutoTree(root);
                integrateOctotreeSidePanel();
            }
        });
}

const initRendering = (root, integrateOctotree) => {
    const fileLinks = document.querySelectorAll('#files div.file-info a');
    if (fileLinks.length === 0) {
        hideAutoTree(root);
    }

    waitAndRender(root, integrateOctotree);
};

const originOnload = window.onload;
window.onload = () => {
    originOnload && originOnload();

    getSetting().then(({ integrateOctotree }) => {
        const root = renderSidePanel();
        initRendering(root, integrateOctotree);
        eventListener(root);
    });
};
