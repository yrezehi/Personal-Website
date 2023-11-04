# How to backup MongoDB every night in NodeJS

Many reasons might cause data to be lost or the database to become corrupted. It's crucial to keep the data available and safe you need to keep at least one copy of your database.

I'll explain how to schedule a task to backup your everyday data at 11:59 pm, and how to restore backup data from the command line.

If you have MongoDB already installed you can use a utility named mongodump, which can export data from your database to a local file system.

```
 mongodump --db=yourDatabaseName --archive=pathToStoreBackup/ --gzip
    --db argument for databse name
    --archive argument for path of output
    --gzip argument will make the output file be compressed with gzip
```

```
Note: for more options like --username, --password, --host and --port please visit https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/
```

Now we need to write a code to execute this command

```
spawn = require('child_process').spawn;

let backupProcess = spawn('mongodump', [
    '--db=restaurantDB',
    '--archive=.',
    '--gzip'
    ]);

backupProcess.on('exit', (code, signal) => {
    if(code) 
        console.log('Backup process exited with code ', code);
    else if (signal)
        console.error('Backup process was killed with singal ', signal);
    else 
        console.log('Successfully backedup the database')
});
```

Now we need to install `node-cron` package to this daily task

```npm install node-cron --save```

now we need to write a code for running the task every day at 11:59 pm

```
const cron = require('node-cron')
let task = cron.schedule('59 23 * * *', () => {
    cosnole.log('One minute before midnight!');
});
```

```
Note: if the argument "59 23 * * *" is not clear please visit https://www.npmjs.com/package/node-cron for more details
```

Now we need to put the two pieces together

```
const cron = require('node-cron'), spawn = require('child_process').spawn;

let dbBackupTask = cron.schedule('59 23 * * *', () => {
    let backupProcess = spawn('mongodump', [
        '--db=restaurantDB',
        '--archive=./db/backup/',
        '--gzip'
      ]);

    backupProcess.on('exit', (code, signal) => {
        if(code) 
            console.log('Backup process exited with code ', code);
        else if (signal)
            console.error('Backup process was killed with singal ', signal);
        else 
            console.log('Successfully backedup the database')
    });
});
```

And now in case, you wanted to restore the backup data execute this command

```
mongorestore --gzip --archive=backupLockation/
```

Conclusion
I hope you found this useful! if you have any questions or suggestions please leave a message in the comment section