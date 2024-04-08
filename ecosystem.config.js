module.exports = {
  apps: [
      {
          name: 'pm2-notify',
          script: 'index.js',
          exec_mode: 'fork',
          autorestart: true,
      }
  ]
};