---
title: 'Testing Cron Jobs for the correct user'
date: '2012-01-16T01:09:33.000Z'
tags: ['cron', 'linux', 'terminal', 'testing']
author: 'jesstelford'
---

Testing Cron Jobs in Linux can be a pain - especially if you're using a tool like CPanel which abstracts away some of the processing. However, with a couple of quick commands, it's possible to track down where your cron jobs may be failing and get them running smooth as silk.

## The User

The biggest issue when testing cron jobs is having them run as the correct user. This is more pronounced when using CPanel as it's not immediately obvious which user is running the job.

### Which User

To see which user runs which commands, you can review the cron job log, located at `/var/log/cron` :

```sh
$ tail /var/log/cron
```

This will give you output similar to:

```
Jan 14 10:00:01 my-server crond\[17947\]: (fred) CMD (/usr/bin/php /path/to/some/script.php)
Jan 14 14:30:01 my-server crond\[17948\]: (fred) CMD (/bin/sh /an/awesome/script.sh)
Jan 14 18:19:01 my-server crond\[18574\]: (root) CMD (/bin/sh /a/root/script.sh)
Jan 15 10:00:01 my-server crond\[17947\]: (fred) CMD (/usr/bin/php /path/to/some/script.php)
```

Here, you can see the commands that have been executed along with their time stamp and the user. The example above shows 3 commands executed as the user 'fred', and one executed as 'root'.

### Switch to the User

If your cron job isn't running as the expected user, then you'll need to test the cront job as that user. To do so, first enter a session as the user:

```sh
$su theuser
```

This will prompt you for the current user's password, then you will be using the session as the user you want to test.

### Testing as the User

Now, run the command as it is listed in the cron job. From our example above, let's run the `/an/awesome/script.sh` command as the user fred:

```sh
$ su fred
Password:
$ /bin/sh /an/awesome/script.sh
```

Whilst this isn't exactly the same as running the command in cron, it is near enough to catch most of the issues you should have. When you satisfied that all the issues have been fixed, then you can log out of the User's account and back into the original session with:

```sh
$ exit
```

Happy testing!
