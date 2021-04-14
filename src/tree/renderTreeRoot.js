const renderTreeRoot = (treeEle) => {
    const root = document.createElement('ul');
    root.setAttribute('id', 'autotree-tree');
    root.innerHTML = treeEle;
    return root;
};
module.exports = renderTreeRoot;
