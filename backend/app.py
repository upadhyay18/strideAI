from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///resolutions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User model (basic example)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

# Resolution model
class Resolution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    goal = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return '<Resolution %r>' % self.goal[:20]

# Create database tables (run once)
with app.app_context():
    db.create_all()

@app.route('/')
def hello_world():
    return 'Hello, Flask!'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 409

    new_user = User(username=username, password=password) # In a real app, hash passwords!
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.password == password: # In a real app, verify hashed password!
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    data = request.get_json()
    user_id = data.get('user_id')
    resolution = data.get('resolution')

    if not user_id or not resolution:
        return jsonify({'message': 'User ID and resolution are required'}), 400
    
    # In a real application, call the AI agent to generate the plan here.
    # For now, we'll return a placeholder.
    
    new_resolution = Resolution(user_id=user_id, goal=resolution)
    db.session.add(new_resolution)
    db.session.commit()

    return jsonify({
        'message': 'Plan generated successfully (placeholder)',
        'seven_day_plan': ['Day 1 task', 'Day 2 task'],
        'one_month_plan': ['Week 1 goal', 'Week 2 goal']
    }), 200


if __name__ == '__main__':
    app.run(debug=True)