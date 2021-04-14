const renderHeader = () => {
    const diffstat = document.querySelector('#diffstat');
    const header = document.createElement('div');
    header.classList.add('autotree-header');
    header.innerText = 'Changed files';
    if (diffstat) {
        const stat = diffstat.cloneNode();
        stat.innerHTML = diffstat.innerHTML;
        header.appendChild(stat);
    }
    return header;
};

module.exports = renderHeader;
