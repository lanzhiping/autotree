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

module.exports = {
    runOnCurrentTab,
    onInstalled,
    onPageChanged
};
