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

const convertToTree = (fileLinks) => {
    const tree = {};

    Array.prototype.forEach.call(fileLinks, (fileLink) => {
        const { title: fullPath, href } = fileLink;
        const hash = new URL(href).hash;
        const paths = fullPath.split('/');

        if (paths.length === 1) {
            tree[fullPath] = hash;
        } else {
            let map = tree;
            paths.forEach(path => {
                if (map[path]) {
                    map = map[path];
                } else {
                    map[path] = path.includes('.') ? hash : {};
                    map = map[path];
                }
            });
        }
    });

    return tree;
}

module.exports = convertToTree;
