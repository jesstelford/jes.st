---
title: 'Root Samsung Galaxy S4 GT-I9505G 4.2.2 on Mac OSX'
date: '2013-08-27T17:45:30.000Z'
tags: []
author: 'jesstelford'
---

Rooting the SGS4 GT-I9505G on OSX shouldn't be this hard, should it? But, it is.

1.  [Setup VirtualBox](https://www.virtualbox.org/wiki/Downloads) (don't forget the _Extension Pack_) with an [XP Virtual Machine](https://az412801.vo.msecnd.net/vhd/IEKitV1_Final/VirtualBox/OSX/IE8_XP/IE8.XP.For.MacVirtualBox.ova).
2.  Boot into this VM image by opening Virtual Box, and selecting the "IE8 - WinXP" image and pressing "Start".
3.  Once booted, select Devices > Install Guest Additions from the (OSX) menu. Reboot the VM.
4.  Within the VM, download and install the [Samsung Drivers](http://forum.xda-developers.com/showthread.php?t=2038555). Follow "Installation 1". Shut down the VM.
5.  Now, plug your SGS4 GT-I9505G into your Mac. Within VirtualBox, select the "IE8 - WinXP" image, and press "Settings".
6.  Select Ports > USB, then click the "+" symbol on the right. Select the "Samsung" option.
7.  This should add an item into the main window. Double click this new "Samsung" item. Clear out all fields except "Name", and select "No" for "Remote". Click "OK".
8.  Now, ensure "Enable USB 2.0 (EHCI) Controller" is ticked.
9.  Click "Ok" to close this window.
10. Unplug your phone, then start the VM again.
11. Within the VM, download the CF-Root for this device: [CF-Auto-Root-jflte-jfltexx-gti9505.zip](http://download.chainfire.eu/316/CF-Root/CF-Auto-Root/CF-Auto-Root-jflte-jfltexx-gti9505.zip).
12. Unzip it into a folder. You should now have 3 files: "Odin3-v1.85.exe", "Odin3.txt", and "CF-Auto-Root-jflte-jfltexx-gti9505.tar.md5".
13. Double click "Odin3-v1.85.exe" to launch the flashing utility.
14. Plug your SGS4 GT-I9505G into your Mac. The Windows VM should 'detect new hardware', and eventually an orange box should show on the left hand side of the Odin window.
15. If you do not see this orange box, from the (OSX) menu, select Devices > USB Devices > Samsung to enable sharing of the USB device with the VM.
16. Now, within the VM, click "PDA". Select the "CF-Auto-Root-jflte-jfltexx-gti9505.tar.md5" you unzipped earlier.
17. Click "Start".
18. Let Odin do its thing, and eventually the orange box will turn green saying "PASS!". You should also see your phone reboot, and a pirate looking android symbol show briefly while rooting takes place.  
    If Odin appears to hang (often at "SetupConnection"), follow these steps:
    1.  Unplug your phone
    2.  Power off your phone
    3.  Boot your phone into "Download Mode" by holding: Home, Volume Down, and Power
    4.  Wait until the "warning" screen appears, then release the buttons
    5.  Use Volume Up to acknowledge the danger
    6.  Ensure Odin is still running
    7.  Plug your phone back into the computer
    8.  Let Windows install any drivers it may want to
    9.  Once Odin shows the yellow/orange box again, hit "Start" and things should progress properly
19. Once fully rebooted, unplug your phone, and check that the "SuperSU" app has been installed to your applications.

Success! Enjoy!
