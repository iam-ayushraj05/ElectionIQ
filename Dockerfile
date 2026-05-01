# Build stage
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# We need to inject the API key during the build process since Vite bundles it
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
RUN npm run build

# Serve stage
FROM nginx:alpine
# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration (to handle React routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on the port specified by the PORT environment variable.
# We modify the nginx config to listen on this port at runtime.
CMD sed -i -e 's/80/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
