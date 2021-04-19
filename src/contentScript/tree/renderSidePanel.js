const renderSidePanel = () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'autotree');

    const button = document.createElement('button');
    button.setAttribute('id', 'autotree-toggle');
    button.classList.add('autotree-toggle');

    root.appendChild(button);

    document.body.appendChild(root);
    document.body.classList.add('autotree-show');
    return root;
};

module.exports = renderSidePanel;
