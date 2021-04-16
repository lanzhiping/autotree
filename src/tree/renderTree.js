/*
    Node Example
    {
        path: {
            to: {
                file1.js: "hash_value_1",
                file2.js: "hash_value_2"
            }
        }
    }
*/

const getFileStat = (hash) => {
    const statEle = document.querySelector(`${hash} a[href$="${hash}"]`);
    return statEle ? statEle.previousElementSibling.outerHTML : '';
};

const renderFile = (path, hash) => (
    `<li class="autotree-file">
        ${getFileStat(hash)}
        <a href="${hash}">${path}</a>
    </li>`
);

const renderFolder = (path, children) => (
    `<li class="autotree-folder">
        <span data-folder-id="${path}">${path}</span>
        <ul class="autotree-list">${children}</ul>
    </li>`
);

const renderTreeEle = (tree) => {
    const paths = Object.keys(tree);
    const filePaths = paths.filter(path => typeof tree[path] === 'string');
    const folderPaths = paths.filter(path => typeof tree[path] === 'object');

    const fileEles = filePaths.map(path => renderFile(path, tree[path]));
    const folderEles = folderPaths.map((path) => {
        const subTreeEle = renderTreeEle(tree[path]);
        const folderEle = renderFolder(path, subTreeEle);

        return folderEle;
    });

    return [...folderEles, ...fileEles].join('');
}

module.exports = renderTreeEle;
