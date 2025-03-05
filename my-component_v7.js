class MyComponent extends HTMLElement {
    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a div element
        const div = document.createElement('div');

        // Define the HTML content as a string variable
        const htmlContent = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rajivmehtapy/g_sample_py/styles.css">
            <header class="header">
                <h1>Study Buddy</h1>
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
                            <span class="toolbar-label">How can Study Buddy help you today?</span>
                            <!-- Add toolbar buttons here -->
                        </div>
                    </div>
                    <div class="editor" id="left-editor">
                        <textarea id="left-textarea"></textarea>
                        <div class="left-editor-panel">
                            <ul class='context-menu' id="context-menu">
                                <li id="prompt-1">Summarize Key Concepts</li>
                                <li id="prompt-3">Generate Practice Q&A</li>
                                <li id="prompt-4">Explain Difficult Concepts</li>
                                <li id="prompt-6">Identify Key Terms</li>
                                <li id="prompt-7">Explain Cause and Effect</li>
                                <li id="prompt-9">Improve Understanding</li>
                                <li id="prompt-10">Predict the important questions and answers</li>
                            </ul>
                        </div>
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
                            <span class="toolbar-label">Study Buddy</span>
                        </div>
                    </div>
                    <div class="editor" id="right-editor">
                        <div id="right-textarea"></div>
                    </div>
                </div>
            </div>
            <footer class="disclaimer">
                Disclaimer:This AI serves as a study aid, not a substitute for your teachers or textbooks. 
                Always cross-check information with your own learning resources.
            </footer>
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
                // body_part.find('#context-menu').toggle();
            };

            const handlePrompt1Click = () => {
                makeApiRequest('1');
                // body_part.find('#context-menu').hide();
            };

            const handlePrompt3Click = () => {
                makeApiRequest('3');
                // body_part.find('#context-menu').hide();
            };

            const handlePrompt4Click = () => {
                makeApiRequest('4');
                // body_part.find('#context-menu').hide();
            };

            const handlePrompt6Click = () => {
                makeApiRequest('6');
                // body_part.find('#context-menu').hide();
            };

            const handlePrompt7Click = () => {
                makeApiRequest('7');
                // body_part.find('#context-menu').hide();
            };

            const handlePrompt9Click = () => {
                makeApiRequest('9');
                // body_part.find('#context-menu').hide();
            };

            const handlePrompt10Click = () => {
                makeApiRequest('10');
                // body_part.find('#context-menu').hide();
            };

            const makeApiRequest = (applicationValue) => {
                const leftTextarea = body_part.find('#left-textarea');
                const rightTextarea = body_part.find('#right-textarea');
                const prompt = leftTextarea.val();
                rightTextarea.html("Loading...");

                var settings = {
                    "url": "https://feb5-52-66-248-193.ngrok-free.app/generate",
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
                        // Use showdown.js to convert markdown to HTML and set it to the right textarea
                        const showdownScript = document.createElement('script');
                        showdownScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js';
                        showdownScript.onload = () => {
                            var converter = new showdown.Converter();
                            var html = converter.makeHtml(response);
                            rightTextarea.html(html);
                        };
                        shadow.appendChild(showdownScript);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        rightTextarea.html("Error occurred: " + textStatus);
                    });
            };

            const handleDocumentClick = () => {
                body_part.find('#context-menu').hide();
            };

            // Assign event handlers
            body_part.find('#transform-btn').click(handleTransformBtnClick);
            body_part.find('#prompt-1').click(handlePrompt1Click);
            body_part.find('#prompt-3').click(handlePrompt3Click);
            body_part.find('#prompt-4').click(handlePrompt4Click);
            body_part.find('#prompt-6').click(handlePrompt6Click);
            body_part.find('#prompt-7').click(handlePrompt7Click);
            body_part.find('#prompt-9').click(handlePrompt9Click);
            body_part.find('#prompt-10').click(handlePrompt10Click);
            body_part.find(document).click(handleDocumentClick);

        };
        shadow.appendChild(script);
    }
}

// Define the new element
customElements.define('my-component', MyComponent);