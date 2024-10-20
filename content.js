function replaceText(replacePairs) {
    replacePairs.forEach(([find, replace]) => {
        const regex = new RegExp(find, 'i'); 
        document.body.innerHTML = document.body.innerHTML.replace(regex, `<span style="background-color: yellow;">${replace}</span>`);
    });
}
chrome.storage.local.get(['replacePairs'], function(result) {
    if (result.replacePairs) {
        const replacePairs = new Map(result.replacePairs);
        replaceText(Array.from(replacePairs.entries()));
    }
});
