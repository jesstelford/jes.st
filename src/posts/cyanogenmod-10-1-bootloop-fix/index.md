---
title: 'CyanogenMod 10.1 bootloop fix'
date: '2013-03-09T04:40:47.000Z'
tags: ['cyanogenmod', 'linux']
author: 'jesstelford'
---

> **Update (2013-07-22):** The libskia.so file location has been updated. You can now download it from [here](//jes.st/public/libskia.so)

After updating my Samsung Galaxy S2 (SGSII, GT-I9100) to the latest CyanogenMod 10.1 nightly (20130228), I got stuck in a boot loop where it would constantly show the CyanogenMod boot logo spinning! After some searching, I came across [this](http://forum.xda-developers.com/showpost.php?p=38591638&postcount=8797 'CyanogenMod 10.1 bootloop fix') post in the nightlies forum of xda developers. So, without further ado - let's get to fixing this bootloop! First up, you need to have adb available:

- [Download the Android SDK](http://developer.android.com/sdk/index.html 'Android SDK')
- Extract the SDK somewhere convenience (in your home folder for example)
- [Setup the drivers/rules for your device](http://developer.android.com/tools/device.html 'ADB Device setup')

Next, download the file as linked to from the forum thread: [libskia.so - 1.36 MB](//jes.st/public/libskia.so 'libskia.so - 1.36 MB') Boot your device into recovery mode. For the SGSII, you do this by pressing and holding \+ \+ until the "Samsung Galaxy S II" boot screen appears. Once in the Recovery Menu, you need to mount the /system partition:

- Use to go to "mounts and storage"
- Press to select
- Use to go to "mount /system"
- Press to select

Now, on your PC, you need to send the file to the device using your newly setup ADB:

- Plug the device in via USB
- Check he device is detected by running `adb devices` which should say something like:

  ```
  List of devices attached
  0123456789ABCDEF	recovery
  ```

- Send the file to your device:

  ```
  adb push ~/path/to/libskia.so /system/lib
  ```

Finally, you need to reboot your device:

- Use to go to "+++++Go Back+++++"
- Press to select
- With "reboot system now" selected, Press to reboot

The CyanogentMod 10.1 bootloop should now be fixed :) Enjoy!
