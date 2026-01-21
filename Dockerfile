# 构建阶段
FROM m.daocloud.io/docker.io/library/node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package.json package-lock.json ./

# 设置 npm 镜像源并安装依赖
RUN npm config set registry https://registry.npmmirror.com && \
    npm ci

# 复制源码
COPY . .

# 构建应用
RUN npm run build

# 运行阶段
FROM m.daocloud.io/docker.io/library/nginx:alpine

# 复制构建产物到 Nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
