let replaceMap = new Map();


chrome.storage.local.get(['replacePairs'], function(result) {
    if (result.replacePairs) {
        replaceMap = new Map(result.replacePairs);
        console.log('Loaded replace pairs:', replaceMap);
    }
    displayStoredPairs();
});

function displayStoredPairs() {
    const storedPairsList = document.getElementById('storedPairs');
    storedPairsList.innerHTML = ''; 

    replaceMap.forEach((replace, find) => {
        const listItem = document.createElement('li');
        listItem.className = 'pair';
        listItem.textContent = `${find} ---> ${replace}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            replaceMap.delete(find); 
            saveReplaceMap();
            displayStoredPairs();
        };

        listItem.appendChild(deleteButton);
        storedPairsList.appendChild(listItem);
    });
}

function saveReplaceMap() {
    chrome.storage.local.set({ replacePairs: Array.from(replaceMap.entries()) }, () => {
        console.log('Replace pairs saved:', replaceMap);
    });
}

document.getElementById('replaceButton').addEventListener('click', () => {
    const findText = document.getElementById('findText').value;
    const replaceText = document.getElementById('replaceText').value;

    if (findText && replaceText) {
        replaceMap.set(findText, replaceText);
        saveReplaceMap(); 
        displayStoredPairs();
    } else {
        alert('Both find and replace fields must be filled.');
    }
});
