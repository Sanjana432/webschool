(function () {
    function setMode(mode) {
        const isSignUp = mode === 'signup';
        document.getElementById('signin-pane')?.classList.toggle('hidden', isSignUp);
        document.getElementById('signup-pane')?.classList.toggle('hidden', !isSignUp);

        document.querySelectorAll('.auth-tab').forEach((tab) => {
            const active = tab.getAttribute('data-mode') === mode;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
    }

    function showFeedback(message) {
        const feedback = document.getElementById('auth-feedback');
        if (!feedback) return;
        feedback.textContent = message;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const queryMode = new URLSearchParams(window.location.search).get('mode');
        setMode(queryMode === 'signup' ? 'signup' : 'signin');

        document.querySelectorAll('.auth-tab').forEach((tab) => {
            tab.addEventListener('click', () => setMode(tab.getAttribute('data-mode') || 'signin'));
        });

        document.getElementById('signin-form')?.addEventListener('submit', (event) => {
            event.preventDefault();
            showFeedback('Signed in successfully. Continue your next lesson!');
        });

        document.getElementById('signup-form')?.addEventListener('submit', (event) => {
            event.preventDefault();
            showFeedback('Account created successfully. Welcome to Web School!');
        });
    });
})();
