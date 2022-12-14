const PORT = 3003;

module.exports = {
  apps : [
    {
      name: 'msoffice2pdf',
      script: 'bin/www',
      exec_mode: 'cluster_mode',
      watch: '.',
      watch_delay: 3003,
      ignore_watch : [
        'node_modules',
        'public',
        'views'
      ],
      watch_options: {
        followSymlinks: false,
        usePolling: true
      },
      env: {
        NODE_ENV: 'development',
        PORT
      },
    }
  ]
};