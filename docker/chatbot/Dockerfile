FROM node:20-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]
