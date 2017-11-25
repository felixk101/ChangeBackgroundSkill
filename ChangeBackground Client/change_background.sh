#!/bin/bash
if [ -z "$1" ]; then
    echo "No url found"
    exit 1
fi

URL="$1"
wget $URL -O ~/Pictures/bg.jpg 
#sleep 2s
#gsettings set org.gnome.desktop.background draw-background false && gsettings set org.gnome.desktop.background picture-uri file:///home/felix/Pictures/bg.jpg && gsettings set org.gnome.desktop.background draw-background true
