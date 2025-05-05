"use strict";
async function generateQuotes() {
    const textarea = document.getElementById("textarea");
    const overlay = document.getElementById("overlay");
    const advicePanel = document.getElementById("advicePanel");
    const adviceContent = document.getElementById("adviceContent");
    const mood = textarea.value;
    let response;
    try {
        // Replace with your Cloudflare Worker URL in production
        // For example: https://motivation-quote-generator.your-username.workers.dev/generate-quote
        const res = await fetch("https://generate-quote.oluwolejonatee.workers.dev/generate-quote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mood }),
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.text();
        response = data;
        if (response) {
            overlay.classList.remove("hidden");
            advicePanel.classList.remove("translate-y-full");
            const quoteContentDiv = adviceContent.querySelector("div.px-4");
            if (quoteContentDiv) {
                quoteContentDiv.innerHTML = response;
            }
            else {
                adviceContent.innerHTML = response;
            }
        }
        else {
            console.error("Failed to generate response");
        }
    }
    catch (error) {
        console.error("Error generating quotes:", error);
    }
}
// Close button event listener
document.getElementById("closeBtn")?.addEventListener("click", () => {
    const overlay = document.getElementById("overlay");
    const advicePanel = document.getElementById("advicePanel");
    overlay.classList.add("hidden");
    advicePanel.classList.add("translate-y-full");
});
