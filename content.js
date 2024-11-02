function replaceText(replacePairs) {
    replacePairs.forEach(([find, replace]) => {
        highlightText(find,replace)
    });
}

function highlightText(findText, replaceText) {
    const regex = new RegExp(`(${findText})`, 'gi'); // Capture only the matched text
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while ((node = walker.nextNode())) {
        if (node.nodeValue.match(regex)) {
            const parent = node.parentNode;
            const newHTML = node.nodeValue.replace(regex, `<span style="background-color: yellow;">${replaceText}</span>`);
            const tempContainer = document.createElement('span');
            tempContainer.innerHTML = newHTML;
            while (tempContainer.firstChild) {
                parent.insertBefore(tempContainer.firstChild, node);
            }
            parent.removeChild(node); // Remove the original text node
        }
    }
}

chrome.storage.local.get(['replacePairs'], function(result) {
    if (result.replacePairs) {
        const replacePairs = new Map(result.replacePairs);
        replaceText(Array.from(replacePairs.entries()));
    }
});
