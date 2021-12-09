from datetime import timedelta
from flask import Flask, request, jsonify
import re
from dotenv import load_dotenv
import os
import mysql.connector
from datetime import timedelta
from flask_cors import CORS

USER_COLUMNS = ['id', 'username', 'doc_id', 'joined_at']
app = Flask(__name__, static_folder='frontend')
cors = CORS(app)

app.secret_key = os.getenv("SECRET")

app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)
db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
)
cur = db.cursor(buffered=True)

@app.route('/signup', methods=['POST', "GET"])
def signup():
    if request.method == 'POST':
        username = request.json.get('username')
        doc = request.json.get("doc")
        cur.execute('SELECT * FROM users')
        cur.execute('INSERT INTO users(user_name, doc) VALUES (%s, %s)', (username, doc,))
        db.commit()

        return jsonify({'msg':f"user {username} was created."})
    return jsonify({'error':'error'})

@app.route('/get_users', methods=['GET'])
def get_users():
    cur.execute('SELECT * FROM users')
    users = cur.fetchall()
    d = []
    for user in users:
        item = {}
        item['id'] = user[0]
        item['username'] = user[1]
        item['doc'] = user[2]
        item['joined_at'] = user[3]
        d.append(item)

    return jsonify(d)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)