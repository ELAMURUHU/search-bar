function search() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!searchTerm) {
        return;
    }
    window.location.href = `search-result.html?searchTerm=${encodeURIComponent(searchTerm)}`;
}
function displaySearchResults(searchTerm) {
    // Array of URLs of your HTML pages
    const pageUrls = ['/index.html', '/bharath.html', '/ela.html']; // Add all your page URLs here

    let allResults = [];
    for (let url of pageUrls) {
        fetchPageContents(url, searchTerm)
            .then(results => {
                allResults = allResults.concat(results);
                displayResults(allResults);
            })
            .catch(error => {
                console.error(`Error fetching page ${url}: ${error}`);
            });
    }
}

async function fetchPageContents(url, searchTerm) {
    const response = await fetch(url);
    const htmlContent = await response.text();
    return searchInPage(htmlContent, searchTerm);
}

// function searchInPage(htmlContent, searchTerm) {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlContent, 'text/html');
//     const elements = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6,img'); // Adjust according to your content structure
//     const results = [];

//     elements.forEach(element => {
//         if (element.textContent.toLowerCase().includes(searchTerm)) {
//             results.push(element.outerHTML);
//         }
//     });

//     return results;
// }
function searchInPage(htmlContent, searchTerm) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const elements = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, img'); // Include img tags

    const results = [];
    console.log(results);
    elements.forEach(element => {
        if (element.tagName.toLowerCase() === 'img') {
            // If the element is an image, search its 'alt' attribute for the searchTerm
            if (element.alt && element.alt.toLowerCase().includes(searchTerm)) {
                results.push(element.outerHTML);
            }
        } else {
            // For other elements, search their text content
            if (element.textContent.toLowerCase().includes(searchTerm)) {
                results.push(element.outerHTML);
            }
        }
    });

    return results;
}

function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(result => {
            searchResultsContainer.innerHTML += result;
        });
    }
}
