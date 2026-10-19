#!/bin/bash
/usr/bin/dedsi-clash-service-uninstall

. /etc/os-release

if [ "$ID" = "deepin" ]; then
    if [ -f "/usr/share/applications/dedsiclash.desktop" ]; then
        echo "Removing deepin desktop file"
        rm -vf "/usr/share/applications/dedsiclash.desktop"
    fi
fi

