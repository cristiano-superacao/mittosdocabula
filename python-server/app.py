from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import uuid

app = Flask(__name__)
CORS(app)  # Permite requisições do frontend Next.js

# Dados mock para desenvolvimento
tournaments_data = [
    {
        "id": "1",
        "title": "Campeonato Diamante Elite",
        "category": "diamante",
        "price": 5.00,
        "participants": 1250,
        "maxParticipants": 1500,
        "prize": "R$ 7.500",
        "deadline": "2025-10-15T23:59:59Z",
        "status": "active",
        "description": "Torneio premium com os melhores prêmios"
    },
    {
        "id": "2", 
        "title": "Liga Ouro Brasileirão",
        "category": "ouro",
        "price": 10.00,
        "participants": 850,
        "maxParticipants": 1000,
        "prize": "R$ 10.000",
        "deadline": "2025-10-20T23:59:59Z",
        "status": "active",
        "description": "Competição baseada no Campeonato Brasileiro"
    },
    {
        "id": "3",
        "title": "Torneio Prata Champions",
        "category": "prata",
        "price": 20.00,
        "participants": 450,
        "maxParticipants": 500,
        "prize": "R$ 10.000",
        "deadline": "2025-10-25T23:59:59Z",
        "status": "active",
        "description": "Inspirado na Champions League"
    },
    {
        "id": "4",
        "title": "Copa Especial do Cabula",
        "category": "especial",
        "price": 50.00,
        "participants": 180,
        "maxParticipants": 200,
        "prize": "R$ 10.000",
        "deadline": "2025-11-01T23:59:59Z",
        "status": "active",
        "description": "Torneio mensal exclusivo"
    }
]

users_data = [
    {
        "id": "1",
        "email": "cssinformatica2008@gmail.com",
        "password": "01062006cs",  # Em produção, use hash
        "name": "Cristiano Superação",
        "plan": "diamante",
        "joinDate": "2025-01-15"
    },
    {
        "id": "2",
        "email": "admin@mittosdocabula.com",
        "password": "admin123",
        "name": "Administrador",
        "plan": "admin",
        "joinDate": "2025-01-01"
    }
]

# Rotas da API
@app.route('/')
def home():
    return jsonify({
        "message": "MittoS do Cabula API Server",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "tournaments": "/api/tournaments",
            "auth": "/api/auth/login",
            "users": "/api/users/profile",
            "health": "/api/health"
        }
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "uptime": "active"
    })

@app.route('/api/tournaments')
def get_tournaments():
    category = request.args.get('category')
    
    if category:
        filtered_tournaments = [t for t in tournaments_data if t['category'] == category]
        return jsonify(filtered_tournaments)
    
    return jsonify(tournaments_data)

@app.route('/api/tournaments/<tournament_id>')
def get_tournament(tournament_id):
    tournament = next((t for t in tournaments_data if t['id'] == tournament_id), None)
    
    if not tournament:
        return jsonify({"error": "Tournament not found"}), 404
    
    return jsonify(tournament)

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = next((u for u in users_data if u['email'] == email and u['password'] == password), None)
    
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    
    # Simular token JWT
    token = str(uuid.uuid4())
    
    return jsonify({
        "token": token,
        "user": {
            "id": user['id'],
            "email": user['email'],
            "name": user['name'],
            "plan": user['plan']
        }
    })

@app.route('/api/users/profile')
def get_profile():
    # Simular autenticação via header
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        return jsonify({"error": "Authorization required"}), 401
    
    # Retornar dados do usuário demo
    return jsonify({
        "id": "1",
        "email": "cssinformatica2008@gmail.com",
        "name": "Cristiano Superação",
        "plan": "diamante",
        "stats": {
            "tournaments_participated": 15,
            "total_winnings": "R$ 2.350,00",
            "current_position": 42
        }
    })

@app.route('/api/tournaments/<tournament_id>/join', methods=['POST'])
def join_tournament(tournament_id):
    tournament = next((t for t in tournaments_data if t['id'] == tournament_id), None)
    
    if not tournament:
        return jsonify({"error": "Tournament not found"}), 404
    
    if tournament['participants'] >= tournament['maxParticipants']:
        return jsonify({"error": "Tournament is full"}), 400
    
    # Simular entrada no torneio
    tournament['participants'] += 1
    
    return jsonify({
        "message": "Successfully joined tournament",
        "tournament": tournament
    })

@app.route('/api/plans')
def get_plans():
    plans = [
        {
            "id": "free",
            "name": "Gratuito",
            "price": 0,
            "features": ["Acesso básico", "1 torneio por mês", "Suporte por email"],
            "popular": False
        },
        {
            "id": "prata",
            "name": "Prata",
            "price": 29.90,
            "features": ["Todos os torneios Prata", "Suporte prioritário", "Estatísticas avançadas"],
            "popular": False
        },
        {
            "id": "ouro",
            "name": "Ouro",
            "price": 49.90,
            "features": ["Todos os torneios até Ouro", "Análises detalhadas", "Suporte 24/7"],
            "popular": True
        },
        {
            "id": "diamante",
            "name": "Diamante",
            "price": 99.90,
            "features": ["Acesso completo", "Torneios exclusivos", "Mentoria personalizada"],
            "popular": False
        }
    ]
    
    return jsonify(plans)

# Servir arquivos estáticos do Next.js (para desenvolvimento)
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('../out/_next/static', filename)

if __name__ == '__main__':
    print("🚀 MittoS do Cabula - Python Server")
    print("📡 API Server running on: http://localhost:5000")
    print("🌐 Frontend should run on: http://localhost:3000")
    print("📋 Available endpoints:")
    print("   GET  /api/tournaments")
    print("   GET  /api/tournaments/<id>")
    print("   POST /api/auth/login")
    print("   GET  /api/users/profile")
    print("   GET  /api/plans")
    print("   GET  /api/health")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)