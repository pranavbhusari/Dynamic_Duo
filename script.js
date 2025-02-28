// Function to load content dynamically
function loadHome() {
    fetch("/api/meditations")
      .then((response) => response.json())
      .then((data) => {
        const content = `
          <div class="content-section">
            <div class="section-title">
              <span class="section-title-icon">🌟</span>
              Recommended for You
            </div>
            <div class="recommendations">
              ${data
                .map(
                  (item) => `
                <div class="recommendation-card">
                  <div class="recommendation-title">
                    <span class="recommendation-icon">🧘</span>
                    ${item.title}
                  </div>
                  <div class="recommendation-subtitle">
                    ${item.duration} • Focus: ${item.focus}
                  </div>
                  <button class="recommendation-button">Start Now</button>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `;
        document.getElementById("content").innerHTML = content;
      });
  }
  
  function loadMeditations() {
    fetch("/api/meditations")
      .then((response) => response.json())
      .then((data) => {
        const content = `
          <div class="content-section">
            <div class="section-title">
              <span class="section-title-icon">🧘</span>
              Guided Meditations
            </div>
            <div class="meditation-showcase">
              ${data
                .map(
                  (item) => `
                <div class="meditation-card">
                  <div class="meditation-header">${item.title}</div>
                  <div class="meditation-body">
                    <div class="meditation-description">
                      A short meditation focusing on ${item.focus.toLowerCase()}, perfect for ${item.level.toLowerCase()}.
                    </div>
                    <div class="meditation-details">
                      <div class="meditation-detail">
                        <span class="meditation-detail-icon">⏱️</span>
                        ${item.duration}
                      </div>
                      <div class="meditation-detail">
                        <span class="meditation-detail-icon">🎯</span>
                        ${item.focus}
                      </div>
                      <div class="meditation-detail">
                        <span class="meditation-detail-icon">👤</span>
                        ${item.level}
                      </div>
                    </div>
                    <div class="meditation-actions">
                      <button class="meditation-start">Begin Meditation</button>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `;
        document.getElementById("content").innerHTML = content;
      });
  }
  
  function loadBreathing() {
    fetch("/api/breathing-exercises")
      .then((response) => response.json())
      .then((data) => {
        const content = `
          <div class="content-section">
            <div class="section-title">
              <span class="section-title-icon">💨</span>
              Breathing Exercises
            </div>
            <div class="breathing-exercise">
              <div class="breathing-circle">Breathe</div>
              <div class="breathing-instruction">Inhale</div>
              <div class="breathing-timer">4 seconds</div>
            </div>
            ${data
              .map(
                (item) => `
              <div class="meditation-card" style="margin-top: 20px;">
                <div class="meditation-header">${item.title}</div>
                <div class="meditation-body">
                  <div class="meditation-description">
                    A technique used by Navy SEALs to calm the nervous system and improve focus under stress.
                  </div>
                  <div class="meditation-details">
                    <div class="meditation-detail">
                      <span class="meditation-detail-icon">⏱️</span>
                      ${item.duration}
                    </div>
                    <div class="meditation-detail">
                      <span class="meditation-detail-icon">🎯</span>
                      ${item.focus}
                    </div>
                  </div>
                  <div class="meditation-actions">
                    <button class="meditation-start">Start Exercise</button>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        `;
        document.getElementById("content").innerHTML = content;
      });
  }
  
  function loadMoodTracker() {
    fetch("/api/moods")
      .then((response) => response.json())
      .then((data) => {
        const content = `
          <div class="content-section">
            <div class="section-title">
              <span class="section-title-icon">😊</span>
              Mood Tracking
            </div>
            <div class="mood-tracker">
              <h3>How are you feeling today?</h3>
              <div class="mood-grid">
                ${data
                  .map(
                    (item) => `
                  <div class="mood-item">
                    <div class="mood-emoji">${item.emoji}</div>
                    <div class="mood-name">${item.name}</div>
                  </div>
                `
                  )
                  .join("")}
              </div>
              <div class="mood-note">
                <h3>Add a note (optional)</h3>
                <textarea placeholder="What's contributing to your mood today?"></textarea>
              </div>
              <button class="mood-submit" onclick="saveMood()">Save Mood</button>
            </div>
          </div>
        `;
        document.getElementById("content").innerHTML = content;
      });
  }
  
  function saveMood() {
    const selectedMood = document.querySelector(".mood-item.selected");
    const note = document.querySelector("textarea").value;
  
    if (selectedMood) {
      const mood = selectedMood.querySelector(".mood-name").textContent;
      fetch("/api/save-mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood, note }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Mood saved successfully!");
        });
    } else {
      alert("Please select a mood.");
    }
  }
  
  // Load home content by default
  loadHome();