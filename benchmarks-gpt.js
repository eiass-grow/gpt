window.gsBenchmarks = {
    init: function() {
        this.attachEventListeners();
    },

    attachEventListeners: function() {
        const self = this;

        // Prompt buttons
        document.querySelectorAll(".prompt-button").forEach(button => {
            button.addEventListener("click", function() {
                const input = document.getElementById("console-input");
                input.value = this.textContent;
                self.scrollToConsole();
                self.gsTrack("prompt_button_click", { prompt: this.textContent });
            });
        });

        // Ask button
        document.getElementById("ask-button").addEventListener("click", function() {
            self.fetchAnswer();
            self.gsTrack("ask_button_click", { query: document.getElementById("console-input").value });
        });

        // Clear button
        document.getElementById("clear-button").addEventListener("click", function() {
            self.clearConsole();
            self.gsTrack("clear_button_click");
        });

        // Copy Answer button
        document.getElementById("copy-answer").addEventListener("click", function() {
            self.copyAnswerToClipboard();
            self.gsTrack("copy_answer_click");
        });

        // FAQ toggles
        document.querySelectorAll(".faq-item h3").forEach(header => {
            header.addEventListener("click", function() {
                const answer = this.nextElementSibling;
                if (answer.style.display === "block") {
                    answer.style.display = "none";
                } else {
                    answer.style.display = "block";
                }
                self.gsTrack("faq_toggle", { question: this.textContent });
            });
        });

        // Get Started CTA button
        document.querySelector(".hero .cta-button").addEventListener("click", function() {
            self.scrollToConsole();
            self.gsTrack("get_started_cta_click");
        });
    },

    fetchAnswer: function() {
        // Mock function for now
        const mockAnswer = {
            answer: "Based on current industry trends, a 3% monthly churn for B2B SaaS at $100 ARPA is generally considered healthy, especially for early-stage companies. As companies scale, this benchmark might tighten.",
            stats: [
                "Average B2B SaaS churn: 3-5% monthly",
                "Good churn for SMBs: <3% monthly",
                "Good churn for Enterprise: <1% monthly"
            ],
            sources: [
                { title: "SaaS Churn Benchmarks 2023", url: "saasbenchmark.com/churn-report-2023", year: 2023 },
                { title: "Understanding SaaS Metrics", url: "saasmetrics.io/churn-guide", year: 2022 }
            ]
        };
        this.renderResult(mockAnswer);
    },

    renderResult: function(data) {
        const resultArea = document.getElementById("result-area");
        document.getElementById("answer-text").textContent = data.answer;

        const statsList = document.getElementById("stats-list");
        statsList.innerHTML = "";
        data.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = stat;
            statsList.appendChild(li);
        });

        const sourcesList = document.getElementById("sources-list");
        sourcesList.innerHTML = "";
        data.sources.forEach(source => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${source.url}" target="_blank">${source.title}</a> — ${new URL(source.url).hostname} — ${source.year}`;
            sourcesList.appendChild(li);
        });

        resultArea.style.display = "block";
    },

    clearConsole: function() {
        document.getElementById("console-input").value = "";
        document.getElementById("result-area").style.display = "none";
    },

    scrollToConsole: function() {
        document.getElementById("console-input").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    },

    copyAnswerToClipboard: function() {
        const answerText = document.getElementById("answer-text").textContent;
        navigator.clipboard.writeText(answerText).then(() => {
            alert("Answer copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    },

    gsTrack: function(eventName, properties = {}) {
        console.log(`GS_TRACK: ${eventName}`, properties);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    window.gsBenchmarks.init();
});

