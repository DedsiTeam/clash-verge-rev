#!/bin/bash
chmod +x /usr/bin/dedsi-clash-service-install
chmod +x /usr/bin/dedsi-clash-service-uninstall
chmod +x /usr/bin/dedsi-clash-service

. /etc/os-release

if [ "$ID" = "deepin" ]; then
    PACKAGE_NAME="$DPKG_MAINTSCRIPT_PACKAGE"
    DESKTOP_FILES=$(dpkg -L "$PACKAGE_NAME" 2>/dev/null | grep "\.desktop$")
    echo "$DESKTOP_FILES" | while IFS= read -r f; do
        if [ "$(basename "$f")" == "DedsiClash.desktop" ]; then
            echo "Fixing deepin desktop file"
            mv -vf "$f" "/usr/share/applications/dedsiclash.desktop"
        fi
    done
fi
