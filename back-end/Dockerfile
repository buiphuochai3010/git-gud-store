# Dựa vào Node.js 20.11.1
FROM node:20-alpine

# Thư mục làm việc
WORKDIR /app

# Copy package.json và yarn.lock trước
COPY package.json yarn.lock ./

# Copy Prisma schema trước khi install
COPY prisma ./prisma

# Cài đặt các package
RUN yarn install

# Copy phần còn lại của source code
COPY . .

# Expose cổng app
EXPOSE 3000

# Chạy app
CMD ["yarn", "start"]