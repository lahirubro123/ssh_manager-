const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('Connected');
  // Execute useradd command
  conn.exec('useradd -e `date -d "+1 days" +"%Y-%m-%d"` -s /bin/false -M test1', (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('User added successfully');
      // Execute password change command
      conn.exec('echo -e "testpw\ntestpw\n" | passwd test1 &> /dev/null', (err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
          console.log('Password changed successfully');
          conn.end();
        });
      });
    });
  });
});

conn.connect({
  host: '35.202.210.66',
  port: 22,
  username: 'root',
  password: 'lahiru1998'
});
