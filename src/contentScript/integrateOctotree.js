const elementResizeEvent = require('element-resize-event');

const integrateOctotree = () => {
    const fileLinks = document.querySelectorAll('#files div.file-info a');
    const filesInfo = Array.prototype.reduce.call(fileLinks, (map, link) => {
        const { title: fullPath } = link;
        map[fullPath] = link.getAttribute('href');
        return map;
    }, {});

    const octotree = document.querySelector('.octotree_sidebar');
    if (octotree) {
        octotree.addEventListener('click', (event) => {
            const clickedLink = event.target;

            if (clickedLink.tagName==='A' && clickedLink.href.includes('#')) {
                event.preventDefault();
                event.stopPropagation();
                const filePath = clickedLink.id.replace(/^octotree/, '').replace(/_anchor$/, '');
                const actualHash = filesInfo[filePath];

                window.location.hash = actualHash;
            }
        });

        const html = document.querySelector('html');
        const toggle = octotree.querySelector('.octotree_toggle.btn');
        if (toggle) {
            if (html.className.includes('octotree-show')) {
                document.body.style.paddingLeft = octotree.style.width;
            } else {
                document.body.style.paddingLeft = 0;
            }
            toggle.addEventListener('click', () => {
                setTimeout(() => {
                    if (html.className.includes('octotree-show')) {
                        document.body.style.paddingLeft = octotree.style.width;
                    } else {
                        document.body.style.paddingLeft = 0;
                    }
                }, 100);
            });
        }
        elementResizeEvent(octotree, () => {
            document.body.style.paddingLeft = octotree.style.width;
        });
    }
};

module.exports = integrateOctotree;
