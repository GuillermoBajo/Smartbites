# !/bin/bash

# Bajar el servicio smartbites
docker-compose down smartbites

# Iniciar el servicio smartbites en segundo plano
docker-compose up -d --build