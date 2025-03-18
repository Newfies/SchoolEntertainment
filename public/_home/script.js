function handler(element) {
    const pElement = element.querySelector('.title');
    const appValue = pElement.getAttribute('app');
    const openValue = pElement.getAttribute('open');

    const validOpenValues = ['ruffed', 'screened', 'emupage1', 'newtab'];

    if (!validOpenValues.includes(openValue)) {
        console.error('Error: Invalid "open" value:', openValue);
        alert('Error: Invalid "open" value.');
        return;
    } else {
        if (openValue){
            if (openValue == "newtab"){
                newtab()
            }
        }
    }

    function newtab(){
        let setUrl;
        if (appValue){
            setUrl = `options/${appValue}/index.html`
        }
        const url = `${setUrl}`;
        
        // Load With Url - Disabled
        if (1 == 2){
            window.open(url);
            return
        }

        // Open a blank window
        const win = window.open('about:blank', '_blank');

        if (win) {
            win.document.body.style.margin = '0';
            win.document.body.style.height = '100vh';

            // Create an iframe and set the source
            const iframe = win.document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.margin = '0';
            iframe.src = url;

            // Append the iframe to the new window's body
            win.document.body.appendChild(iframe);
        } else {
            console.error('Popup blocked or failed to open.');
            alert('Error: Unable to open new window.');
        }
    }

    function emupage1(){
        const url = `emupage1?load=${appValue}`;
        
        // Open a blank window
        const win = window.open('about:blank', '_blank');

        if (win) {
            win.document.body.style.margin = '0';
            win.document.body.style.height = '100vh';

            // Create an iframe and set the source
            const iframe = win.document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.margin = '0';
            iframe.src = url;

            // Append the iframe to the new window's body
            win.document.body.appendChild(iframe);
        } else {
            console.error('Popup blocked or failed to open.');
            alert('Error: Unable to open new window.');
        }
    }

    console.log('App Value:', appValue);
    console.log('Open Value:', openValue);

    // Continue with your logic here using appValue
}