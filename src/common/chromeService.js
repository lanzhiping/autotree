const onInstalled = (listener) => {
    chrome.runtime.onInstalled.addListener(listener);
};

const onPageChanged = (rules) => {
    chrome.declarativeContent.onPageChanged.removeRules(() => {
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });
};

const getCurrentTab = () => (
    new Promise((resolve) => (
        chrome.tabs.getCurrent((tab) => resolve(tab))
    ))
);

const runOnCurrentTab = (scriptFile) => {
    getCurrentTab().then((tab) => {
        if (tab) {
            chrome.tabs.executeScript(tab.id, { file: scriptFile });
        }
    })
};

const saveSetting = (integrateOctotree) => new Promise((resolve) => {
    chrome.storage.sync.set({
        'autotree-setting': JSON.stringify({
            integrateOctotree
        })
    }, () => resolve());
});

const getSetting = () => new Promise((resolve) => {
    chrome.storage.sync.get('autotree-setting', (data) => {
        let value;
        try {
            value = JSON.parse(data['autotree-setting'])
        } catch (e) {
            value = { integrateOctotree: false };
        }

        resolve(value);
    });
});

module.exports = {
    runOnCurrentTab,
    onInstalled,
    onPageChanged,
    saveSetting,
    getSetting
};
