// Editor.js - Interactive Code Editor Functionality

const starterTemplate = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Code Editor</h1>
        <p>Edit the HTML, CSS, and JavaScript code on the left to see changes here in real-time!</p>
    </div>
</body>
</html>`;

document.addEventListener('DOMContentLoaded', function() {
    const codeInput = document.getElementById('code-input');
    const runBtn = document.getElementById('run-btn');
    const resetBtn = document.getElementById('reset-btn');
    const outputFrame = document.getElementById('output-frame');

    // Run code when button is clicked
    if (runBtn) {
        runBtn.addEventListener('click', function() {
            runCode();
        });
    }

    // Reset code when button is clicked
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetCode();
        });
    }

    // Run code on Ctrl+Enter
    if (codeInput) {
        codeInput.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                runCode();
            }
        });
    }

    function runCode() {
        const code = codeInput.value;
        
        // Clear the iframe
        outputFrame.srcdoc = '';
        
        // Set the iframe content with a small delay to ensure it's cleared first
        setTimeout(function() {
            outputFrame.srcdoc = code;
        }, 10);
    }

    function resetCode() {
        codeInput.value = starterTemplate;
        outputFrame.srcdoc = '';
        setTimeout(function() {
            outputFrame.srcdoc = starterTemplate;
        }, 10);
    }

    // Load and display initial content
    outputFrame.srcdoc = codeInput.value;
});
