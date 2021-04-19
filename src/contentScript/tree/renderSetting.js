const renderSetting = () => {
    const setting = document.createElement('div');
    setting.setAttribute('id', 'autotree-setting');
    setting.innerHTML = `
        <input type="checkbox" id="integrate-octotree" name="integrate-octotree" value="true">
        <label id="integrate-octotree-label" for="integrate-octotree">Integrate Octotree</label><br>
    `;
    return setting;
};

module.exports = renderSetting;