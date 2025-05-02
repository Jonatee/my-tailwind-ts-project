
async function generateQuote() {
  const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
  const overlay = document.getElementById("overlay") as HTMLDivElement;
  const advicePanel = document.getElementById("advicePanel") as HTMLDivElement;
  const adviceContent = document.getElementById(
    "adviceContent"
  ) as HTMLDivElement;
  const mood = textarea.value;

  let response: string | undefined;

  try {
    // Make a POST request to the backend server
    const res = await fetch("http://localhost:5000/generate-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }), // Send the mood as JSON
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    response = data.response; // Get the response text from the server

    if (response) {
      overlay.classList.remove("hidden");
      advicePanel.classList.remove("translate-y-full");
      adviceContent.innerHTML = response;
    } else {
      console.error("Failed to generate response");
    }
  } catch (error) {
    console.error("Error generating quote:", error);
  }
}

document.getElementById("closeBtn")?.addEventListener("click", () => {
  const overlay = document.getElementById("overlay") as HTMLDivElement;
  const advicePanel = document.getElementById("advicePanel") as HTMLDivElement;
  overlay.classList.add("hidden");
  advicePanel.classList.add("translate-y-full");
});


