class MyComponent extends HTMLElement {
    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a div element
        const div = document.createElement('div');

        // Define the HTML content as a string variable
        const htmlContent = `
            <link rel="stylesheet" href="styles.css">
            <header class="header">
                <h1>Study-Assistant</h1>
            </header>
            <div class="editor-container" id="main-container">
                <div class="editor-panel" id="left-panel">
                    <div class="toolbar" id="left-toolbar">
                        <div class="view-options">
                            <button class="view-option" id="left-view-code"></button>
                            <button class="view-option" id="left-view-tree"></button>
                            <button class="view-option" id="left-view-text"></button>
                        </div>
                        <div class="toolbar-buttons" id="left-toolbar-buttons">
                            <span class="toolbar-label">Paste your document here</span>
                            <!-- Add toolbar buttons here -->
                        </div>
                    </div>
                    <div class="editor" id="left-editor">
                        <textarea id="left-textarea"></textarea>
                    </div>
                </div>
                <div class="middle-controls" id="controls">
                    <div class="control-btn-container" id="transform-btn-container">
                        <button class="control-btn" id="transform-btn">⏭️</button>
                        <ul class="context-menu" id="context-menu" style="display: none;">
                            <li id="prompt-1">Topic Explainer</li>
                            <!-- <li id="prompt-2">Image Generator</li> -->
                            <li id="prompt-3">Exam Writing Guide</li>
                            <li id="prompt-4">Question Generator</li>
                        </ul>
                    </div>
                </div>
                <div class="editor-panel" id="right-panel">
                    <div class="toolbar" id="right-toolbar">
                        <div class="view-options">
                            <button class="view-option" id="right-view-code"></button>
                            <button class="view-option" id="right-view-tree"></button>
                            <button class="view-option" id="right-view-text"></button>
                        </div>
                        <div class="toolbar-buttons" id="right-toolbar-buttons">
                            <!-- Add toolbar buttons here -->
                            <span class="toolbar-label">Generated AI Response</span>
                        </div>
                    </div>
                    <div class="editor" id="right-editor">
                        <textarea id="right-textarea" readonly></textarea>
                    </div>
                </div>
            </div>
            <script id="local" src="script.js"></script>
        `;

        // Assign the HTML content to div.innerHTML
        div.innerHTML = htmlContent;
        shadow.appendChild(div);

        // Load jQuery
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = (e) => {
            // jQuery is now loaded and can be used
            const body_part = jQuery($(e.currentTarget.parentNode)[0].childNodes[0])

            // Define event handlers
            const handleTransformBtnClick = (event) => {
                event.stopPropagation();
                body_part.find('#context-menu').toggle();
            };

            const handlePrompt1Click = () => {
                makeApiRequest('1');
                body_part.find('#context-menu').hide();
            };

            const handlePrompt2Click = () => {
                makeApiRequest('2');
                body_part.find('#context-menu').hide();
            };

            const handlePrompt3Click = () => {
                makeApiRequest('2');
                body_part.find('#context-menu').hide();
            };

            const handlePrompt4Click = () => {
                makeApiRequest('3');
                body_part.find('#context-menu').hide();
            };

            const makeApiRequest = (applicationValue) => {
                const leftTextarea = body_part.find('#left-textarea');
                const rightTextarea = body_part.find('#right-textarea');
                const prompt = leftTextarea.val();
                rightTextarea.val("Loading...");

                var settings = {
                    "url": "http://ec2-44-204-232-113.compute-1.amazonaws.com:7790/generate",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "prompt": {
                            "application": [applicationValue],
                            "human": prompt
                        }
                    }),
                };

                $.ajax(settings)
                    .done(function (response) {
                        rightTextarea.val(response);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        rightTextarea.val("Error occurred: " + textStatus);
                    });
            };

            const handleDocumentClick = () => {
                body_part.find('#context-menu').hide();
            };

            // Assign event handlers
            body_part.find('#transform-btn').click(handleTransformBtnClick);
            body_part.find('#prompt-1').click(handlePrompt1Click);
            body_part.find('#prompt-2').click(handlePrompt2Click);
            body_part.find('#prompt-3').click(handlePrompt3Click);
            body_part.find('#prompt-4').click(handlePrompt4Click);
            body_part.find(document).click(handleDocumentClick);

        };
        shadow.appendChild(script);
    }
}

// Define the new element
customElements.define('my-component', MyComponent);
