from flask import Flask, render_template, jsonify, request
import openai

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = "your-openai-api-key"  # Replace with your actual OpenAI API key

# Sample data for dynamic content
meditation_data = [
    {"title": "Mindful Awareness", "duration": "5 min", "focus": "Focus", "level": "Beginner"},
    {"title": "Body Scan", "duration": "10 min", "focus": "Relaxation", "level": "All levels"},
]

breathing_data = [
    {"title": "Box Breathing", "duration": "5 min", "focus": "Stress Reduction"},
]

mood_data = [
    {"emoji": "😊", "name": "Happy"},
    {"emoji": "😌", "name": "Content"},
    {"emoji": "😔", "name": "Sad"},
    {"emoji": "😠", "name": "Angry"},
    {"emoji": "😰", "name": "Anxious"},
    {"emoji": "😮", "name": "Surprised"},
    {"emoji": "❤️", "name": "Loving"},
    {"emoji": "😇", "name": "Peaceful"},
]

# Serve the frontend
@app.route("/")
def home():
    return render_template("index.html")

# API endpoints for dynamic data
@app.route("/api/meditations")
def get_meditations():
    return jsonify(meditation_data)

@app.route("/api/breathing-exercises")
def get_breathing_exercises():
    return jsonify(breathing_data)

@app.route("/api/moods")
def get_moods():
    return jsonify(mood_data)

@app.route("/api/save-mood", methods=["POST"])
def save_mood():
    data = request.json
    print("Saved mood:", data)  # Replace with database logic
    return jsonify({"status": "success"})

# Chatbot endpoint
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    # Call OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use GPT-3.5-turbo for chat
        messages=[
            {"role": "system", "content": "You are a helpful and mindful chatbot designed to assist users with meditation, breathing exercises, and mental health tips."},
            {"role": "user", "content": user_message},
        ],
        max_tokens=150,  # Limit response length
    )

    # Extract the chatbot's reply
    bot_reply = response.choices[0].message["content"]
    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)