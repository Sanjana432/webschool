// Editor.js - Interactive Code Editor Functionality

const templates = {
    landing: `<!DOCTYPE html>
<html>
<head>
    <style>
        :root {
            --brand: #4f46e5;
            --accent: #06b6d4;
        }
        body {
            font-family: Inter, Arial, sans-serif;
            margin: 0;
            color: #0f172a;
            background: radial-gradient(circle at top right, #e0f2fe, #eef2ff 45%, #ffffff);
            padding: 48px 20px;
        }
        .hero {
            max-width: 880px;
            margin: auto;
            background: white;
            border: 1px solid #dbeafe;
            border-radius: 18px;
            padding: 42px;
            box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
        }
        h1 { margin-top: 0; font-size: 2.2rem; }
        p { color: #475569; line-height: 1.7; }
        .actions { margin-top: 24px; display: flex; gap: 12px; }
        button {
            border: 0;
            border-radius: 10px;
            padding: 12px 16px;
            font-weight: 600;
            cursor: pointer;
        }
        .primary { background: linear-gradient(135deg, var(--brand), var(--accent)); color: white; }
        .ghost { background: #eef2ff; color: #3730a3; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Launch Better Interfaces Faster</h1>
        <p>This starter demonstrates a polished hero module with strong visual hierarchy and accessible color contrast.</p>
        <div class="actions">
            <button class="primary">Start Free Trial</button>
            <button class="ghost">View Docs</button>
        </div>
    </section>
</body>
</html>`,
    dashboard: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; font-family: Inter, Arial, sans-serif; background: #f8fafc; color: #0f172a; padding: 24px; }
        .grid { max-width: 980px; margin: 0 auto; display: grid; gap: 16px; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); }
        .card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; padding: 18px; box-shadow: 0 8px 24px rgba(15,23,42,.08); }
        .label { font-size: 0.82rem; color: #64748b; margin-bottom: 10px; }
        .value { font-size: 2rem; font-weight: 700; margin: 0; }
        .trend { margin-top: 6px; color: #0f766e; font-weight: 600; }
    </style>
</head>
<body>
    <div class="grid">
        <article class="card"><div class="label">Monthly Active Users</div><p class="value">24,320</p><div class="trend">▲ 12.8%</div></article>
        <article class="card"><div class="label">Conversion Rate</div><p class="value">4.7%</p><div class="trend">▲ 0.6%</div></article>
        <article class="card"><div class="label">Avg. Session</div><p class="value">6m 14s</p><div class="trend">▲ 9.2%</div></article>
    </div>
</body>
</html>`,
    interactive: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Inter, Arial, sans-serif; background:#111827; color:#f9fafb; margin:0; min-height:100vh; display:grid; place-items:center; }
        .widget { width:min(92vw,560px); background:#1f2937; border:1px solid #374151; border-radius:16px; padding:24px; }
        h1 { margin-top:0; font-size:1.4rem; }
        .row { display:flex; gap:10px; margin:14px 0; }
        input, button { border-radius:10px; border:1px solid #4b5563; padding:10px 12px; font-size:1rem; }
        input { flex:1; background:#111827; color:#fff; }
        button { cursor:pointer; background:#2563eb; color:#fff; border:none; }
        ul { padding-left:18px; color:#cbd5e1; }
    </style>
</head>
<body>
    <section class="widget">
        <h1>Task Capture Widget</h1>
        <div class="row">
            <input id="task" placeholder="Add a task" />
            <button onclick="addTask()">Add</button>
        </div>
        <ul id="list"></ul>
    </section>
    <script>
      function addTask() {
        const input = document.getElementById('task');
        if (!input.value.trim()) return;
        const li = document.createElement('li');
        li.textContent = input.value;
        document.getElementById('list').appendChild(li);
        input.value = '';
      }
    </script>
</body>
</html>`
};

const starterTemplate = templates.landing;

document.addEventListener('DOMContentLoaded', function() {
    const codeInput = document.getElementById('code-input');
    const runBtn = document.getElementById('run-btn');
    const resetBtn = document.getElementById('reset-btn');
    const outputFrame = document.getElementById('output-frame');

    if (codeInput && !codeInput.value.trim()) {
        codeInput.value = starterTemplate;
    }

    if (runBtn) {
        runBtn.addEventListener('click', runCode);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetCode);
    }

    document.querySelectorAll('.template-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const key = button.dataset.template;
            if (!key || !templates[key]) return;
            codeInput.value = templates[key];
            runCode();
        });
    });

    if (codeInput) {
        codeInput.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                runCode();
            }
        });
    }

    function runCode() {
        const code = codeInput.value;
        outputFrame.srcdoc = '';
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

    outputFrame.srcdoc = codeInput.value;
});
