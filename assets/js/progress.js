// Progress.js - Lesson Completion Tracking

class LessonProgress {
    constructor() {
        this.storageKey = 'webschool_progress';
        this.progress = this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {};
    }

    saveProgress() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    }

    markLessonComplete(course, lesson) {
        if (!this.progress[course]) {
            this.progress[course] = {};
        }

        this.progress[course][lesson] = {
            completed: true,
            completedAt: new Date().toISOString()
        };

        this.saveProgress();
        this.updateUI();
    }

    isLessonComplete(course, lesson) {
        return this.progress[course] && this.progress[course][lesson] && this.progress[course][lesson].completed;
    }

    getCourseProgress(course) {
        const lessons = this.progress[course] || {};
        const totalCompleted = Object.keys(lessons).filter((lesson) => lessons[lesson].completed).length;

        const sidebarLessons = document.querySelectorAll(`.sidebar a[href*='/pages/${course}/']`).length;
        const totalLessons = sidebarLessons || 5;

        return Math.round((totalCompleted / totalLessons) * 100);
    }

    updateUI() {
        document.querySelectorAll('.sidebar a[data-lesson]').forEach((link) => {
            const lesson = link.getAttribute('data-lesson');
            const courseMatch = window.location.pathname.match(/pages\/(html|css|js)\//);
            const course = courseMatch ? courseMatch[1] : null;

            if (!course || !this.isLessonComplete(course, lesson)) {
                return;
            }

            if (!link.dataset.completedLabelApplied) {
                link.textContent = `✓ ${link.textContent}`;
                link.dataset.completedLabelApplied = 'true';
            }

            link.style.color = '#00d4ff';
        });
    }

    getCurrentLesson() {
        const pathMatch = window.location.pathname.match(/pages\/(html|css|js)\/([^/]+)\.html/);
        return pathMatch ? { course: pathMatch[1], lesson: pathMatch[2] } : null;
    }
}

let progressTracker;

document.addEventListener('DOMContentLoaded', () => {
    progressTracker = new LessonProgress();
    progressTracker.updateUI();
    window.progressTracker = progressTracker;

    const lessonHeader = document.querySelector('.lesson-header');
    if (lessonHeader && window.location.pathname.includes('/pages/')) {
        const current = progressTracker.getCurrentLesson();
        if (current) {
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-primary';
            completeBtn.textContent = progressTracker.isLessonComplete(current.course, current.lesson)
                ? '✓ Lesson Complete'
                : 'Mark Complete';
            completeBtn.style.marginTop = '20px';
            completeBtn.disabled = progressTracker.isLessonComplete(current.course, current.lesson);

            completeBtn.addEventListener('click', () => {
                progressTracker.markLessonComplete(current.course, current.lesson);
                completeBtn.textContent = '✓ Lesson Complete';
                completeBtn.disabled = true;
            });

            lessonHeader.appendChild(completeBtn);
        }
    }
});
