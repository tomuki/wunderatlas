/* Cloze exercise: same as fill-blank but rendered from a single text with ___ placeholders.
   Includes a more compact UI and live reveal of correct answers. */
(function (root) {
    function render(ex) {
        // Reuse fill-blank rendering
        return Exercises['fill'].render(ex);
    }
    function isCorrect(ex, answer) { return Exercises['fill'].isCorrect(ex, answer); }
    function bind(container, ex, onResult) { return Exercises['fill'].bind(container, ex, onResult); }

    root.Exercises = root.Exercises || {};
    root.Exercises['cloze'] = { render, isCorrect, bind };
})(window);
