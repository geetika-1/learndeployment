FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/server.js"]

- name: Build and Push Container
  run: |
    IMAGE="${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPO }}/${{ env.SERVICE }}:${{ github.sha }}"
    docker build -f backend/Dockerfile -t "$IMAGE" ./backend
    docker push "$IMAGE"
    echo "IMAGE=$IMAGE" >> $GITHUB_ENV
