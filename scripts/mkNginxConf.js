'use strict';
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const configsDirectory = 'conf.d';
const projectDirectory = path.join(__dirname, '..');
cp.execSync(`git clean -fd nginx_conf/nginx.conf nginx_conf/${configsDirectory}`);
fs.mkdirSync(path.join(projectDirectory, 'nginx_conf', configsDirectory));
const nginxContent = 
`
user root;
worker_processes auto;
pid /var/log/nginx/nginx.pid;

events {
  worker_connections 768;
  multi_accept on;
}

http {
	## Basic Settings

  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
	keepalive_timeout 65;
  types_hash_max_size 2048;
  # server_tokens off;
  # server_names_hash_bucket_size 64;
  # server_name_in_redirect off;

  include ${projectDirectory}/nginx_conf/mime.types;
  default_type application/octet-stream;

  ## SSL Settings

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
  ssl_prefer_server_ciphers on;

  ## Logging Settings

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  ## Gzip Settings

  gzip on;
  gzip_disable "msie6";
  include ${configsDirectory}/*.conf;
}
`;

fs.writeFileSync(path.join(__dirname, '../nginx_conf/nginx.conf'), nginxContent);

const serverContent = 
`
server {
  listen 80;
  server_name tfcloud.com www.tfcloud.com;

  rewrite ^(.*)$ https://www.tfcloud.com$1 permanent;
}

server {
  listen     443 ssl http2;
  server_name  tfcloud.com www.tfcloud.com;

  if ($http_host != "www.tfcloud.com") {
    rewrite ^ https://www.tfcloud.com$request_uri permanent;
  }
  ssl on;
  ssl_certificate tfcloud-cert/tfcloud.crt;
  ssl_certificate_key  tfcloud-cert/tfcloud.key;
  ssl_session_timeout 5m;
  ssl_ciphers RC4:HIGH:!aNULL:!MD5;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;

    location /static/ {
      alias "${projectDirectory}/client/static/";
      satisfy all;
      expires 1y;
      gzip on;
      gzip_static on;
    }
    location /admin-static/dist/ {
      alias "${projectDirectory}/admin/dist/";
      satisfy all;
      expires 1y;
      gzip_static on;
    }

    location /admin-static/assets {
      alias "${projectDirectory}/admin/assets";
      satisfy all;
      expires 1y;
      gzip_static on;
    }
    location /wp-content {
      alias "${projectDirectory}/static/wp-content";
      satisfy all;
      expires 1y;
      gzip on;
    }
    location ~ /docs/*/gitbook/ {
      alias "${projectDirectory}/static/gitbook";
      satisfy all;
      expires 1y;
      gzip_static on;
    }
    location / {
    proxy_pass http://127.0.0.1:5555;
  }
}
`;
fs.writeFileSync(path.join(__dirname, '../nginx_conf', configsDirectory, 'tfcloud.conf'), serverContent);


console.log(`Success: Nginx config files has been generated successfully!

please place the https cert and the key to the current location:
  ${projectDirectory}/nginx_conf/tfcloud-cert/tfcloud.crt
  ${projectDirectory}/nginx_conf/tfcloud-cert/tfcloud.key

and run "sudo nginx -c ${projectDirectory}/nginx_conf/nginx.conf -t" to test config files.

Then run "sudo nginx -c ${projectDirectory}/nginx_conf/nginx.conf" to start the server;`);